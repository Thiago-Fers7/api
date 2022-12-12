import Router from "@koa/router";

import addContact from "../controllers/contacts/addContact";
import checkMongoId from "../middlewares/checkMongoId";

const router = new Router();

// id = Id of new contact
router.post("/add-contact/:id", checkMongoId, addContact);

export default router;
