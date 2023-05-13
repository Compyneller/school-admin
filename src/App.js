import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
const Layout = lazy(() => import("./layout/Layout"));
const Login = lazy(() => import("./pages/Login/Login"));
function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
