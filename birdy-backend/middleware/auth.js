const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {

try{
    const token = req.headers.authorization.split(' ')[1];
    //console.log(token);
    const decodedToken = jwt.verify(token, 'BIRDY_TOKEN_SECRET');
    //console.log("decodedToken:",decodedToken);
    //console.log(req.body.data);
    const userId = decodedToken.userId;
    next();  
}
catch{
    res.status(401).json({ message : "Session expirée" });
}
};