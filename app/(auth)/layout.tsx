import Loader from "@/components/shared/Loader";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};

export default AuthLayout;
