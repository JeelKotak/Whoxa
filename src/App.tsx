import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route  element={<Layout />}>
        {/* <Route index element={<Navigate to="/dashboard" replace />} /> */}
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* List */}
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

          {/* Calls */}
          <Route path="audio-call-list" element={<AudioCallList />} />

          <Route path="video-call-list" element={<VideoCallList />} />

          {/* Notifications */}
          <Route path="push-notification-list" element={<PushNotificationList />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

          <Route path="cms-pages" element={<CMSPages />} />

          <Route path="my-profile" element={<MyProfile />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default App