import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './LoginPage/LoginPage'
import Layout from './layout';

import Dashboard from './Dashboard/Dashboard';
import ReportTypesList from './ReportList/ReportTypesList';
import UserReportList from './ReportList/UserReportList';
import GroupReportList from './ReportList/GroupReportList';
import UserList from './UserList/UserList';
import GroupList from './GroupList/GroupList';
import CountryWiseUserList from './CountryWiseUserList.tsx/CountryWiseUserList';
import Language from './Language/Language';
import TranslateLanguage from './Language/TranslateLanguage';
import BlockList from './BlockList/BlockList';
import AvatarList from './Avatar/AvatarList';
import AudioCallList from './Calls/AudioCallList';
import VideoCallList from './Calls/VideoCallList';
import PushNotificationList from './Notification/PushNotificationList';
import Settings from './Settings/Settings';
import CMSPages from './CMSPages/CMSPages';
import MyProfile from './Profile/MyProfile';
import Cookies from 'js-cookie';
import ProtectedRoute from './ProtectedRoute';
import { useCallback, useEffect, useState } from 'react';
import useApi from './hooks/useApiPost';
interface ConfigType {
  app_name: string;
  app_email: string;
  app_primary_color: string;
  app_logo_light: string;
  web_logo_light: string;
  app_logo_dark: string;
  copyright_text: string;
}

function App() {



    const { get, } = useApi();

  const [config, setConfig] = useState<ConfigType | null>(null);

  const [themeColor, setThemeColor] = useState("#EAB308");

 



  /* ============================= */
  /* 🔹 Fetch Config */
  /* ============================= */

  const fetchConfig = useCallback(async () => {
    try {
      const res = await get("/config/");
      if (res?.status) {
        setConfig(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch config", error);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  /* ============================= */
  /* 🔹 Sync API Data */
  /* ============================= */

  useEffect(() => {
    if (!config) return;
    setThemeColor(config.app_primary_color || "#EAB308");
   
  }, [config]);

  /* ============================= */
  /* 🔹 Branding Sync */
  /* ============================= */

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--brand-primary", themeColor);
    root.style.setProperty("--brand-secondary", themeColor);
    root.style.setProperty("--sidebar-active-bg", `${themeColor}1a`);

  }, [themeColor,]);

  
  

  const token = Cookies.get("whoxaauth");

  return (
    <Router>
      <Routes>

        {/* Public Route */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="report-types-list" element={<ReportTypesList />} />
            <Route path="user-report-list" element={<UserReportList />} />
            <Route path="group-report-list" element={<GroupReportList />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="countrywise-user-list" element={<CountryWiseUserList />} />
            <Route path="group-list" element={<GroupList />} />
            <Route path="language-list" element={<Language />} />
            <Route path="translate-language" element={<TranslateLanguage />} />
            <Route path="block-list" element={<BlockList />} />
            <Route path="avatar-list" element={<AvatarList />} />
            <Route path="audio-call-list" element={<AudioCallList />} />
            <Route path="video-call-list" element={<VideoCallList />} />
            <Route path="push-notification-list" element={<PushNotificationList />} />
            <Route path="settings" element={<Settings />} />
            <Route path="cms-pages" element={<CMSPages />} />
            <Route path="my-profile" element={<MyProfile />} />

          </Route>
        </Route>

      </Routes>
    </Router>
  )
}

export default App;