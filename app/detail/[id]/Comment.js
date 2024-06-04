'use client'

import {useEffect, useState} from "react";

export default function Comment(props) {
    let [content, setContent] = useState('')
    let [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`/api/comment/list?id=${props._id}`).then(r => r.json()).then((result) => {
            // console.log(result)
            setComments(result)
        })
    }, []);

    return (
        <div>
            <br/>
            <hr></hr>
            {
                comments.length > 0 ?
                    comments.map((list, i) =>
                        <div className="comment" key={i}>
                            <p>{list.author_name} ({list.created_at})</p>
                            <p>{list.content}</p>
                            <hr></hr>
                        </div>
                    )
                    : <div><p>댓글없음</p><br/></div>
            }
            <input className="comment_area" value={content} onChange={(e) => {
                setContent(e.target.value)
            }}/>
            <button onClick={() => {
                fetch('/api/comment/new', {
                    method: 'post',
                    body: JSON.stringify({content: content, _id: props._id})
                }).then(r => r.json()).then((newResult) => {
                    // console.log(newResult)
                    setComments([...comments, newResult]);
                    // console.log(comments)
                    setContent('');
                })
            }}>댓글전송
            </button>
        </div>
    )
}