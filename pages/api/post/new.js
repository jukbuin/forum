import {connectDB} from "@/util/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions)
    if (session) {
        req.body.author = session.user.email
    }

    if(req.method == 'POST') {
        const client = await connectDB;
        const db = client.db("forum")
        if(req.body.title == '' || req.body.content == '') {
            return res.status(500).json('내용을 입력해 주라주');
        }
        await db.collection('post').insertOne(req.body);
        return res.status(302).redirect('/list');
    }

}