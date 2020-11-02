const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../models");

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "AuJeedJad"
}

const jwtStrategy = new Strategy(option, async (payload, done) => {
    try {
        const targetUser = await db.User.findOne({ where: { id: payload.id } });
        console.log(targetUser, payload);
            if (targetUser) {
                console.log(payload.createdAt, targetUser.passwordUpdate, typeof targetUser.passwordUpdate, typeof payload.createdAt);
                if (new Date(payload.createdAt) < targetUser.passwordUpdate) {
                    done(null, false)                    
                } else {
                    done(null, targetUser)
                }
            } else {
                done(null, false)
            }
    } catch (err) {
        done(err)
    }
})

passport.use("jwt", jwtStrategy);

