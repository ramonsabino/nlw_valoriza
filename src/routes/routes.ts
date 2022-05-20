import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";
import { CreateTagsController } from "../controller/CreateTagsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { AuthenticateUserControler } from "../controller/AuthenticateUserControler";
import { CreateComplimentController } from "../controller/CreateComplimentsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "../controller/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "../controller/ListUserReceiveComplimentsController";
import { ListTagsController } from "../controller/ListTagsController";
import { ListUserController } from "../controller/ListUserController";
const router = Router();

const createUserController = new CreateUserController();
const createTagsController = new CreateTagsController();
const authenticateUserControler = new AuthenticateUserControler();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();

const listTagsController = new ListTagsController();

const listUserController = new ListUserController();

router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagsController.handle
);
router.post("/users", createUserController.handle);
router.post("/sessions", authenticateUserControler.handle);
router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
router.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
);

router.get("/tags/", ensureAuthenticated, listTagsController.handle);

router.get("/users", ensureAuthenticated, listUserController.handle);

export { router };
