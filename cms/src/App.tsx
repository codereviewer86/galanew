import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/PublicRoute";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import SectorItemPage from "./pages/Sector/SectorItemPage";
import SectorItemServicePage from "./pages/Sector/SectorItemServicePage";
import SectorItemServiceDetailsPage from "./pages/Sector/SectorItemServiceDetailsPage";
import SectionManagement from "./pages/SectionManagement";
import SectionEdit from "./pages/SectionEdit";
import NavigationManagement from "./pages/NavigationManagement";
import PartnersManagement from "./pages/PartnersManagement";
import BannerManagement from "./pages/BannerManagement";
import AccreditationsManagement from "./pages/AccreditationsManagement";
import Careers from "./pages/Careers";
import RegistrationLicenseManagement from "./pages/RegistrationLicenseManagement";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Auth Routes */}
          <Route 
            path="/signin" 
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } 
          />

          {/* Protected Dashboard Layout */}
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />

            {/* Others Page */}
            <Route path="profile" element={<UserProfiles />} />
            <Route path="blank" element={<Blank />} />

            {/* Forms */}
            <Route path="form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />
            <Route path="sector-items" element={<SectorItemPage />} />
            <Route path="sector-item-services" element={<SectorItemServicePage />} />
            <Route path="sector-item-service-detail" element={<SectorItemServiceDetailsPage />} />
            <Route path="sections" element={<SectionManagement />} />
            <Route path="sections/new" element={<SectionEdit />} />
            <Route path="sections/:id" element={<SectionEdit />} />
            <Route path="navigation" element={<NavigationManagement />} />
            <Route path="partners" element={<PartnersManagement />} />
            <Route path="banners" element={<BannerManagement />} />
            <Route path="accreditations" element={<AccreditationsManagement />} />
            <Route path="careers" element={<Careers />} />
            <Route path="registration-license" element={<RegistrationLicenseManagement />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
