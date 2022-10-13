import { createContext, useState } from "react";
export const ToggleState = createContext();
const Toggle = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <ToggleState.Provider value={{ toggleSidebar, setToggleSidebar }}>
      {children}
    </ToggleState.Provider>
  );
};

export default Toggle;
