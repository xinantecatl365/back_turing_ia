const bcrypt = require('bcrypt');
const saltRounds = 15;
const { generateJWT } = require('../utils/jwt');
const { dbConnection } = require('../config/mysqlConfig');

const createUser = async (req, res) => {
    let password = req.query.password || req.body.password;
    console.log(password);
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.status(400).json({
                message: err.message
            });
            return;
        }
        const name = req.query.name || req.body.name;
        const admin = req.query.admin || req.body.admin;
        const username = req.query.username || req.body.username;
        password = hash;

        let sql = 'INSERT INTO test_turing_ai.users(name, admin, username, password) VALUES ?';
        const values = [[name, admin, username, password]];
        dbConnection.query(sql, [values], (err) => {
            if (err) {
                res.status(400).json({
                    message: err.message
                });
                return;
            }
            res.status(200).json({
                message: 'Ok',
            });
        });
    });
}

const loginUser = (req, res) => {
    const username = req.query.username || req.body.username;
    let password = req.query.password || req.body.password;

    console.log(password, username);
    let sql = 'SELECT * FROM test_turing_ai.users WHERE username = ?';
    dbConnection.query(sql, [username], (err, result) => {
        if (result.length === 0) {
            res.status(400).json({
                message: 'Verify your credentials and try again'
            });
            return;
        }
        let user = result[0];
        bcrypt.compare(password, user.password, async (bcErr, bcRes) => {
            if (bcErr) {
                res.status(400).json({
                    message: 'Verify your credentials and try again'
                });
                return;
            } if (bcRes) {
                user.password = null;
                const tokenGen = await saveJWT(user);
                if (tokenGen.correct) {
                    console.log(tokenGen.token);
                    res.cookie('token', tokenGen.token);
                    res.status(200).json({
                        message: 'ok',
                        result: user,
                        token: tokenGen.token
                    });
                    return;
                }
                res.status(400).json({
                    message: 'Error generating token'
                });
                return;
            }
            res.status(400).json({
                message: 'Verify your credentials and try again'
            });
        });
    });
}

// return true if the jwt is saved corerctly
const saveJWT = async (user) => {
    try {
        const token = await generateJWT(JSON.stringify(user));
        return {
            correct: true,
            token: token
        };
    } catch (error) {
        return {
            correct: false,
            token: null
        };
    }
}

module.exports = { createUser, loginUser };