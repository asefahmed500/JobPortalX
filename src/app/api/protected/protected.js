import { verifyToken } from "@/middleware/auth";


const handler = async (req, res) => {
  return res.status(200).json({ message: "You have access!", user: req.user });
};

export default verifyToken(handler);
