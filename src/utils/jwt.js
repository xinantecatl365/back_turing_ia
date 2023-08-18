const jwt = require('jsonwebtoken');
require('dotenv').config();
const twoDaysInSeconds = 172800;

const generateJWT = async (payload) => {
    try {
        const expiration = Number(new Date()) + twoDaysInSeconds;
        const token = await jwt.sign({ exp: expiration, data: payload }, process.env.JWT_KEY);
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const verifyJWT = (token) => {
    let valid = false;
    let payload = null;
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            return;
        }
        valid = true;
        payload = decoded;
    });
    return [valid, payload];
};

module.exports = {
    generateJWT,
    verifyJWT
}