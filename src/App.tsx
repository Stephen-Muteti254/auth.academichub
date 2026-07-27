import * as Lazy from "@/lazy";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthLayout } from "./components/AuthLayout";
import NotFound from "./pages/NotFound";
import RegisterClient from "./pages/RegisterClient";
import RegisterWriter from "./pages/RegisterWriter";
import ApplicationPending from "./pages/ApplicationPending";
import ApplicationRejected from "./pages/ApplicationRejected";
import ApplicationApproved from "./pages/ApplicationApproved";
import WriterApplication from "./pages/WriterApplication";
import EmailVerification from "./pages/EmailVerification";
import EmailVerificationConfirm from "./pages/EmailVerificationConfirm";
import { RequireAuth } from '@/components/RequireAuth';
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { SupportChatProvider } from "@/contexts/SupportChatContext";

import EmailVerificationGuard from "@/components/guards/EmailVerificationGuard";
import ApplicationStatusGuard from "@/components/guards/ApplicationStatusGuard";

import { Suspense } from "react";
import PageLoader from "@/components/PageLoader";
import { HelmetProvider } from "react-helmet-async";
import GuestGuard from "@/components/guards/GuestGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
              <ChatProvider>
              <SupportChatProvider>
                  <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* ================= PUBLIC ================= */}
                    <Route element={<AuthLayout />}>
                      <Route element={<GuestGuard />}>
                        <Route index element={<Lazy.Login />} />
                        <Route path="register" element={<Lazy.Register />} />
                        <Route path="register/client" element={<RegisterClient />} />
                        <Route path="register/writer" element={<RegisterWriter />} />

                        <Route path="email-verification" element={<EmailVerification />} />
                        <Route path="verify-email" element={<EmailVerificationConfirm />} />
                      </Route>

                      <Route
                        path="writer-onboarding"
                        element={<RequireAuth requiredRole={["writer"]} />}
                      >
                        <Route element={<EmailVerificationGuard />}>
                          <Route element={<ApplicationStatusGuard />}>
                            <Route path="apply" element={<WriterApplication />} />
                            <Route path="pending" element={<ApplicationPending />} />
                            <Route path="approved" element={<ApplicationApproved />} />
                            <Route path="rejected" element={<ApplicationRejected />} />
                          </Route>
                        </Route>
                      </Route>

                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>

                  </Routes>
                </Suspense>
              </SupportChatProvider>
              </ChatProvider>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
