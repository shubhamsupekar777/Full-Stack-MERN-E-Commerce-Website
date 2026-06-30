import userModel from "../models/userModel.js"
    // add products to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; 
    const {  itemId, size } = req.body

    if (!userId || !itemId || !size) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      })
    }

    const userData = await userModel.findById(userId)

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    let cartData = userData.cartData || {}

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    // userData.cartData = cartData
    // await userData.save()

    // res.json({ success: true, message: "Added to cart" })


//     console.log("UserId:", userId);
// console.log("Cart Before Save:", userData.cartData);

// userData.cartData = cartData;
// await userData.save();

// console.log("Cart After Save:", userData.cartData);

// res.json({
//   success: true,
//   message: "Added to cart"
// });


userData.cartData = cartData;

// Tell Mongoose that cartData changed
userData.markModified("cartData");

await userData.save();

res.json({
  success: true,
  message: "Added to cart"
});
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

//update user cart
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;      
    const { itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    let cartData = userData.cartData || {}

    if (!cartData[itemId]) cartData[itemId] = {}
    cartData[itemId][size] = quantity

    // userData.cartData = cartData
    // await userData.save()

    // res.json({ success: true, message: "Cart updated" })

    userData.cartData = cartData;

// Tell Mongoose that cartData changed
userData.markModified("cartData");

await userData.save();

res.json({
  success: true,
  message: "Cart updated"
});

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

//get user cart data 
const getUserCart = async (req, res) => {
  try {
    // const { userId } = req.body
    const userId = req.userId;

    // const userData = await userModel.findById(userId)

    const userData = await userModel.findById(userId);

// console.log("Mongo Document:");
// console.log(JSON.stringify(userData, null, 2));
    // console.log("Fetched Cart:", userData.cartData);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.json({
      success: true,
      cartData: userData.cartData || {}
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}


export {addToCart,updateCart,getUserCart}