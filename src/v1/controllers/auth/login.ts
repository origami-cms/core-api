import {Route} from 'origami-core-server';
import {auth} from 'origami-core-lib';

const r = new Route('/api/v1/auth/login');
module.exports = r;
/*
* Validates the email and password of a user, then returns a JWT token, and
* it's expiry.
*/
r.post(async(req, res, next) => {
    try {
        const model = await res.app.get('store').model('user');
        // @ts-ignore
        const secret = res.app.get('secret');

        // Find the user
        const [user] = await model.find({email: req.body.email}, {hidden: true});
        if (!user) return next(new Error('auth.errors.noUser'));

        // Compare password
        if (!await auth.compare(req.__initialPassword || '', user.password)) {
            return next(new Error('auth.errors.noUser'));
        }

        // If successful, sign JWT
        const token = auth.jwtSign({
            userId: user.id,
            email: user.email
        }, secret);
        const {iat: expires} = auth.jwtVerify(token, secret);


        res.data = {token, expires};
        res.responseCode = 'auth.success.login';

        await next();

    } catch (e) {
        next(e);
    }
});

