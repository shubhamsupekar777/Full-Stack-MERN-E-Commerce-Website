// import jwt from 'jsonwebtoken';

// const adminAuth = async (req, res, next) => {
//     console.log("adminAuth: req.headers:", req.headers);

//   try {
//     const { token } = req.headers;

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     //  Adjust to check specific fields from token payload
//     if (
//       decoded.email !== process.env.ADMIN_EMAIL ||
//       decoded.password !== process.env.ADMIN_PASSWORD
//     ) {
//       return res.status(401).json({ success: false, message: "Not Authorized. Invalid Admin." });
//     }

//     //  Passed: proceed
//     req.admin = decoded;
//     next();

//   } catch (error) {
//     console.log("Admin Auth Error:", error.message);
//     return res.status(401).json({ success: false, message: "Token invalid or expired." });
//   }
// };



// export default adminAuth;


import jwt from 'jsonwebtoken'

const adminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"});
        }

        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
           
              return res.json({success:false,message:"Not Authorized Login Again"});
        }
        next()

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}
export default adminAuth