import {Route} from 'origami-core-server';
import * as NPM from '../../../lib/npm';

const r = new Route('/api/v1/themes');
module.exports = r;

r.get(async (req, res, next) => {
    res.data = (await NPM.search('theme')).map(p => ({
        name: p.name,
        version: p.version,
        description: p.description,
        author: p.author
    }));
    next();
});
