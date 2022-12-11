import Router from "@koa/router";

import create from "../controllers/users/create";
import list from "../controllers/users/list";
import listOne from "../controllers/users/listOne";
import remove from "../controllers/users/remove";
import updateName from "../controllers/users/updateName";
import checkMongoId from "../middlewares/checkMongoId";

const router = new Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", checkMongoId, listOne);
router.delete("/:id", checkMongoId, remove);
router.patch("/:id", checkMongoId, updateName);

export default router;
