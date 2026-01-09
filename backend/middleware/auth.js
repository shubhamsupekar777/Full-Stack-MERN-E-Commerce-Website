import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  try {
    // 🔹 Read Authorization header
    const authHeader = req.headers.authorization;

    // 🔹 Check header exists & format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized Login again"
      });
    }

    // 🔹 Extract token
    const token = authHeader.split(" ")[1];

    // 🔹 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 Attach userId
    req.body.userId = decoded.id;
    req.userId = decoded.id;

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Invalid or Expired Token"
    });
  }
};

export default authUser;
