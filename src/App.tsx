import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { lookInSession } from "./common/session";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { UserContextInitialType, UserContextInitialValue } from "./types";

type UserContextType = {
  userAuth: UserContextInitialType,
  setUserAuth: Dispatch<SetStateAction<UserContextInitialType>>
}

export const UserContext = createContext({} as UserContextType);

function App() {
  const [userAuth, setUserAuth] = useState(UserContextInitialValue);

  useEffect(() => {
    const userInSession = lookInSession('user');

    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth(UserContextInitialValue);

  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="sign-in" element={<UserAuthForm type="sign-in" />} />
          <Route path="/sign-up" element={<UserAuthForm type="sign-up" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
