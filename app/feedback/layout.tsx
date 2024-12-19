"use client";
import Loader from "@/components/shared/Loader";
import React, { ReactNode } from "react";

interface FeedbackLayoutProps {
  children: ReactNode; // Accepts any valid React child
}

const FeedbackLayout: React.FC<FeedbackLayoutProps> = ({ children }) => {
  return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};

export default FeedbackLayout;
