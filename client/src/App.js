import { Route, Routes } from "react-router-dom";
import MainPage from "./page/Main/MainPage";
import UserSelectionPage from "./page/SignupPage/UserSelectionPage";
import SignupPage from "./page/SignupPage/SignupPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainPage />} path="/" />
        {/* <Route element={< />} path="/" /> */}
        <Route element={<UserSelectionPage />} path="/signup" />
        <Route element={<SignupPage />} path="/signup/*" />
      </Routes>
    </div>
  );
}

export default App;
