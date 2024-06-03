import {connectDB} from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {

    if(req.method == 'POST') {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(500).json('내용을 입력해 주라주');
        } else {
            let hash = await bcrypt.hash(password, 10)
            req.body.password = hash;

            const client = await connectDB;
            const db = client.db("forum");

            let useEmail = await db.collection('user_cred').findOne({email: email})
            if(useEmail == null) {
                await db.collection('user_cred').insertOne(req.body);
                return res.status(302).redirect('/api/auth/signin?callbackUrl=http://localhost:3000/list');
            } else {
                return res.status(500).json('이미 가입된 이메일이라구');
            }
        }
    }
}