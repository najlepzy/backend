import { Router } from 'express';
import { login, current, signup } from "../../domain/controllers/sessionController.js";
import '../application/AppExpress.js';
import auth from "../middlewares/auth.js";

const router = Router();

router.post('/login', login);
router.get('/current', auth, current);
router.post('/signup', signup);

export default router;