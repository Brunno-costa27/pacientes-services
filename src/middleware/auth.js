module.exports = {

    ensureAuth: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }else{
            res.redirect('/')
        }
    },
    ensureGuest: function(req, res, next) {
        if(req.isAuthenticated()) {
            res.redirect('http://localhost:5501/painel.html');
        }else{
            return next();
        }
    }
}