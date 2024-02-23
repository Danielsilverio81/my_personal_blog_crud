const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: { type: String, required: true },
  email: { type: String, required: true }
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  
  async singIn() {
    this.validateLogin();
  if (this.errors.length > 0) return;

  this.user = await LoginModel.findOne({ username: this.body.username });
  if (!this.user) {
    this.errors.push('Usuário não existe.');
    return;
  }

  const isPasswordValid = bcryptjs.compareSync(this.body.password, this.user.password);
  if (!isPasswordValid) {
    this.errors.push('Senha inválida');
    this.user = null;
    return;
  }
  }
  
  async register() {
    this.validate();
    if (this.errors.length > 0) return;
    await this.userExists();
    if (this.errors.length > 0) return;
    const salt = bcryptjs.genSaltSync()
    this.body.password = bcryptjs.hashSync(this.body.password, salt)
    this.user = await LoginModel.create(this.body);
  }


  validate() {
    this.clean();
    if (!validator.isEmail(this.body.email)) this.errors.push("E-mail invalido!");
    if (this.body.password.length < 3 || this.body.password.length > 30) {
      this.errors.push("A senha precisa estar entre 3 e 30 Caracteres!");
    }
    if (!validator.isAlphanumeric(this.body.username)) {
      this.errors.push("O nome de usuário deve conter apenas letras e números!");
    }
  
    if (this.body.username.length > 20) {
      this.errors.push("O nome de usuário deve ter no máximo 20 caracteres!");
    }
  }

  validateLogin() {
    this.clean();
    if (this.body.password.length < 3 || this.body.password.length > 30) {
      this.errors.push("A senha precisa estar entre 3 e 30 Caracteres!");
    }
    if (!validator.isAlphanumeric(this.body.username)) {
      this.errors.push("O nome de usuário deve conter apenas letras e números!");
    }
  
    if (this.body.username.length > 20) {
      this.errors.push("O nome de usuário deve ter no máximo 20 caracteres!");
    }
  }
  

  clean() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      username: this.body.username,
      password: this.body.password,
      email: this.body.email
    };
  }

  async userExists() {
    this.user = await LoginModel.findOne({email: this.body.email});
    if(this.user) this.errors.push('Usuário ja Cadastrado');
  }
}

module.exports = Login;
