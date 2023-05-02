const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.headers.authorization
    // console.log(token);
    try {
        if(token){
            var decoded = jwt.verify(token.split(" ")[1], 'masai');
            console.log(decoded);
            if (decoded) {
                req.body.authorID=decoded.authorID
                req.body.name=decoded.authorName
                next()
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    auth
}