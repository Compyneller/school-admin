import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBarComp from "./components/NavBarComp/NavBarComp";
function App() {
  return (
    <div className="App">
      <NavBarComp />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
