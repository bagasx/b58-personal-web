const urlBlocking = (req, res, next) => {
    const a = req.session.user;
    
    if (!a) {
        res.redirect("/login")
    } else {
        next();
    }
}

module.exports = urlBlocking;