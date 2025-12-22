import { lazyWithDelay } from "../../utils/(common)/lazyWithDelay";
import { ROLES } from "../config/roles";

/* Public pages */
const Login = lazyWithDelay(() => import("../../pages/login/Login"), 3000);
const ProfilePage = lazyWithDelay(() => import("../../pages/ProfilePage"), 3000);

/* Dashboards */
const AdminDashboard = lazyWithDelay(() => import("../../pages/dashboard/AdminDashboard"), 3000);
const EmployeeDashboard = lazyWithDelay(() => import("../../pages/dashboard/EmployeeDashboard"), 3000);

/* Feature routes */
const RegisterRoutes = lazyWithDelay(() => import("../routes/RegisterRoutes"));
const ContractsRoutes = lazyWithDelay(() => import("../routes/ContractsRoutes"));
const ArchiveRoutes = lazyWithDelay(() => import("../routes/ArchiveRoutes"));
const RoleManagement = lazyWithDelay(() => import("../../pages/RoleManagement"));

const RegisterDetails = lazyWithDelay(() => import("../../pages/register/RegisterDetails"));
const Managements = lazyWithDelay(() => import("../../pages/Management"));


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
    path: "/register",
    element: RegisterRoutes,
    roles: [ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  {
    path: "/contracts",
    element: ContractsRoutes,
    roles: [ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  {
    path: "/archive",
    element: ArchiveRoutes,
    roles: [ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  {
    path: "/role-managements",
    element: RoleManagement,
    roles: [ROLES.ADMIN],
  },
  {
    path: "/register-details",
    element: RegisterDetails,
    roles: [ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  {
    path: "/descease-managements",
    element: Managements,
    roles: [ROLES.ADMIN, ROLES.EMPLOYEE],
  },
];
