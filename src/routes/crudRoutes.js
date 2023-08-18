const { Router } = require('express');
const { createDrink, readDrink, updateDrink, deleteDrink,
    createDish, readDish, updateDish, deleteDish, readAllDrinks, readAllDishes }
    = require('../controllers/crudControllers')
const { verifyToken } = require('../middleware/usersMiddleware');
const cookieParser = require('cookie-parser');

const router = Router();
router.use(cookieParser());
const createDrinkR = '/crud/drink/create';
const readDrinkR = '/crud/drink/read';
const updateDrinkR = '/crud/drink/update';
const deleteDrinkR = '/crud/drink/delete';
const createDishR = '/crud/dish/create';
const readDishR = '/crud/dish/read';
const updateDishR = '/crud/dish/update';
const deleteDishR = '/crud/dish/delete';

const readAllDrinksR = '/crud/drink/read/all';
const readAllDishesR = '/crud/dish/read/all';

// need to create crud by the admin
// routes must be protected except read
router.get(readAllDrinksR, readAllDrinks)
router.get(readAllDishesR, readAllDishes)

router.post(createDrinkR, verifyToken, createDrink);
router.get(readDrinkR, readDrink);
router.put(updateDrinkR, verifyToken, updateDrink);
router.delete(deleteDrinkR, verifyToken, deleteDrink);

router.post(createDishR, verifyToken, createDish);
router.get(readDishR, readDish);
router.put(updateDishR, verifyToken, updateDish);
router.delete(deleteDishR, verifyToken, deleteDish);

module.exports = router;