import Router from "@koa/router";

import authenticate from "../controllers/auth/authenticate";

const router = new Router();

router.post("/authenticate", authenticate);

export default router;
