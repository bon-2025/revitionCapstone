import { Routes, Route } from "react-router-dom";
import Archive from "../../pages/archive/Archive.jsx";
import ArchiveDetails from "../../pages/archive/ArchiveDetails.jsx";

export default function ArchiveRoutes() {
  return (
    <Routes>
      <Route index element={<Archive />} />
      <Route path=":id" element={<ArchiveDetails />} />
    </Routes>
  );
}
