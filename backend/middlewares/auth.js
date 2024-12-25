import jwt from "jsonwebtoken";
const auth= async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: "Unauthorized",success: false});
    const decode= jwt.verify(token, process.env.SECRET_KEY);
    if(!decode) return res.status(401).json({message: "Unauthorized",success: false});
    req.userId= decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;