import { Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import PageLoader from "@/components/PageLoader";
import ExternalRedirect from "@/components/ExternalRedirect";

import { resolveUserDestination } from "@/services/userDestinationResolver";

const GuestGuard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Outlet />;
  }

  return <ExternalRedirect to={resolveUserDestination(user)} />;
};

export default GuestGuard;