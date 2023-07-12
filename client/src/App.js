import { Route, Routes } from "react-router-dom";
// import MainPage from "./page/Main/MainPage";
import UserSelectionPage from "./page/SignupPage/UserSelectionPage";
import SignupPage from "./page/SignupPage/SignupPage";
import LoginPage from "./page/LoginPage/LoginPage";
import { UserDataProvider } from "./contexts/UserDataContext";

function App() {
  return (
    <UserDataProvider>
      <div>
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          {/* <Route element={< />} path="/" /> */}
          <Route element={<UserSelectionPage />} path="/signup" />
          <Route element={<SignupPage />} path="/signup/*" />
        </Routes>
      </div>
    </UserDataProvider>
  );
}

export default App;
