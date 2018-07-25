const Router = require("koa-router");

const view = require("./view");
const upload = require("./upload")
const article = require("./article")


const router = Router({
	prefix:'/xlt'
});

const routes = [
	view,
	upload,
	article,
];

for (route of routes) {
	router.use(route.routes(), route.allowedMethods());
}

module.exports = router;
