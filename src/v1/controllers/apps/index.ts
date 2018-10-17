import {Route} from 'origami-core-lib';
import {App} from 'origami-core-server';
import {auth} from 'origami-plugin-auth';

const r = new Route('/api/v1/apps');
module.exports = r;

r
    .position('store')
    .get('auth', async(req, res, next) => {

        res.data = Object.entries(res.app.get('apps') as {[name: string]: App.App})
        .reduce((apps, [name, app]) => {
            apps[name] = app.entry!;
            return apps;
        }, {} as {[name: string]: App.EntryResponse});

        next();
    });
