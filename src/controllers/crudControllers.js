const { dbConnection } = require('../config/mysqlConfig')

const createDrink = async (req, res) => {
    const name = req.query.name;
    const price = req.query.price;
    const size = req.query.size;
    const flavour = req.query.flavour;
    const values = [[name, price, size, flavour]]
    const sql = 'INSERT INTO test_turing_ai.drinks(name, price, size, flavour) VALUES ?';
    dbConnection.query(sql, [values], (err, result) => {
        if (err) {
            res.status(400).json({
                message: err.message
            });
            return;
        }
        res.status(200).json({
            message: 'Ok'
        });
    });
}

const createDish = async (req, res) => {
    const name = req.query.name;
    const price = req.query.price;
    const size = req.query.size;
    const values = [[name, price, size]]
    const sql = 'INSERT INTO test_turing_ai.dishes(name, price, size) VALUES ?';
    dbConnection.query(sql, [values], (err, result) => {
        if (err) {
            res.status(400).json({
                message: err.message
            });
            return;
        }
        console.log(result);
        res.status(200).json({
            message: 'Ok'
        });
    });
}

const readDrink = async (req, res) => {
    const id = req.query.id_drink;
    let sql = 'SELECT * FROM test_turing_ai.drinks WHERE id_drink = ?';
    dbConnection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).json({
                message: 'Could not retrieve drink'
            });
            return;
        }
        const drink = result[0];
        res.status(200).json({
            message: 'ok',
            result: drink
        })
    });
}

const readDish = async (req, res) => {
    const id = req.query.id_dish;
    let sql = 'SELECT * FROM test_turing_ai.dishes WHERE id_dish = ?';
    dbConnection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).json({
                message: 'Could not retrieve dish'
            });
            return;
        }
        const drink = result[0];
        res.status(200).json({
            message: 'ok',
            result: drink
        })
    });
}

const updateDrink = async (req, res) => {
    const id = req.query.id_drink;
    const name = req.query.name;
    const price = req.query.price;
    const size = req.query.size;
    const flavour = req.query.flavour;
    const values = [name, price, size, flavour, id]
    const sql = 'UPDATE test_turing_ai.drinks SET name = ?, price = ?, size = ?, flavour = ? WHERE id_drink = ?';
    dbConnection.query(sql, values, (err, result) =>{
        if (err) {
            res.status(400).json({
                message: err.message
            });
            return;
        }
        res.status(200).json({
            message: 'Ok',
            result: result
        });

    });
}

const updateDish = async (req, res) => {
    const id = req.query.id_dish;
    const name = req.query.name;
    const price = req.query.price;
    const size = req.query.size;
    const values = [name, price, size, id]
    const sql = 'UPDATE test_turing_ai.dishes SET name = ?, price = ?, size = ? WHERE id_dish = ?';
    dbConnection.query(sql, values, (err, result) => {
        if (err) {
            res.status(400).json({
                message: err.message
            });
            return;
        }
        res.status(200).json({
            message: 'Ok',
            result: result
        });

    });
}

const deleteDrink = async (req, res) => {
    const id = req.query.id_drink;
    const sql = 'DELETE FROM test_turing_ai.drinks WHERE id_drink = ?';
    dbConnection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).json({
                message: err.message
            });
            return;
        }
        res.status(200).json({
            message: 'Ok',
            result: result
        })
    });
}


const deleteDish = async (req, res) => {
    const id = req.query.id_dish;
    const sql = 'DELETE FROM test_turing_ai.dishes WHERE id_dish = ?';
    dbConnection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).json({
                message: err.message
            });
            return;
        }
        res.status(200).json({
            message: 'Ok',
            result: result
        })
    });
}

const readAllDrinks = (req, res) => {
    let sql = 'SELECT * FROM test_turing_ai.drinks';
    dbConnection.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                message: err.message
            });
            return;
        }
        res.status(200).json({
            message: 'Ok',
            result
        });
    });
}

const readAllDishes = (req, res) => {
    let sql = 'SELECT * FROM test_turing_ai.dishes';
    dbConnection.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                message: err.message
            });
            return;
        }
        res.status(200).json({
            message: 'Ok',
            result
        });
    });
}


module.exports = {
    createDrink, readDrink, updateDrink, deleteDrink, createDish,
    readDish, updateDish, deleteDish, readAllDrinks, readAllDishes
};