import {connectDB} from "@/util/database";

export default async function handler(req, res) {

    const client = await connectDB;
    const db = client.db("forum")

    if(req.method == 'POST') {
        if(req.body.title == '' || req.body.content == '') {
            return res.status(500).json('내용을 입력해 주라주');
        }
        await db.collection('post').insertOne(req.body);
        return res.status(302).redirect('/list');
    }

}