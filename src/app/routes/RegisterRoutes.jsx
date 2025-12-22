import { Routes, Route } from "react-router-dom";
import Register from "../../pages/register/Register";
import RegisterDetails from "../../pages/register/RegisterDetails";

export default function RegisterRoutes() {
  return (
    <Routes>
      <Route index element={<Register />} />
      <Route path=":id" element={<RegisterDetails />} />
    </Routes>
  );
}
