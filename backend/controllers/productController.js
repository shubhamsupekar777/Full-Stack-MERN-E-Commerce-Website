
// // import {v2 as cloudinary} from 'cloudinary';
// import { json } from 'stream/consumers';
// import productModel from '../models/productModel.js';
// import cloudinary from '../config/cloudinary.js'

// // Function For Add Product

// const addProduct = async (req, res) => {

//   try {
//     const { name, description, price, category, subCategory, sizes, bestseller } = req.body

//     const image1 = req.files.image1?.[0];
//     const image2 = req.files.image2?.[0];
//     const image3 = req.files.image3?.[0];
//     const image4 = req.files.image4?.[0];

//     const images = [image1, image2, image3, image4].filter((img) => img);

//     if (!name || !description || !price || !category || !subCategory) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all required fields.",
//       });
//     }

//     const imageUrls = await Promise.all(
//       images.map(async (image) => {
//         const result = await cloudinary.uploader.upload(image.path, {
//           resource_type: 'image',
//         });
//         return result.secure_url;
//       })
//     );

//     const productData = {
//       name,
//       description,
//       price: Number(price),
//       category,
//       subCategory,
//       bestseller: bestseller === "true" || bestseller === true,
//       sizes: sizes ? JSON.parse(sizes) : [],
//       image: imageUrls,
//       date: Date.now(),
//     };

//     const product = new productModel(productData);
//     await product.save();

//     return res.json({ success: true, message: "Product added", product });

//   } catch (error) {
//     console.error("Add Product Error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };




// // Function For List Product
// const listProduct= async(req,res)=>{

// try {
//     const products=await productModel.find({});
//     res.json({success:true,products});
    
// } catch (error) {
//     console.log(error);
//     res.json({success:false,message:error.message});
    
// }


// };



// //Function For Remove Product
// const removeProduct= async(req,res)=>{
//     try {
//         await productModel.findByIdAndDelete(req.body.id);
//         res.json({success:true,message:"Product Removed"})

//     } catch (error) {
//          console.log(error);
//          res.json({success:false,message:error.message});
//     }

// };

// //Function For Single Product Info
// const singleProduct= async(req,res)=>{
//     try {

//         const { productId}=req.body;
//         const product=await productModel.findById(productId);
//         res.json({success:true,product});
        
//     } catch (error) {
//          console.log(error);
//          res.json({success:false,message:error.message});
//     }

// }

// export {listProduct,addProduct,singleProduct,removeProduct};






import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

// Function For Add Product

const addProduct= async(req,res)=>{
    try {
        const {name,description,price,category,subCategory,sizes,bestseller}=req.body;

        const image1=req.files.image1 &&req.files.image1[0]
         const image2=req.files.image2 &&req.files.image2[0]
          const image3=req.files.image3 &&req.files.image3[0]
         const image4=req.files.image4 &&req.files.image4[0]

         const images=[image1,image2,image3,image4].filter((item)=>item !== undefined)

         let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
         )

        //  console.log(name,description,price,category,subCategory,sizes,bestseller);

        //  console.log(imagesUrl);
        
         const productData={
          name,
          description,
          category,
          price:Number(price),
          subCategory,
          bestseller:bestseller==="true" ? true:false,
          sizes:JSON.parse(sizes),
          image:imagesUrl,
        //   data:Data.now(),
         }

         const product=new productModel(productData);
         await product.save()

         res.json({success:true,message:"Product Added"});


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
        
    }
}

// Function For List Product
const listProduct= async(req,res)=>{

 try {
    const products=await productModel.find({});
    res.json({success:true,products});
    
} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
    
}

}


//Function For Remove Product
const removeProduct= async(req,res)=>{

     try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
         console.log(error);
         res.json({success:false,message:error.message});
    }


}

//Function For Single Product Info
const singleProduct= async(req,res)=>{


      try {

        const { productId}=req.body
        const product=await productModel.findById(productId);
        
        res.json({success:true,product});
        
    } catch (error) {
         console.log(error);
         res.json({success:false,message:error.message});
    }

}

export {listProduct,addProduct,singleProduct,removeProduct};






