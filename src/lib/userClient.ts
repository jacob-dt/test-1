import { getServerSession } from "next-auth";
import { authorizationChoices } from "./authorizationChoices";

export async function getUserEmail(): Promise<string> {
    const session = await getServerSession(authorizationChoices);
    return session?.user?.email || "";
}
