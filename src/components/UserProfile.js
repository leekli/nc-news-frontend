import { useContext } from "react";
import { UserContext } from "../contexts/User";

const UserProfile = () => {
  const { loggedInUser } = useContext(UserContext);

  return loggedInUser.username;
};

export default UserProfile;
