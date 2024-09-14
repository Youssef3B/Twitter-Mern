import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes  */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {/* Routes App */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
