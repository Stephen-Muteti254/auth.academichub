import { resolveUserDestination } from "./userDestinationResolver";

export default function redirectAfterLogin(user) {
    window.location.replace(resolveUserDestination(user));
}