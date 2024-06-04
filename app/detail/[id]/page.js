import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";
import Comment from "@/app/detail/[id]/Comment";

export default async function Detail(props) {
    const client = await connectDB;
    const db = client.db("forum")
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})
    return (
        <div>
            <p className="detail_author_name">[{result.author_name}]</p>
            <h4 className="detail_title">{result.title} ({result.created_at})</h4>
            <p>{result.content}</p>
            <Comment _id={result._id.toString()}/>
        </div>
    )
}