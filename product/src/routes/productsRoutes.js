/* eslint-disable import/extensions */
import express from 'express';
import passport from 'passport';
import productsController from '../controllers/productsController.js';

const router = express.Router();
const passportToken = passport.authenticate('bearer', { session: false });

const path = '/products';
const pathSearch = `${path}/search`;
const pathSearchByValue = `${pathSearch}-by-value`;
const pathSearchByStock = `${pathSearch}-by-stock`;
const pathSearchByCategoryId = `${pathSearch}-by-category/:id`;
const pathId = '/products/:id';
const pathAdminProducts = `/admin${path}`;
const pathAdminProductsByID = `/admin${pathId}`;

router
  .get(path, productsController.getAllProducts)
  .get(pathSearch, productsController.getProductByName)
  .get(pathSearchByValue, productsController.getProductsByValue)
  .get(pathSearchByStock, productsController.getProductsByStock)
  .get(pathSearchByCategoryId, productsController.getProductsByCategoryId)
  .get(pathId, productsController.getProductById)
  .post(pathAdminProducts, passportToken, productsController.createProduct)
  .put(pathAdminProductsByID, passportToken, productsController.updateProduct)
  .delete(pathAdminProductsByID, passportToken, productsController.deleteProductById);

export default router;

// ok .get(path, productsController.getAllProducts)
// ok .get(pathSearch, productsController.getProductByName)
// ok .get(pathSearchByValue, productsController.getProductsByValue)
// ok .get(pathSearchByStock, productsController.getProductsByStock)
// em andamento .get(pathSearchByCategoryId, productsController.getProductsByCategoryId)
// ok .get(pathId, productsController.getProductById)
// ok .post(pathAdminProducts, productsController.createProduct)
// ok .put(pathAdminProductsByID, productsController.updateProduct)
// ok .delete(pathAdminProductsByID, productsController.deleteProductById)
