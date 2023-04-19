import * as React from "react";
import UserContext from "./UserContext";

const UserProvider = (props) => {
  const [authToken, setAuthToken] = React.useState(null);

  return (
    <UserContext.Provider value={{ authToken, setAuthToken }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
