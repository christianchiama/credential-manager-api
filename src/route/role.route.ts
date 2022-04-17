import express from "express";
import asyncHandler from "express-async-handler";
import { RoleController } from "../controller";
import { PATH } from "../config/index";
import { isAuthenticated } from "@middleware/isAuthenticated";
import { isAuthorized } from "../middleware/isAuthorized";
import { ROLE } from "../config/role";

const router: express.Router = express.Router();

router.get(
  PATH.EMPTY,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.ADMIN)),
  asyncHandler(RoleController.getRoles)
);
router.get(
  PATH.ROLE.ID,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.ADMIN)),
  asyncHandler(RoleController.getRole)
);
router.post(
  PATH.EMPTY,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.ADMIN)),
  asyncHandler(RoleController.createRole)
);
router.put(
  PATH.ROLE.ID,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.ADMIN)),
  asyncHandler(RoleController.updateRole)
);
router.delete(
  PATH.ROLE.ID,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.ADMIN)),
  asyncHandler(RoleController.deleteRole)
);

export { router as RoleRoute };
