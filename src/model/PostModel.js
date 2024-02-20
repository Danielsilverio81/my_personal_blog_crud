const mongoose = require('mongoose');
const validator = require("validator");

const PostSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    imageUrl: {type: String},
    createdAt: {type: Date, default: Date.now}
})

const PostModel = mongoose.model("Post", PostSchema);

class Post {
    constructor(body) {
        this.body = body,
        this.errors = []
        this.article = null
    }

    async createPost() {
        this.validatePost()
        this.postExists()
        if (this.errors.length > 0) return;
        this.article = await PostModel.create(this.body);
    }

    validatePost() {
        if (!validator.isLength(this.body.content, {min: 300})) {
          this.errors.push("O conteúdo Precisa de no mínimo 300 Caracteres!");
        }
        if (!validator.isLength(this.body.description, {min: 50})) {
            this.errors.push("A descrição precisa de no mínimo 50 Caracteres!");
          }
        if (!validator.isAlpha(this.body.title, 'pt-BR')) this.errors.push("O titulo pode conter apenas Letras")
    }

    async postExists() {
        const existingPost = await PostModel.findOne({
            $or: [
                { title: this.body.title },
                { content: this.body.content },
                { description: this.body.description }
            ]
        });
    
        if (existingPost) {
            this.errors.push("Já existe um post com o mesmo título, conteúdo ou descrição.");
        }
    }
}


module.exports = Post;