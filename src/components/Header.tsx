import { authorizationChoices } from "@/lib/authorizationChoices";
import { getServerSession } from "next-auth";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function Header() {
    const session = await getServerSession(authorizationChoices);
    return (
        <header className="bg-zinc-800 text-white p-6 px-8">
            <div className="flex justify-between items-center">
                <Link href="/" className="logo flex items-center">
                    <FontAwesomeIcon icon={faGift} className="h-6 pr-2" />
                    GiftPal
                </Link>
                <div>
                    {session && (
                        <>
                            Hello, {session?.user?.name}
                            <LogoutButton />
                        </>
                    )}
                    {!session && (
                        <>
                            Not Signed In <LoginButton />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
