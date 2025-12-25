import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Layout & Pages
import { UserLayout } from "./components/layout/UserLayout";
import UserDashboard from "./pages/user/Dashboard";
import HouseholdPage from "./pages/user/HouseholdPage";
import FormsPage from "./pages/user/FormsPage";
import BookingPage from "./pages/user/BookingPage";
import FeedbackPage from "./pages/user/FeedbackPage";
import AccountPage from "./pages/user/AccountPage";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HouseholdsPage from "./pages/admin/HouseholdsPage";
import ResidentsPage from "./pages/admin/ResidentsPage";
import ApprovalsPage from "./pages/admin/ApprovalsPage";
import AssetsPage from "./pages/admin/AssetsPage";
import BookingsPage from "./pages/admin/BookingsPage";
import ReportsPage from "./pages/admin/ReportsPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/household" element={<HouseholdPage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="households" element={<HouseholdsPage />} />
            <Route path="residents" element={<ResidentsPage />} />
            <Route path="approvals" element={<ApprovalsPage />} />
            <Route path="assets" element={<AssetsPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
