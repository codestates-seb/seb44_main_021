import { Route, Routes } from "react-router-dom";
import { UserDataProvider } from "./contexts/UserDataContext";
import MainPage from "./page/Main/MainPage";
import UserSelectionPage from "./page/SignupPage/UserSelectionPage";
import SignupPage from "./page/SignupPage/SignupPage";
import StorePage from "./page/Store/StorePage";
import StoreDetail from "./page/Store/StoreDetail";
import FundingPage from "./page/Funding/FundingPage";
import FundingDetail from "./page/Funding/FundingDetail";
import AboutPage from "./page/About/AboutPage";
import LoginPage from "./page/LoginPage/LoginPage";
import MyPage from "./page/MyPage/MyPage";
import FundingCreatePage from "./page/Funding/FundingCreatePage";
import FundingEditPage from "./page/Funding/FundingEditPage";
import StoreCreatePage from "./page/Store/StoreCreatePage";
import StoreEditPage from "./page/Store/StoreEditPage";

function App() {
  return (
    <div>
      <UserDataProvider>
        <Routes>
          {/* <Route element={< />} path="/" /> */}
          <Route element={<MainPage />} path="/" />
          <Route element={<StorePage />} path="/store" />
          <Route element={<StoreDetail />} path="/storedetail/:id" />
          <Route element={<FundingPage />} path="/funding" />
          <Route element={<FundingDetail />} path="/fundingdetail/:id" />
          <Route element={<AboutPage />} path="/about" />
          <Route element={<UserSelectionPage />} path="/signup" />
          <Route element={<SignupPage />} path="/signup/*" />
          <Route element={<FundingCreatePage />} path="/fundingcreate" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<MyPage />} path="/mypage" />
          <Route element={<FundingEditPage />} path="/fundingedit/*" />
          <Route element={<StoreCreatePage />} path="/storecreate" />
          <Route element={<StoreEditPage/>} path="/storeedit/*" />
        </Routes>
      </UserDataProvider>
    </div>
  );
}

export default App;
