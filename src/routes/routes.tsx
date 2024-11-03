import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, SignIn } from "@clerk/clerk-react";
import App from "../App";

function ProtectedRoute({ children }:any) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn /> 
      </SignedOut>
    </>
  );
}

// Define routes
const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App /> {/* Protected main app component */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/sign-in",
    element: <SignIn path="/"/>, // Redirects to '/' after sign-in
  },
]);

export default Routes;
