import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthUserProvider } from "./contexts/AuthContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { PostProvider } from "./contexts/PostContext.jsx";
import { CommentProvider } from "./contexts/CommentContext.jsx";
import { LikeProvider } from "./contexts/LikeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LikeProvider>
      <CommentProvider>
        <AuthUserProvider>
          <UserProvider>
            <PostProvider>
              <App />
            </PostProvider>
          </UserProvider>
        </AuthUserProvider>
      </CommentProvider>
    </LikeProvider>
  </StrictMode>
);
