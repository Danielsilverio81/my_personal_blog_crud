const mongoose = require("mongoose");
const validator = require("validator");
const path = require('path');
const fs = require('fs');

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  theme: {type: String, required: true},
  description: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const PostModel = mongoose.model("Post", PostSchema);

class Post {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.article = null;
  }

  async createPost() {
    try {
      const postObject = {
        title: this.body.title,
        theme: this.body.theme,
        description: this.body.description,
        content: this.body.content,
        author: this.body.author,
        imageUrl: this.body.imagePath,
      };
      this.validatePost();
      await this.postExists();
      if (this.errors.length > 0) return;
      this.article = await PostModel.create(postObject);
    } catch (error) {
      console.error(error);
      this.errors.push("Erro ao criar o post.");
    }
  }

  validatePost() {
    if (!validator.isLength(this.body.content, { min: 200 })) {
      this.errors.push("O conteúdo Precisa de no mínimo 300 Caracteres!");
    }
    if (!validator.isLength(this.body.description, { min: 10 })) {
      this.errors.push("A descrição precisa de no mínimo 50 Caracteres!");
    }
    if (!validator.isLength(this.body.title, { min: 10 })) {
      this.errors.push("o titulo precisa de no mínimo 10 Caracteres!");
    }
    if (typeof this.body.theme !== 'string') {
      this.errors.push('O tema deve conter apenas letras')
    }
    this.clean();
  }

  async postExists() {
  try {
    this.article = await PostModel.findOne({
      $or: [
        { title: this.body.title },
        { content: this.body.content },
        { description: this.body.description },
      ],
    });

    if (this.article) {
      this.errors.push(
        "Já existe um post com o mesmo título, conteúdo ou descrição."
      );
      this.article = null;
    }
  } catch (error) {
    console.log(error);
    this.errors.push('Erro ao confirmar a existência de um post semelhante')
  }
  }

  async search(themeSearch) {
    try {
      this.posts = await PostModel.find({
        $or: [
          { title: { $regex: themeSearch, $options: "i" } }, // Case-insensitive regex
          { description: { $regex: themeSearch, $options: "i" } },
          { theme: { $regex: themeSearch, $options: "i" } },
        ]
      }).sort({ createdAt: -1 });
      return this.posts;
    } catch (error) {
      console.log(error);
      this.errors.push('Erro ao buscar o post desejado')
    }
  }

  async showAll() {
    try {
      this.posts = await PostModel.find().sort({ createdAt: -1 });
      if (!this.posts || this.posts.length == 0) {
        this.errors.push(
          `Não existem posts salvos na base de dados ou houve um problema na busca`
        );
      }

      this.posts = this.posts.map((post) => ({
        ...post.toObject(),
        formatedDate: new Date(post.createdAt).toLocaleString("pt-BR", {
          timezone: "UTC",
        }),
      }));

      return this.posts;
    } catch (error) {
      console.log(error);
      this.errors.push("Erro ao buscar posts!");
    }
  }

  async findPostId(id) {
    if(typeof id !== 'string') return;
    this.post = await PostModel.findById(id);
    return this.post;
  }

  async editAndUpdate(id, formData) {
    try {
      if (typeof id !== 'string') return;
      if (this.errors.length > 0) return;

      const oldPost = await PostModel.findById(id);
      if (!oldPost) {
        this.errors.push('Post não encontrado.');
        return;
      }
  
      if (formData.newImage) {
        formData.imageUrl = formData.newImage.filename;
        delete formData.newImage;
      }
  
      if (formData.imageUrl !== oldPost.imageUrl) {
        const pathOldImage = oldPost.imageUrl;
  
        try {
          await fs.promises.access(pathOldImage);
          await fs.promises.unlink(pathOldImage);
        } catch (error) {
          if (error.code === 'ENOENT') {
            this.errors.push('Imagem antiga não encontrada.');
          } else {
            this.errors.push('Erro ao acessar ou excluir a imagem antiga:', error.message);
          }
        }
      }
      this.post = await PostModel.findByIdAndUpdate(id, formData, { new: true });
      if (!this.post) {
        this.errors.push('Erro ao buscar post ou atualizar');
      }
  
      return this.post;
    } catch (error) {
      console.log('Erro geral:', error);
      this.errors.push('Erro ao buscar post: ' + error.message);
    }
  }

  clean() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        delete this.body[key];
      }
    }

    this.body = {
      title: this.body.title,
      description: this.body.description,
      content: this.body.content,
    };

    this.article = null;
  }
}

module.exports = Post;
