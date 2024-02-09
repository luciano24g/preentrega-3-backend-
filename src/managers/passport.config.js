import passport from "passport";
import LocalStrategy from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../persistencia/user.models.js";
import { createHash, validatePassword } from "../utils.js";

const inicializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy.Strategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body;
                try {
                    let user = await userModel.findOne({ email: username });
                    if (user) {
                        console.log("Usuario ya registrado");
                        return done(null, false);
                    }
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                    };
                    const result = await userModel.create(newUser);
                    return done(null, result);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "login",
        new LocalStrategy.Strategy(
            { usernameField: "email" },
            async (username, password, done) => {
                try {
                    const user = await userModel.findOne({ email: username });
                    if (!user) {
                        return done(null, false);
                    }
                    if (!validatePassword(password, user)) {
                        return done(null, false);
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });

    passport.use(
        "github",
        new GitHubStrategy.Strategy(
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

                    let user = await userModel.findOne({ email: profile._json.email });
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
                    const result = await userModel.create(newUser);
                    return done(null, result);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};

export default inicializePassport;
