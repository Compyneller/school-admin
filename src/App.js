import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </div>
  );
}

export default App;
