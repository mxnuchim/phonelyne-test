"use client";
import Loader from "@/components/shared/Loader";
import React, { Suspense, ReactNode } from "react";

interface FeedbackLayoutProps {
  children: ReactNode; // Accepts any valid React child
}

const FeedbackLayout: React.FC<FeedbackLayoutProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default FeedbackLayout;
