const jwt = require('jsonwebtoken');

const JWT_SIGN = process.env.JWT_SIGN

const fetchuser = (req,res,next) =>{
    const token =req.header('auth-token');
    if(!token)
    {
        
        res.status(401).send({error:"Please authenicate using a valid token"})
    }
    try {
        const data =jwt.verify(token,JWT_SIGN);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenicate using a valid token"})
    }
}
module.exports = fetchuser;