'use client'

import Link from "next/link";
import {useEffect, useState} from "react";

export default function ListItem({result}) {
    let [session, setSession] = useState(null);

    useEffect(() => {
        fetch('/api/auth/session')
            .then((r) => {
                if (r.status === 200) return r.json();
                return null;
            })
            .then((session) => {
                setSession(session);
            });
    }, []);


    return (
        <div>
            {
                result.map((list, i) => (
                    <div className="list-item" key={i}>
                        <Link prefetch={false} href={`/detail/${list._id}`}><h4>{list.title}</h4></Link>
                        <p>{list.content}</p>
                        {session && session.user.email === list.author && (
                            <>
                                <Link href={`/edit/${list._id}`}>수정하기✏️</Link>
                                <span style={{ cursor: 'pointer'}}
                                    onClick={(e) => {
                                        fetch('/api/post/delete', {
                                            method: 'DELETE',
                                            body: JSON.stringify(list),
                                        })
                                            .then((r) => {
                                                if (r.ok) {
                                                    return r.json();
                                                } else {
                                                    throw new Error('삭제 실패');
                                                }
                                            })
                                            .then(() => {
                                                e.target.parentElement.style.opacity = 0;
                                                setTimeout(() => {
                                                    e.target.parentElement.style.display = 'none';
                                                }, 1000);
                                            })
                                            .catch((error) => {
                                                alert('삭제할 권한이 없습니다.');
                                                console.error(error);
                                            });
                                    }}
                                >
                                삭제하기🗑️
                            </span>
                            </>
                        )}
                    </div>
                ))}
        </div>
    );
}