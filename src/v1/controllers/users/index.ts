import {auth, Route} from 'origami-core-lib';

const r = new Route('/api/v1/users');
module.exports = r;

r.position('pre-store').post(async (req, res, next) => {
    req.body.password = await auth.hash(req.body.password);
    next();
});
