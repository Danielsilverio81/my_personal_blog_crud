const Post = require("../model/PostModel");
const fs = require('fs');

exports.page = (req, res) => {
  let newpost = new Post();
  try {
    res.status(200).render("pages/newPost", { newpost: newpost });
  } catch (error) {
    console.log(error.message);
    res.status(500).render("404", { message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const obj = {
      title: req.body.title,
      theme: req.body.theme,
      description: req.body.description,
      content: req.body.content,
      author: req.session.user.username,
      imagePath: req.file.path,
    };
    const newpost = new Post(obj);
    await newpost.createPost();

    if (newpost.errors.length > 0) {
      fs.unlinkSync(req.file.path);
      req.flash("errors", newpost.errors);
      req.session.save(() => res.redirect("back"));
      return;
    }
    req.flash("success", `Seu post foi criado com sucesso ${obj.author}`);
    req.session.save(() => res.redirect("back"));
  } catch (error) {
    console.log(error.message);
    fs.unlinkSync(req.file.path);
    res.status(500).render("404", { error: error.message });
  }
};

exports.show = async (req, res) => {
  try {
    const postId = await new Post().findPostId(req.params.id);
    res.status(200).render("pages/show", { post: postId });
  } catch (error) {
    console.log(error.message);
    res.status(422).render("404", { error: error });
  }
};

exports.search = async (req, res) => {
  try {
    const themeSearch = req.query.searchPost;
    const posts = await new Post().search(themeSearch)

      res.status(200).render('index', { posts })
  } catch (error) {
    console.log(error.message);
    res.status(500).render('404', {error: error})
  }
};

exports.update = async (req, res) => {
 try {
  const posBytId = await new Post().findPostId(req.params.id);
  res.status(200).render('pages/update', { post: posBytId })
 } catch (error) {
  console.log(error.message);
  res.status(500).render('404', { error: error })
 }
}

exports.edit = async (req, res) => {
  try {
    const postToUpdate = await new Post()
    const formData = { ...req.body, newImage: req.file };
    if (formData.newImage) {
      formData.imageUrl = formData.newImage.path;
      console.log('Nova imagem salva:', formData.imageUrl);
      
      // Remova a propriedade newImage do objeto para evitar problemas na atualização
      delete formData.newImage;
   }
    await postToUpdate.editAndUpdate(req.params.id, formData);
    if (postToUpdate.errors.length > 0) {
      fs.unlinkSync(req.file.path);
      req.flash("errors", postToUpdate.errors);
      req.session.save(() => res.redirect("back"));
      return;
    }
    req.flash("success", `Seu post foi atualizado com sucesso`);
    req.session.save(() => res.redirect("/"));
  } catch (error) {
    console.log(error.message);
    res.status(500).render("404", { error: error.message });
  }
}