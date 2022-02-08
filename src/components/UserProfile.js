import { useContext } from "react";
import { UserContext } from "../contexts/User";

const UserProfile = () => {
  const { loggedInUser } = useContext(UserContext);

  return <p>Logged in as: {loggedInUser.username}</p>;
};

export default UserProfile;
