
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
    if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(() => {
            return res.redirect('back');
        });
        return
    }
  } catch (error) {
    console.log(error);
    res.status(422).render('404')
  }
};
