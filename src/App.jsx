import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { MainLayout } from "./layout/MainLayout";
import { LoginPage } from "./pages/auth/Login";
import { SignupPage } from "./pages/auth/Signup";
import { DashboardPage } from "./pages/dashboard/Dashboard";
import { ClientsPage } from "./pages/dashboard/clients/Clients";
import { AboutPage } from "./pages/dashboard/about/About";
import { ServicesPage } from "./pages/dashboard/services/Services";
import { RatingsPage } from "./pages/dashboard/ratings/Ratings";
import { AccountPage } from "./pages/dashboard/account/Account";
import { TripsPage } from "./pages/dashboard/trips/Trips";
import { TripReservationsPage } from "./pages/dashboard/trips/reservations/TripReservations";
import { HotelsPage } from "./pages/dashboard/hotels/Hotels";
import { HotelReservationsPage } from "./pages/dashboard/hotels/reservations/HotelReservations";
import { ChatsPage } from "./pages/dashboard/chats/Chats";
import { ContactPage } from "./pages/dashboard/contact/Contact";
import { HeroUIProvider } from "@heroui/system";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <HeroUIProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="ratings" element={<RatingsPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="trips" element={<TripsPage />} />
              <Route
                path="trips/reservations"
                element={<TripReservationsPage />}
              />
              <Route path="hotels" element={<HotelsPage />} />
              <Route
                path="hotels/reservations"
                element={<HotelReservationsPage />}
              />
              <Route path="chats" element={<ChatsPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HeroUIProvider>
    </AuthProvider>
  );
}

export default App;
