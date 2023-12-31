import express from 'express';
import { isAdmin, requiresSignIn } from '../middlewares/authMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createProductController,
   deleteProductController,
   getProductController,
    getSingleProductController,
     productCategoryController,
     productCountController,
     productFilterController,
     productListController,
     productPhotoController,
     relatedProductController,
     searchProductController,
     updateProductController
     } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router()

//routes
router.post('/create-product',
 requiresSignIn, 
 isAdmin, 
 formidable(),
  createProductController);

  //routes
router.put('/update-product/:pid',
requiresSignIn, 
isAdmin, 
formidable(),
 updateProductController);

  //get products
  router.get('/get-product', getProductController)

  //single product
  router.get('/get-product/:slug', getSingleProductController)

  //get photo
  router.get('/product-photo/:pid', productPhotoController)

  //delete photo
  router.delete('/delete-product/:pid', deleteProductController)

  //filter product
  router.post('/product-filters', productFilterController)

  //product count
  router.get('/product-count', productCountController)

  //product per page
  router.get('/product-list/:page',productListController)

  //search product
  router.get('/search/:keyword', searchProductController)

  //similar products
  router.get('/related-product/:pid/:cid',relatedProductController)

  //category wise product
  router.get('/product-category/:slug', productCategoryController)

  //payment routes
  //token
  router.get('/braintree/token', braintreeTokenController)

  //payment
  router.post('/braintree/payment',requiresSignIn, brainTreePaymentController)

export default router