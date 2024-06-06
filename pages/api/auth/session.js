import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        res.status(200).json(session);
    } else {
        res.status(401).json({message: "Not authenticated"});
    }
}