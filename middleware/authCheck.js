const jwt = require('jsonwebtoken')
exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json({
                    stats: 'not-done',
                    error: 'الترميز غير صحيح يرجي اعادة تسجيل الدخول'
                })
            }
            req.user = user;
            next();
        });
    } else {
        res.status(403).json({
            stats: 'not-done',
            error: 'يجب تسجيل الدخول'
        });
    }
};


