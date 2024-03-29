import axios from "axios";
import { createContext, useState } from "react";
import ToastifyComp from "../components/ToastifyComp";
export const ToggleState = createContext();
const Toggle = ({ children }) => {
  const [allMaster, setAllMaster] = useState([]);
  const [vendorMaster, setVendorMaster] = useState([]);
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(
    window.innerWidth <= 950 ? true : false
  );
  const [auth, setAuth] = useState(false);
  const fetchAllMaster = async (api) => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append("api", "sajdh23jd823m023uierur32");
      const data = await axios.post(api, body);
      setLoading(false);
      setAllMaster(data);
    } catch (error) {
      setLoading(false);
      ToastifyComp(error);
    }
  };
  const fetchState = async (test) => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    const data = await axios.post(
      "https://dstservices.in/api/statemaster.php",
      body
    );
    setState(data);
  };
  const fetchDistrict = async (selectedState) => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("state", selectedState);
    const data = await axios.post(
      "https://dstservices.in/api/distmaster.php",
      body
    );
    setDistrict(data);
  };
  const fetchCity = async (selectedDistrict) => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("state", selectedDistrict);
    const data = await axios.post(
      "https://dstservices.in/api/distmaster.php",
      body
    );
    setCity(data);
  };
  const fetchVendorMaster = async (api) => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    body.append("vmob", JSON.parse(localStorage.getItem("user")).mob);
    const data = await axios.post(api, body);
    setVendorMaster(data);
  };

  return (
    <ToggleState.Provider
      value={{
        toggleSidebar,
        setToggleSidebar,
        auth,
        setAuth,
        fetchAllMaster,
        allMaster,
        fetchState,
        state,
        fetchVendorMaster,
        vendorMaster,
        district,
        fetchDistrict,
        fetchCity,
        city,
        loading,
      }}>
      {children}
    </ToggleState.Provider>
  );
};

export default Toggle;
