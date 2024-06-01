import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {

    const client = await connectDB;
    const db = client.db("forum")

    if(req.method == 'DELETE') {
        await db.collection('post').deleteOne({_id: new ObjectId(JSON.parse(req.body))})
        return res.status(200).json('삭제완료');
    }

}