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
                                body: JSON.stringify(list)
                            }).then((r) => {
                                if (r.ok) {
                                    return r.json();
                                } else {
                                    throw new Error('삭제 실패');
                                }
                            }).then(() => {
                                e.target.parentElement.style.opacity = 0;
                                setTimeout(() => {
                                    e.target.parentElement.style.display= 'none'
                                },1000)
                            }).catch((error) => {
                                alert('누구냐');
                                console.error(error);
                            });
                        }}>삭제하기🗑️</span>
                    </div>
                )
            }
        </div>
    )
}