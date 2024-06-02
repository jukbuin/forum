import {connectDB} from "@/util/database";
import ListItem from "@/app/list/ListItem";

export const dynamic = 'force-dynamic'

export default async function List() {
    const client = await connectDB;
    const db = client.db("forum")
    let result = await db.collection('post').find().toArray()

    // MongoDB ObjectId를 문자열로 변환
    const data = result.map((list) => ({
        ...list,
        _id: list._id.toString(),
    }));

    return (
        <div className="list-bg">
           <ListItem result={data}></ListItem>
        </div>
    )
}