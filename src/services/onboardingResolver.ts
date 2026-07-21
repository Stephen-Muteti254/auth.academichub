import { PORTALS } from "@/config/portals";

import { WRITER_ONBOARDING } from "@/config/onboarding";

export function resolveWriter(user){

    switch(user.application_status){

        case "paid_initial_deposit":
            return PORTALS.WRITER;

        default:
            return (
                PORTALS.AUTH +
                WRITER_ONBOARDING[user.application_status]
            );

    }

}