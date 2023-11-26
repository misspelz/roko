import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { DashNav } from "./DashNav";
import DashboardComponent from "./DashboardComponent/DashboardComponent";
import { SettingsComponent } from "./SettingsComponent/SettingsComponent";
import { GetUserProfileApi } from "../../utils/ApiCalls";
import { isAuthenticated } from "../../Auth/index";
import { Navigate } from "react-router-dom";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userDetails, setUserDetails] = useState({});
  console.log("userDetails", userDetails);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const UserProfile = async () => {
    try {
      const res = await GetUserProfileApi();
      console.log("UserProfile", res);
      if (res?.status === 200) {
        const userData = res?.data?.user;
        setUserDetails(userData);
      } else {
        showToast({ type: "error", message: "Failed to fetch user profile" });
      }
    } catch (error) {
      showToast({ type: "error", message: error.message });
    }
  };

  useEffect(() => {
    UserProfile();
  }, []);

  const renderTabComponent = () => {
    switch (activeTab) {
      case "dashboard":
<<<<<<< HEAD
        return <DashboardComponent userDetails={userDetails}/>;
=======
        return <DashboardComponent userDetails={userDetails} />;
>>>>>>> 67b3971f6a95fb9405b9eca742af0b7b7644ee80
      case "settings":
        return <SettingsComponent />;
      default:
        return null;
    }
  };

  return (
    <>
      {isAuthenticated && (
        <div className="flex bg-[#f9f7f7]">
          <SideBar handleDashboardClick={handleTabClick} />
          <div className="w-full">
<<<<<<< HEAD
            <DashNav activeTab={activeTab} userDetails={userDetails}/>
=======
            <DashNav activeTab={activeTab} userDetails={userDetails} />
>>>>>>> 67b3971f6a95fb9405b9eca742af0b7b7644ee80
            <div
              className="px-4 py-2"
              style={{
                overflowY: "auto",
                maxHeight: "520px",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {renderTabComponent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
