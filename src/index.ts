import path from 'path';
import Server, {Route} from 'origami-core-server';
import {auth} from 'origami-core-lib';
import resources from './v1/resources';

module.exports = async(app: Server, options: any) => {
    await resources(app);


    // ------------------------------------------------------------ Setup models
    const api = new Route('/api/v1');

    // If the body has a password, hash it for all routes
    api
        .position('pre-store')
        .use(async(req, res, next) => {
            if (req.body.password) {
                req.__initialPassword = req.body.password;
                req.body.password = await auth.hash(req.body.password);
            }
            next();
        });


    await api.include(path.resolve(__dirname, './v1/controllers'), '/', true);


    api
        .position('pre-render')
        .use((req, res, next) => {
            if (!res.data && !res.body && !res.responseCode && !res.text) {
                res.responseCode = 'general.errors.notFound';
            }
            next();
        });

    app.useRouter(api);
};
