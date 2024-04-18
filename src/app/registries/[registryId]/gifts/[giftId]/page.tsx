import RegistryPage from "../../page";

type PageProps = {
    params: {
        registryId: string;
        giftId: string;
    };
};

export default function GiftPage({ params }: PageProps) {
    return <RegistryPage params={params} />;
}
