// src/App.tsx
import { Routes, Route } from "react-router-dom";
import LoginView from "./components_manager/login";
import Loginstaff from "./components-staff/login";
import HomeView from "./components_manager/home";
import ChatView from "./components_manager/chat";
import SettingsView from "./components_manager/setting";
import  ManageRequestsPage from "./components_manager/managerequestspage";
import SchedulePlanningSection from "./components_manager/schedule_planing";
  import DoctorPerformanceModal from "./components_manager/doctorperformance"
import MainLayout from "../src/mainlayout";
import HomeViewStaff from "../src/components-staff/home-staff"


const App = () => {
  return (
    <Routes>
      {/* Staff login */}
      <Route path="/staff/login" element={<Loginstaff />} />
       <Route path="/staff/home" element={<HomeViewStaff />} />

      {/* Manager login */}
      <Route path="/" element={<LoginView />} />

      {/* Manager pages using MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomeView />} />
        <Route path="/schedule" element={<SchedulePlanningSection />} />
        <Route path="/chat" element={<ChatView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/manage-requests" element={<ManageRequestsPage />} />
        <Route path="/doctor-performance" element={<DoctorPerformanceModal />} />
      </Route>
    </Routes>
  );
};

export default App;



