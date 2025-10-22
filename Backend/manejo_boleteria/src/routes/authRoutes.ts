import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import {validator} from "../middleware/validator";
import { check } from "express-validator";

const routerAuth = Router();
const authController = new AuthController();

routerAuth.post("/login", [
    check("id", "El campo email es obligatorio").not().isEmpty(),
    check("password", "El campo password es obligatorio").not().isEmpty(),
    validator
], authController.login)

export default routerAuth;