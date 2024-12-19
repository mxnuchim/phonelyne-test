// components/ContentLayout.tsx
"use client";
import React from "react";
import { Toaster } from "sonner";
import Sidebar from "@/components/shared/Sidebar";
import Loader from "@/components/shared/Loader";

interface ContentLayoutProps {
  children: React.ReactNode; // The content to display in the layout
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  return (
    <React.Suspense fallback={<Loader />}>
      <div className="flex">
        <Sidebar />
        <main className="flex-grow p-0 lg:p-3 bg-whiteBg">{children}</main>
      </div>
      <Toaster />
    </React.Suspense>
  );
};

export default ContentLayout;
