import { Route, Routes } from "react-router-dom";
import MainPage from "./page/Main/MainPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainPage />} path="/" />
        {/* <Route element={< />} path="/" /> */}
      </Routes>
    </div>
  );
}

export default App;
