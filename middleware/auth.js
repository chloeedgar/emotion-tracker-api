
exports.isAuth = (req, res, next) => {
    console.log(req.session);
    const { isLoggedIn } = req.session;

    console.log('isLoggedIn:   '+JSON.stringify(isLoggedIn));


    // if (!isLoggedIn) {
    //     req.session.route = req.originalUrl;
    //     return res.redirect('/login');
    // }

    next();
};

