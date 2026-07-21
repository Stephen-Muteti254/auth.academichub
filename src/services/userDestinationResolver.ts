import { getPortal } from "./portalResolver";
import { resolveWriter } from "./onboardingResolver";

export function resolveUserDestination(user) {
    if (user.role === "writer") {
        return resolveWriter(user);
    }

    return getPortal(user.role);
}