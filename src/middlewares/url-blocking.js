const urlBlocking = (req, res, next) => {
    const a = req.session.user;
    console.log(a)
    if (!a) {
        res.redirect("/login")
    } else {
        next();
    }
}

module.exports = urlBlocking;