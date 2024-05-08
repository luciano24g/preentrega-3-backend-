import jwt from "jsonwebtoken";

// Middleware de verificación del token JWT
export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token de autenticación no proporcionado" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token de autenticación inválido" });
    }
};

// Middleware de autorización basado en roles
export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Necesitas estar autenticado para acceder a esta página" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "No estás autorizado para acceder a esta página" });
        }
        next();
    };
};

// Middleware de verificación del token de correo electrónico
export const verifyEmailTokenMW = () => {
    return (req, res, next) => {
        try {
            const jwtToken = req.query.token;
            if (!jwtToken) {
                return res.status(400).json({ message: "Token de verificación de correo electrónico no proporcionado" });
            }
            const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
            req.user = decoded.user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token de verificación de correo electrónico inválido" });
        }
    };
};
