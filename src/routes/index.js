const Router = require("koa-router");

const view = require("./view");
const upload = require("./upload")
const article = require("./article")
const auth = require("./auth")

const router = Router({
	prefix:'/xlt'
});

const routes = [
	view,
	upload,
	article,
	auth,
];

for (route of routes) {
	router.use(route.routes(), route.allowedMethods());
}

module.exports = router;
