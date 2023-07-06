import { Route, Routes } from "react-router-dom";
import MainPage from "./page/Main/MainPage";
import UserSelectionPage from "./page/UserSelectionPage";
import SignupPage from "./page/SignupPage";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("");
  return (
    <div>
      <Routes>
        <Route element={<MainPage />} path="/" />
        {/* <Route element={< />} path="/" /> */}
        <Route
          element={<UserSelectionPage setUserName={setUserName} />}
          path="/signup"
        />
        <Route element={<SignupPage userName={userName} />} path="/signup/*" />
      </Routes>
    </div>
  );
}

export default App;
