import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainApp from "../layout/main";
import Magazines from "../pages/magazines";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />}>
          <Route index element={<Magazines />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
