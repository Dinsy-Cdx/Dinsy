import React from "react";
import UserSideBar from "@/components/dashboard/UserSideBar";
import UserNavBar from "@/components/dashboard/UserNavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen bg-zinc-800 flex overflow-hidden">
      <UserSideBar />
      <div className="flex-1 flex flex-col h-full">
        <UserNavBar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
