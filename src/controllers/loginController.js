exports.index = async (req, res) => {
    try {
        res.status(200).render('pages/login');
    } catch (error) {
        console.log(error);
    }
}

exports.register = async (req, res) => {
    try {
        res.status(200).render('pages/register'); 
    } catch (error) {
        console.log(error);
    }
}
