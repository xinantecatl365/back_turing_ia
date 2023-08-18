const { verifyJWT } = require('../utils/jwt')

async function verifyToken(req, res, next) {
    const token = req.body.token;
    if (token === undefined) {
        return res.json({
            message: "Access Denied! Unauthorized User"
        });
    } else {
        const [valid, payload] = verifyJWT(token);
        if (valid === false) {
            res.json({ message: 'Invalid token' });
            return;
        }
        const user = JSON.parse(payload.data);
        // console.log(user);
        if (user.admin === 0) {
            res.json({ message: 'Access denied' });
            return;
        }
        next();
    }
}

module.exports = { verifyToken }