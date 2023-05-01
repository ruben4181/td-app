import * as React from "react";
import UserContext from "./UserContext";

const UserProvider = (props) => {
  const [authToken, setAuthToken] = React.useState(null);
  const [addressTmp, setAddressTmp] = React.useState(null);
  return (
    <UserContext.Provider
      value={{ authToken, setAuthToken, addressTmp, setAddressTmp }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
