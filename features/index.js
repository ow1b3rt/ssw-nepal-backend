import { Router } from "express";

import authRoutes from "./auth/auth.routes.js";
import contactRoutes from "./contact/contact.routes.js"

const router = Router()

router.use('/auth', authRoutes)
router.use('/contact', contactRoutes)

export default router