import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";
import Comment from "@/app/detail/[id]/Comment";
import notFound from "@/app/not-found";

export default async function Detail(props) {
    const client = await connectDB;
    const db = client.db("forum")
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})

    if (result === null) {
        return notFound()
    }
    return (
        <div className="detail-bg">
            <p className="detail_author_name">[{result.author_name}]</p>
            <h4 className="detail_title">{result.title} ({result.created_at})</h4>
            <p>{result.content}</p>
            {result.image_url && <img src={result.image_url} alt="Post Image" style={{maxWidth: '100%'}} />}
            <br/><br/><br/>
            <Comment _id={result._id.toString()}/>
        </div>
    )
}