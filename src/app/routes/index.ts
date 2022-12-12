import Router from "@koa/router";

import contacts from "./contacts";
import users from "./users";

const router = new Router();

router.use("/users", users.routes());
router.use("/contacts", contacts.routes());

export default router;
