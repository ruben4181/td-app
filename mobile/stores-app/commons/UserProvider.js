import * as React from "react";
import UserContext from "./UserContext";

const UserProvider = (props) => {
  const [authToken, setAuthToken] = React.useState(null);
  const [addressTmp, setAddressTmp] = React.useState(null);
  const [currentStack, setCurrentStack] = React.useState(null);
  const [idStore, setIdStore] = React.useState(null);

  return (
    <UserContext.Provider
      value={{
        authToken,
        setAuthToken,
        addressTmp,
        setAddressTmp,
        currentStack,
        setCurrentStack,
        idStore,
        setIdStore,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
