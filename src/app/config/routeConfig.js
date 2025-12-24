import { lazyWithDelay } from "../../utils/(common)/lazyWithDelay";
import { ROLES } from "../config/roles";

/* Public pages */
const Login = lazyWithDelay(() => import("../../pages/login/Login"), 3000);
const ProfilePage = lazyWithDelay(() => import("../../pages/ProfilePage"), 3000);

/* Dashboards */
const AdminDashboard = lazyWithDelay(() => import("../../pages/dashboard/AdminDashboard"), 30);
const EmployeeDashboard = lazyWithDelay(() => import("../../pages/dashboard/EmployeeDashboard"), 3000);

const RoleManagement = lazyWithDelay(() => import("../../pages/RoleManagement"), 3000);


const DmsLayout = lazyWithDelay(() => import("../../app/layout/DmsLayout"));
const DmsRegister = lazyWithDelay(() => import("../../pages/Desceaded/RegisterPage"));
const DmsList = lazyWithDelay(() => import("../../pages/Desceaded/DeceasedListTable"));
const DmsArchive = lazyWithDelay(() => import("../../pages/Desceaded/DeceasedArchiveList"));



/* Route config remains unchanged */
export const ROUTE_CONFIG = [
  { path: "/", element: Login },
  {
    path: "/dashboard",
    elementByRole: {
      [ROLES.ADMIN]: AdminDashboard,
      [ROLES.EMPLOYEE]: EmployeeDashboard,
    },
    roles: [ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  {
    path: "/profile",
    element: ProfilePage,
    roles: [ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  {
    path: "/deceased",
    element: DmsLayout,
    roles: [ROLES.ADMIN, ROLES.EMPLOYEE],
    children: [
      { path: "", element: DmsRegister },
      { path: "list", element: DmsList },
      { path: "archive", element: DmsArchive },
    ],
  },
  {
    path: "/role-managements",
    element: RoleManagement,
    roles: [ROLES.ADMIN],
  }
];
