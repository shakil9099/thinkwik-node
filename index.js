require('./env')
require('./globals')

const { mongodb } = require('./app/utils');
const router = require('./app/routes');

mongodb.initialize();
router.initialize();
