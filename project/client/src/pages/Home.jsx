import { useEffect } from "react";
import { getCurrentUser } from "../calls/authCalls"

const Home = () => {

    const getCurrentUserData = async() => {
        const userData = await getCurrentUser();
    }
    useEffect(() => {
        getCurrentUserData();
    }, []);
  return (
    <div>
      <h2>this is a home page</h2>
    </div>
  )
}

export default Home
