'use client'

import Link from "next/link";

export default function ListItem({result}) {

    return (
        <div>
            {
                result.map((list, i) =>
                    <div className="list-item" key={i}>
                        <Link prefetch={false} href={`/detail/${list._id}`}><h4>{list.title}</h4></Link>
                        <p>{list.content}</p>
                        <Link href={`/edit/${list._id}`}>수정하기✏️</Link>
                        <span onClick={()=>{
                            fetch('/api/post/delete', {
                                method : 'delete',
                                body : JSON.stringify(list._id)
                            }).then((r)=>{
                                return r.json()
                            }).then((r)=>{
                                console.log(r)
                            })
                        }}>삭제하기🗑️</span>
                    </div>
                )
            }
        </div>
    )
}