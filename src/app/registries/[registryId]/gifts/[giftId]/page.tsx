import RegistryPage from "../../page";

type types = {
    parameters: {
        registryId: string;
        giftId: string;
    };
};

export default function GiftPage({ parameters }: types) {
    return <RegistryPage parameters={parameters} />;
}
