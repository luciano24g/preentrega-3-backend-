import passport from "passport";
import LocalStrategy from "passport-local";
import GitHubStrategy from "passport-github2";
import UserModel from "../persistencia/user.models.js";
import { cartManagerMongoInstance } from '../managers/CartManagerMongo.js'; // Importa la instancia de CartManagerMongo
import { createHash, validatePassword } from "../utils.js";

export const initializePassport = () => {
    // Estrategia de registro
    passport.use("register", new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const { name } = req.body;
                const user = await UserModel.findOne({ email });
                if (user) {
                    return done(null, false);
                }
                let rol = 'user';
                if (email.endsWith("@coder.com")) {
                    rol = "admin";
                }
                const newUser = {
                    name,
                    email,
                    password: createHash(password),
                    rol
                };
                const userCreated = await UserModel.create(newUser);

                // Crea automáticamente un carrito para el usuario
                const newCart = await cartManagerMongoInstance.post(userCreated); // Cambiado de CartService a CartManagerMongo
                await UserModel.findByIdAndUpdate(userCreated._id, { $set: { cart: newCart._id } });

                return done(null, userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ));

    // Estrategia de inicio de sesión
    passport.use("login", new LocalStrategy(
        {
            usernameField: "email"
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    return done(null, false);
                }
                if (!validatePassword(password, user)) {
                    return done(null, false);
                }
    
                // Asocia el carrito del usuario si ya tiene uno
                if (!user.cart) {
                    const newCart = await cartManagerMongoInstance.post(); // Cambiado de CartService a CartManagerMongo
                    await UserModel.findByIdAndUpdate(user._id, { $set: { cart: newCart._id } });
                    console.log("El usuario no tiene un carrito asociado.");
                }else {
                    // El usuario ya tiene un carrito asociado, no es necesario hacer nada
                    console.log("El usuario ya tiene un carrito asociado:", user.cart);
                }
    
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    // Serialización y deserialización
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const userDB = await UserModel.findById(id);
            done(null, userDB);
        } catch (error) {
            done(error);
        }
    });

    // Estrategia de autenticación con GitHub
    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: "64cd26e2ca23f97107aa",
                clientSecret: "e1fdf7910a09d37721cb4daae8b40baefc8e601f",
                callbackURL: "http://localhost:8080/api/sessions/githubcallback",
            },
            async (accesToken, refreshToken, profile, done) => {
                try {
                    console.log(profile._json.name);
                    const first_name = profile._json.name;
                    let email;
                    if (!profile._json.email) {
                        email = profile.username;
                    }

                    let user = await UserModel.findOne({ email: profile._json.email });
                    if (user) {
                        console.log("Usuario ya registrado");
                        return done(null, false);
                    }

                    const newUser = {
                        first_name,
                        last_name: "",
                        email,
                        age: 18,
                        password: "",
                    };
                    const result = await UserModel.create(newUser);

                    // Crea automáticamente un carrito para el usuario
                    const newCart = await cartManagerMongoInstance.post(); // Cambiado de CartService a CartManagerMongo
                    await UserModel.findByIdAndUpdate(result._id, { $set: { cart: newCart._id } });

                    return done(null, result);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};

export default initializePassport;
