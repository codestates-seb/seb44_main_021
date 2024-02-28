import { Route, Routes, useLocation } from "react-router-dom";
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
import { useEffect } from "react";
import { useGetMemberId } from "./hooks/useGetMemberId";
import { useSelector } from "react-redux";
import NotFound from "./page/NotFound";
import MainLayout from "./page/MainLayout";
import PrivateRoute from "./page/PrivateRoute";

const App = () => {
  const { pathname } = useLocation();

  const { getMemberId } = useGetMemberId();

  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    getMemberId();
  }, [userData.memberId]);

  return (
    <div>
      <Routes>
        <Route element={<MainPage />} path="/" />
        <Route element={<UserSelectionPage />} path="/signup" />
        <Route element={<SignupPage />} path="/signup/:role" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<MainLayout pathname={pathname} />}>
          <Route element={<StorePage />} path="/store" />
          <Route element={<StoreDetail />} path="/storedetail/:id" />
          <Route element={<FundingPage />} path="/funding" />
          <Route element={<FundingDetail />} path="/fundingdetail/:id" />
          <Route element={<AboutPage />} path="/about" />
          <Route
            element={<PrivateRoute component={<MyPage />} />}
            path="/mypage/:path"
          />
          <Route
            element={<PrivateRoute component={<FundingCreatePage />} />}
            path="/fundingcreate"
          />
          <Route
            element={<PrivateRoute component={<FundingEditPage />} />}
            path="/fundingedit/*"
          />
          <Route
            element={<PrivateRoute component={<StoreCreatePage />} />}
            path="/storecreate"
          />
          <Route
            element={<PrivateRoute component={<StoreEditPage />} />}
            path="/storeedit/*"
          />
        </Route>
        <Route element={<NotFound />} path="*" />
      </Routes>
    </div>
  );
};

export default App;
