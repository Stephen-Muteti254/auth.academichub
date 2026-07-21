import { PORTALS } from "@/config/portals";

export function getPortal(role:string){

    switch(role){

        case "writer":
            return PORTALS.WRITER;

        case "client":
            return PORTALS.CLIENT;

        case "admin":
        case "super_admin":
            return PORTALS.ADMIN;

        default:
            return PORTALS.PUBLIC;
    }

}