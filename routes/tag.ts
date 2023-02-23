import { Router } from "express";
import { check } from "express-validator";
import { addTag, deleteTag, editTag, getTag, getTags } from "../controllers/tag";
import { checkRole } from "../middlewares/role";
import { checkJWT } from "../middlewares/session";
import { validateFields } from "../middlewares/validate";

const router = Router();

router.get("/", getTags);

router.get("/:id", getTag);

router.post("/", [
  checkJWT,
  checkRole,
  check("tag", "Tag no puede ser nulo").not().isEmpty(),
  validateFields  
], addTag );

router.put("/:id?", [
  checkJWT,
  checkRole,
  check("payload", "El campo no puede ser nulo").not().isEmpty(),
  validateFields  
], editTag );

router.delete("/:id?", [
  checkJWT,
  checkRole,
], deleteTag);

export default router;