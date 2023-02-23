import { Router } from "express";
import { check } from "express-validator";
import { loginCtrl, registerCtrl } from "../controllers/auth";
import { validateFields } from "../middlewares/validate";

const router = Router();

router.post('/register', [
    check("name", "El nombre no puede estar vacio").not().isEmpty().trim(),
    check("username", "El username no puede estar vacio").not().isEmpty().trim(),
    check("email", "El email no es valido").isEmail().trim(),
    check("password", "La contraseña debe ser mayor a 4 caracteres").isLength({min: 4}).trim(),
    validateFields
], registerCtrl );

router.post('/login', [
    check("email", "El email no es valido").isEmail().trim(),
    check("password", "La contraseña debe ser mayor a 4 caracteres").isLength({min: 4}).trim(),
    validateFields
], loginCtrl );

export default router;
