'use client'

import {useEffect, useState} from "react";

export default function Comment(props) {
    let [content, setContent] = useState('')
    let [comments, setComments] = useState([]);
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
                            <p style={{display : "inline-block"}}>{list.author_name} ({list.created_at})</p>
                            {session && session.user.email === list.author && (
                                <>
                            <span style={{marginLeft : 30, cursor : "pointer"}}
                                  onClick={(e) => {
                                      fetch('/api/comment/delete', {
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
                                  }}>🗑️</span>
                                </>
                            )}
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