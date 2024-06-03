import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method == 'DELETE') {
        let session = await getServerSession(req, res, authOptions)
        const client = await connectDB;
        const db = client.db("forum")

        if (session && JSON.parse(req.body).author == session.user.email) {
            await db.collection('post').deleteOne({_id: new ObjectId(JSON.parse(req.body)._id)})
            return res.status(200).json('삭제완료');
        } else {
            return res.status(500).json('누구냐');
        }
    }

}