import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AppLayout from "./pages/AppLayout";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Saves from "./pages/Saves";
import People from "./pages/People";

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
            <Route path="saves" element={<Saves />} />
            <Route path="peoples" element={<People />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
export default App;
