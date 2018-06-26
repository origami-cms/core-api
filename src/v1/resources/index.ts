import * as models from '../models';
import Server from 'origami-core-server';

export default (app: Server) => {
    [
        'page',
        'setting',
        'theme',
        'user'
    ]
        .forEach(res => {
            console.log('setting up', res);

            let controllers;
            try {
                controllers = require(`./${res}`);
            } catch (e) {}

            app.resource(res, {
                // @ts-ignore
                model: models[res],
                controllers
            });
        });
};
