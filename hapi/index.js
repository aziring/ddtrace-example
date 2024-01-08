'use strict';

const tracer = require('dd-trace').init();
const Hapi = require('@hapi/hapi');
const { connectToMongo } = require('./db_connect');

function countValues(n, parent) {
	const span = tracer.startSpan("countValues", {childOf: parent});
	const result = n+3
	span.finish()
    return result;
}


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
			let parentScope = tracer.scope().active();
			const span = tracer.startSpan('message', {childOf: parentScope});
        	connectToMongo();
            // custom span for translation
            const values = countValues(2, span);
            
			span.finish();
            return `Hello World! ${values}`;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();