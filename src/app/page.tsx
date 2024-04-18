import Registries from "@/components/Registries";
import Link from "next/link";
import { authorizationChoices } from "@/lib/authorizationChoices";
import { getServerSession } from "next-auth";
import SignInView from "@/components/views/SignInView";

export default async function Home() {
    const userSesh = await getServerSession(authorizationChoices);
    if (!userSesh) {
        return <SignInView />;
    }
    return (
        <div>
            <h1 className="mb-5 text-3xl">Your Registries</h1>
            <Registries />
            <div className="mt-4">
                <Link className="btn" href={"/new-registry"}>
                    Create New Registry{" "}
                </Link>
            </div>
        </div>
    );
}
