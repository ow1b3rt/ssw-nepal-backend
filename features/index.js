import { Router } from "express";

import authRoutes from "./auth/auth.routes.js";
import contactRoutes from "./contact/contact.routes.js";
import userRoutes from "./users/users.routes.js";
import noticeRoutes from "./notices/notices.routes.js";
import mediaRoutes from "./media/media.routes.js";
import blogRoutes from "./blogs/blogs.routes.js";
import authorRoutes from "./authors/authors.routes.js";
import eventRoutes from "./events/events.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);
router.use("/events", eventRoutes);

router.use("/users", userRoutes);
router.use("/notices", noticeRoutes);
router.use("/media", mediaRoutes);
router.use("/blogs", blogRoutes);
router.use("/authors", authorRoutes);

export default router;
