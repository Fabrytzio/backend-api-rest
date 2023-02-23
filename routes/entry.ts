import { Router } from "express";
import { check } from "express-validator";
import { addAnime, deleteAnime, editAnime, getAnime, getAnimes } from "../controllers/entry";
import { checkRating } from "../middlewares/check.range";
import { checkRole } from "../middlewares/role";
import { checkJWT } from "../middlewares/session";
import { validateFields } from "../middlewares/validate";

const router = Router();

router.get('/', getAnimes);

router.get('/:id', getAnime);

router.post('/', [
    checkJWT,
    checkRole,
    check("title", "El titulo no puede estar vacio").not().isEmpty().trim(),
    check("cover_url", "El anime debe tener su portada").not().isEmpty().trim(),
    check("synopsis").trim(),
    check("review").trim(),
    check("rating", "El rating debe ser un número").isNumeric(),
    checkRating,
    check("tags", "El anime debe tener minimo un tag").isArray({min: 1}),
    validateFields
], addAnime );

router.put( '/', editAnime );

router.delete('/:id', [
    checkJWT,
    checkRole,
    validateFields
], deleteAnime );

export default router;
