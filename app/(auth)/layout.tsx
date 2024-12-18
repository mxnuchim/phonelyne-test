import Loader from "@/components/shared/Loader";
import React, { Suspense } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default AuthLayout;
