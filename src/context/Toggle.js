import axios from "axios";
import { createContext, useState } from "react";
export const ToggleState = createContext();
const Toggle = ({ children }) => {
  const [allMaster, setAllMaster] = useState([]);
  const [state, setState] = useState([]);
  const [toggleSidebar, setToggleSidebar] = useState(
    window.innerWidth <= 950 ? true : false
  );
  const [auth, setAuth] = useState(false);
  const fetchAllMaster = async (api) => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    const data = await axios.post(api, body);
    setAllMaster(data);
  };
  const fetchState = async () => {
    const body = new FormData();
    body.append("api", "sajdh23jd823m023uierur32");
    const data = await axios.post(
      "https://dstservices.in/api/statemaster.php",
      body
    );
    setState(data);
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
      }}>
      {children}
    </ToggleState.Provider>
  );
};

export default Toggle;
