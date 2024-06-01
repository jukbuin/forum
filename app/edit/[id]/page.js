import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function Edit(props) {
    const client = await connectDB;
    const db = client.db("forum")
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})

    return (
        <div className="p-20">
            <h4>수정페이지</h4>
            <form action="/api/post/edit" method="post">
                <input type="text" name="title" defaultValue={result.title}/>
                <textarea name="content" defaultValue={result.content}/>
                <input type="hidden" name="_id" value={result._id.toString()}/>
                <button type="submit">수정</button>
            </form>
        </div>
    )
}