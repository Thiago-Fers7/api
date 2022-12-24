import Router from "@koa/router";

import ensureAuthentication from "../middlewares/ensureAuthentication";
import auth from "./auth";
import contacts from "./contacts";
import users from "./users";

const router = new Router();

router.use(["/users", "/contacts"], ensureAuthentication);
router.use("/auth", auth.routes());
router.use("/users", users.routes());
router.use("/contacts", contacts.routes());

export default router;
