import { authorizationChoices } from "@/lib/authorizationChoices";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    const registrySesh = await getServerSession(authorizationChoices);

    if (!registrySesh || !registrySesh.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const user = registrySesh.user;
    const email = user.email || "";

    const { status, body } = await liveblocksClient.identifyUser(
        {
            userId: email,
            groupIds: [],
        },
        {
            userInfo: {
                name: user.name || "",
                email: email,
                image: user.image,
            },
        }
    );

    return new Response(body, { status });
}
