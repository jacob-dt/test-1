import NextAuth from "next-auth";
import { authorizationChoices } from "@/lib/authorizationChoices";

const authHandle = NextAuth(authorizationChoices);

export { authHandle as GET, authHandle as POST };
