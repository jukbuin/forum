import {connectDB} from "@/util/database";

export const revalidate = 60;

export default async function Home() {

    // const client = await connectDB;
    // const db = client.db("forum")
    // let result = await db.collection('post').find().toArray()

    // await fetch('/URL', {next : {revalidate : 60}})

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height : '100vh'}}>
            <img src="/mainPage.png"/>
        </div>
    );
}
