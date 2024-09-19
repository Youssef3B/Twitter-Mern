import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes  */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {/* Routes App */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="explore" element={<Explore />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
