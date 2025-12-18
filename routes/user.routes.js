import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import checkToken from "../middlewares/checkToken.js";
const router = Router();

router.get("", checkToken, userController.getUsers);
router.get("/:id", userController.getUserById);

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

router.put("/:id", checkToken, userController.updateUser);

router.delete("/:id", checkToken, userController.deleteUser);

export default router;
