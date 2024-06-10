import { AuthContext } from "../../AuthContext";
import { useContext } from "react";

const HomePage = () => {
  const currentUser = useContext(AuthContext);

  return (
    <>
      <h1>Progress Tracker</h1>
      { currentUser && <p>Welcome back! You are doing great! </p>}
    </>
  )
}

export default HomePage;