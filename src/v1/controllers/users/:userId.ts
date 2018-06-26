import {Auth, Route} from 'origami-core-server';


const r = new Route('/api/v1/users/me');
module.exports = r;

r
    .position('pre-store')
    .use(Auth)
    .get(async(req, res, next) => {
        res.data = await res.app.get('store').model('user').find({
            id: req.jwt.data.userId
        });
        next();
    });
