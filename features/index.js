import { Router } from "express";

import authRoutes from "./auth/auth.routes.js";
import contactRoutes from "./contact/contact.routes.js";
import userRoutes from "./users/users.routes.js";
import noticeRoutes from "./notices/notices.routes.js";
import mediaRoutes from "./media/media.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);

router.use("/users", userRoutes);
router.use("/notices", noticeRoutes);
router.use("/media", mediaRoutes);

export default router;
