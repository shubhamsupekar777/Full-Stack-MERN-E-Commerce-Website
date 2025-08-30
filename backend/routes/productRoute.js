import express from 'express';
import {listProduct,addProduct,singleProduct,removeProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';



const productRouter=express.Router();



productRouter.post('/add',adminAuth,upload.fields([
  {name:'image1',maxCount:1}
  ,{name:'image2',maxCount:1}
  ,{name:'image3',maxCount:1},
  {name:'image4',maxCount:1}]),
  addProduct);
// productRouter.post('/add',adminAuth, upload.fields([
//   { name: 'image1', maxCount: 1 },
//   { name: 'image2', maxCount: 1 },
//   { name: 'image3', maxCount: 1 },
//   { name: 'image4', maxCount: 1 },
// ]), addProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProduct);

export default productRouter;


// import express from 'express';
// import {
//   listProduct,
//   addProduct,
//   singleProduct,
//   removeProduct,
// } from '../controllers/productController.js';
// import upload from '../middleware/multer.js';
// import adminAuth from '../middleware/adminAuth.js';

// const productRouter = express.Router();

// // Add Product
// productRouter.post(
//   '/add',
//   // adminAuth,
//   upload.fields([
//     { name: 'image1', maxCount: 1 },
//     { name: 'image2', maxCount: 1 },
//     { name: 'image3', maxCount: 1 },
//     { name: 'image4', maxCount: 1 },
//   ]),
//   addProduct
// );

// // Remove Product
// productRouter.post('/remove', adminAuth, removeProduct);

// // Get Single Product (fix)
// productRouter.post('/single', singleProduct);

// // Get All Products
// productRouter.get('/list', listProduct);

// export default productRouter;
