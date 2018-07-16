import {auth} from 'origami-plugin-auth';
import {Route, Origami} from 'origami-core-lib';

const r = new Route('/api/v1/apps');
module.exports = r;

r
    .position('store')
    .use(auth)
    .get(async(req, res, next) => {
        res.data = Object.entries(res.app.get('apps') as {[name: string]: Origami.AppManifest})
        .reduce((apps, [name, manifest]) => {
            apps[name] = {
                name: manifest.name,
                icon: manifest.icon
            };
            return apps;
        }, {} as {[name: string]: {name: string, icon: object}});
        next();
    });
