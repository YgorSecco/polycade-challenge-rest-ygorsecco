const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
	ctx.body = {
		message: 'hello world'
	};
});

module.exports = router;
