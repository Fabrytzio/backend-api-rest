import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, putUser } from "../controllers/user";
import { checkJWT } from "../middlewares/session";

const router = Router();

router.get("/", [ checkJWT ],getUsers );
router.get("/:id", getUser );
router.post("/", addUser );
router.put("/:id", putUser );
router.delete("/:id", deleteUser );

export default router;