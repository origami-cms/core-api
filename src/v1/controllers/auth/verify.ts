import {auth as authMW} from 'origami-plugin-auth';
import {auth, Route} from 'origami-core-lib';

const r = new Route('/api/v1/auth/verify');
module.exports = r;

/*
* Validates the JWT token
* it's expiry.
*/
r
    .position('store')
    .use(authMW)
    .get(async(req, res, next) => {
        // @ts-ignore
        const existing = auth.jwtVerify(req.jwt.token, req.app.get('secret'));

        res.responseCode = 'auth.success.verified';
        res.data = {
            valid: true
        };

        await next();
    });
