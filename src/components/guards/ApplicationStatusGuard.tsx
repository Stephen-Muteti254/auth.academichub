import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { resolveUserDestination } from "@/services/userDestinationResolver";
import { PORTALS } from "@/config/portals";
import ExternalRedirect from "@/components/ExternalRedirect";

const ApplicationStatusGuard = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    const destination = resolveUserDestination(user);

    const current = `${PORTALS.AUTH}${location.pathname}`;

    // Already on the correct onboarding page
    if (destination === current) {
        return <Outlet />;
    }

    // Destination is another application
    if (!destination.startsWith(PORTALS.AUTH)) {
        return <ExternalRedirect to={destination} />;
    }

    // Destination is another auth page
    const path = destination.replace(PORTALS.AUTH, "");

    return <Navigate to={path} replace />;
};

export default ApplicationStatusGuard;