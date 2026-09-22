import { StatusCodes } from "http-status-codes";
import { getDashboardSummaryService } from "./dashboard.services.js";

export async function getDashboardSummaryController(req, res) {
  const result = await getDashboardSummaryService();

  res.status(StatusCodes.OK).json({
    success: true,
    summary: result,
    resource: "dashboard summary",
  });
}
