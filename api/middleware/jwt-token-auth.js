const jsonwebtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //For passing token in HEADER
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);

        const decoded = jsonwebtoken.verify(token, 'SecretKey');

        //For passing TOKEN in BODY
        // const decoded = jsonwebtoken.verify(req.body.token, 'SecretKey');
        req.patientData = decoded;
        next();

    } catch(error) {
        return res.status(401).json({
            message: 'Authentication failed - "check-auth.js"'
        });
    }

};