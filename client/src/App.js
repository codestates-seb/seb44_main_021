import { Route, Routes } from "react-router-dom";
import MainPage from "./page/Main/MainPage";
import UserSelectionPage from "./page/SignupPage/UserSelectionPage";
import SignupPage from "./page/SignupPage/SignupPage";
import StorePage from "./page/Store/StorePage";
import FundingPage from "./page/Funding/FundingPage";
import AboutPage from "./page/About/AboutPage";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route element={< />} path="/" /> */}
        <Route element={<MainPage />} path="/" />
        <Route element={<StorePage />} path="/store" />
        <Route element={<FundingPage />} path="/funding" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<UserSelectionPage />} path="/signup" />
        <Route element={<SignupPage />} path="/signup/*" />
      </Routes>
    </div>
  );
}

export default App;
