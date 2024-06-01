import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {

    const client = await connectDB;
    const db = client.db("forum")

    if(req.method == 'POST') {
        if(req.body.title == '' || req.body.content == '') {
            return res.status(500).json('내용을 입력해 주라주');
        }
        await db.collection('post').updateOne({_id: new ObjectId(req.body._id)}, {$set : {title : req.body.title, content : req.body.content}})
        return res.status(302).redirect(`/detail/${req.body._id}`);
    }

}