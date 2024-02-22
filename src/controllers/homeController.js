const Post = require("../model/PostModel")


exports.index = async (req, res) => {
    try {
    const posts = await new Post().showAll();
    
    res.render('index', { posts: posts }); 
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro interno do servidor');
  }
}