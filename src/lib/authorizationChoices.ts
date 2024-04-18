import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongoClient";
import { AuthOptions } from "next-auth";

export const authorizationChoices: AuthOptions = {
    secret: process.env.SECRET_AUTH,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    // @ts-ignore
    adapter: MongoDBAdapter(clientPromise),
};
