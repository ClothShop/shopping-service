import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: 'Нет токена авторизации.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("jwt error:", err, "jwt secret:", process.env.JWT_SECRET);
            return res.status(401).json({ message: 'Неверный токен.' });
        }
        req.user = user;
        next();
    });
};
const authorizeAdmin = (req, res, next) => {
    if (req.user?.Role !== 'Admin') {
        return res.status(403).json({ message: 'Доступ запрещён. Только для Admin.' });
    }
    next();
};

export  {authorizeAdmin, authenticateJWT}
