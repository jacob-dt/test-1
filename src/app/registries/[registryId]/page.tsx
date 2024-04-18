"use server";
import { liveblocksClient } from "@/lib/liveblocksClient";
import Registry from "@/components/Registry";

import { getUserEmail } from "@/lib/userClient";

type types = {
    params: {
        registryId: string;
    };
};

export default async function RegistryPage(properties: types) {
    const userEmail = await getUserEmail();
    const userAccess = (
        await liveblocksClient.getRoom(properties.params.registryId)
    ).usersAccesses?.[userEmail];
    let hasAccess = userAccess && [...userAccess].includes("room:write");
    if (!hasAccess) {
        return <div>Access Denied</div>;
    }
    return (
        <div>
            <Registry
                name={(
                    await liveblocksClient.getRoom(properties.params.registryId)
                ).metadata.registryName.toString()}
                id={properties.params.registryId}
            />
        </div>
    );
}
