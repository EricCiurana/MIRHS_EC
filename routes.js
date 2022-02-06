const routes = require('next-routes')();

routes
	.add('/MIR/new', '/MIR/new')
	.add('/MIR/:address', '/MIR/details')
	.add('/MIR/:address/hospitals', '/MIR/hospitals/index');


module.exports = routes;