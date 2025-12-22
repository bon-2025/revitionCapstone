import { Routes, Route } from "react-router-dom";
import Contracts from "../../pages/contracts/Contracts.jsx";
import ContractDetails from "../../pages/contracts/ContractDetails";

export default function ContractsRoutes() {
  return (
    <Routes>
      <Route index element={<Contracts />} />
      <Route path=":id" element={<ContractDetails />} />
    </Routes>
  );
}
