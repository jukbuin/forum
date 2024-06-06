import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    if (req.method == 'DELETE') {
        const client = await connectDB;
        const db = client.db("forum")
        console.log(req.body)

        await db.collection('comment').deleteOne({_id: new ObjectId(JSON.parse(req.body)._id)})
        return res.status(200).json('삭제완료');
    }

}