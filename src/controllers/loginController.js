
const Login = require("../model/LoginModel");

exports.index = (req, res) => {
  try {
    res.status(200).render("pages/login");
  } catch (error) {
    console.log(error);
    res.status(500).render('404');
  }
};

exports.register = (req, res) => {
  try {
    res.status(200).render("pages/register");
  } catch (error) {
    console.log(error);
    res.status(500).render('404');
  }
};

exports.processRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = new Login({ email, password });
    await login.register();
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }
    req.flash('success', 'Seu usuário foi Cadastrado com sucesso');
    req.session.save(() => res.redirect('back'));
  } catch (error) {
    console.log(error.message);
    res.status(422).render('404', { message: 'Erro ao processar o Registrar' })
  }
};

exports.processLogin = async (req, res) => {
   try {
    const login = new Login(req.body);
    await login.singIn();
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Você logou com sucesso');
    req.session.user = login.user;
    req.session.save(() => res.redirect('back'));
  } catch (error) {
    console.error(error);
    res.status(500).render('404', { message: 'Erro ao processar o login' });
  }
};

