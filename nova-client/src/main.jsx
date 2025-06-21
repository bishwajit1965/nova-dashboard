import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./providers/AuthProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { Toaster } from "react-hot-toast"; // ✅ Add this
import { applySavedTheme } from "./applyTheme.js";
import { createRoot } from "react-dom/client";
import router from "./routes/Routes.jsx";

// Create a client instance
const queryClient = new QueryClient();

// Dark theme
applySavedTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#6a5acd",
                color: "#fff",
              },
            }}
            reverseOrder={false}
          />
        </GoogleOAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
