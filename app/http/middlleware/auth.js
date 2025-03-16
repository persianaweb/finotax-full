const jwt = require('jsonwebtoken');
const User = require('app/models/users');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ message: "احراز هویت انجام نشده!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.session.userId = await User.findById(decoded.userId);

        if (!req.user) {
            return res.status(401).json({ message: "کاربر یافت نشد!" });
        }

        console.log("✅ کاربر احراز هویت شد:", req.user);
        next();
    } catch (error) {
        console.error("❌ خطای احراز هویت:", error);
        res.status(401).json({ message: "احراز هویت نامعتبر است!" });
    }
};

module.exports = { authenticateUser };
