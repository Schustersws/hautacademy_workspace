import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RequestAccessPage from './components/RequestAccessPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Placeholder from './components/Placeholder';
import { User } from './types';
import UserManagementPage from './components/admin/UserManagementPage';
import MyProfilePage from './components/user/MyProfilePage';
import EventsManagementPage from './components/admin/EventsManagementPage';
import EventDetailsPage from './components/admin/EventDetailsPage';
import EventsPage from './components/user/EventsPage';
import TitlesManagementPage from './components/admin/TitlesManagementPage';
import MyTitlesPage from './components/user/MyTitlesPage';
import CourseManagementPage from './components/admin/CourseManagementPage';
import AcademyPage from './components/user/AcademyPage';
import CoursePlayerPage from './components/user/CoursePlayerPage';
import LiveAcademyAdminPage from './components/admin/LiveAcademyAdminPage';
import LiveAcademyPage from './components/user/LiveAcademyPage';
import StoreManagementPage from './components/admin/StoreManagementPage';
import StoreOrdersPage from './components/admin/StoreOrdersPage';
import StorePage from './components/user/StorePage';
import BenefitsManagementPage from './components/admin/BenefitsManagementPage';
import BenefitsPage from './components/user/BenefitsPage';
import ToolsManagementPage from './components/admin/ToolsManagementPage';
import ToolsPage from './components/user/ToolsPage';
import AdminSettingsPage from './components/admin/SettingsPage';
import UserSettingsPage from './components/user/SettingsPage';
import SubsidiariesPage from './components/admin/SubsidiariesPage';
import EmailTemplatesPage from './components/admin/EmailTemplatesPage';


const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  
  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }
  
  const user: User = JSON.parse(userString);

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/request-access" element={<RequestAccessPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><UserManagementPage /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute adminOnly={true}><EventsManagementPage /></ProtectedRoute>} />
        <Route path="/admin/events/:id" element={<ProtectedRoute adminOnly={true}><EventDetailsPage /></ProtectedRoute>} />
        <Route path="/admin/titles" element={<ProtectedRoute adminOnly={true}><TitlesManagementPage /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute adminOnly={true}><CourseManagementPage /></ProtectedRoute>} />
        <Route path="/admin/live" element={<ProtectedRoute adminOnly={true}><LiveAcademyAdminPage /></ProtectedRoute>} />
        <Route path="/admin/store" element={<ProtectedRoute adminOnly={true}><StoreManagementPage /></ProtectedRoute>} />
        <Route path="/admin/store/orders" element={<ProtectedRoute adminOnly={true}><StoreOrdersPage /></ProtectedRoute>} />
        <Route path="/admin/benefits" element={<ProtectedRoute adminOnly={true}><BenefitsManagementPage /></ProtectedRoute>} />
        <Route path="/admin/tools" element={<ProtectedRoute adminOnly={true}><ToolsManagementPage /></ProtectedRoute>} />
        <Route path="/admin/subsidiaries" element={<ProtectedRoute adminOnly={true}><SubsidiariesPage /></ProtectedRoute>} />
        <Route path="/admin/emails" element={<ProtectedRoute adminOnly={true}><EmailTemplatesPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute adminOnly={true}><AdminSettingsPage /></ProtectedRoute>} />
        <Route path="/admin/*" element={<ProtectedRoute adminOnly={true}><Placeholder isAdmin={true} /></ProtectedRoute>} />

        {/* User Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><MyProfilePage /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
        <Route path="/titles" element={<ProtectedRoute><MyTitlesPage /></ProtectedRoute>} />
        <Route path="/academy" element={<ProtectedRoute><AcademyPage /></ProtectedRoute>} />
        <Route path="/course/:courseSlug" element={<ProtectedRoute><CoursePlayerPage /></ProtectedRoute>} />
        <Route path="/live" element={<ProtectedRoute><LiveAcademyPage /></ProtectedRoute>} />
        <Route path="/store" element={<ProtectedRoute><StorePage /></ProtectedRoute>} />
        <Route path="/benefits" element={<ProtectedRoute><BenefitsPage /></ProtectedRoute>} />
        <Route path="/tools" element={<ProtectedRoute><ToolsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><UserSettingsPage /></ProtectedRoute>} />
        
        <Route path="/forgot-password" element={<Placeholder isAdmin={false} />} />
        <Route path="/terms" element={<Placeholder isAdmin={false} />} />
        <Route path="/privacy" element={<Placeholder isAdmin={false} />} />
        
        {/* Catch-all for other authenticated user routes */}
        <Route path="/*" element={<ProtectedRoute><Placeholder isAdmin={false} /></ProtectedRoute>} />

      </Routes>
    </HashRouter>
  );
};

export default App;