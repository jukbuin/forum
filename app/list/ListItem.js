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
                        <span onClick={(e) => {
                            fetch('/api/post/delete', {
                                method: 'delete',
                                body: JSON.stringify(list._id)
                            }).then((r) => r.json()
                            ).then(() => {
                                e.target.parentElement.style.opacity = 0;
                                setTimeout(() => {
                                    e.target.parentElement.style.display= 'none'
                                },1000)
                            })
                        }}>삭제하기🗑️</span>
                    </div>
                )
            }
        </div>
    )
}