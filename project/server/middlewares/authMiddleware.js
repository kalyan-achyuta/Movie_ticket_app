const jwt = require('jsonwebtoken');

const isAuth = async(req, res, next) => {
    const token = req.cookies.jwt_token;
    console.log("Token from cookie:", token);
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        });
    }
}

module.exports =  isAuth ;