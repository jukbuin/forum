import {connectDB} from "@/util/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {
    let session = await getServerSession(req, res, authOptions)

    if (req.method == 'POST') {
        req.body = JSON.parse(req.body);
        if (session) {
            let currentDate = new Date();
            let formattedDate = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환

            let save = {
                content: req.body.content,
                parent: new ObjectId(req.body._id),
                author: session.user.email,
                author_name: session.user.name,
                created_at: formattedDate
            }
            console.log(session)

            const client = await connectDB;
            const db = client.db("forum")

            if (save.content == '' || save.author == '') {
                return res.status(500).json('내용을 입력하거나 로그인을 해라');
            } else {
               await db.collection('comment').insertOne(save);
                return res.status(200).json(save);
            }
        }

    }

}