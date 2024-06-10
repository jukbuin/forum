'use client'
import {useEffect, useState} from "react";

export default function Write() {
    let [session, setSession] = useState(null);
    let [src, setSrc] = useState('')

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


    if (!session) {
        return <div>로그인하세요</div>
    } else {
        return (
            <div className="p-20">
                <h4>글작성</h4>
                <form action="/api/post/new" method="post">
                    <input type="text" name="title" placeholder="제목을 입력해주세요."/>
                    <textarea name="content" placeholder="내용을 입력해주세요."/>
                    <input type="file" accept="image/*"
                           onChange={async (e) => {
                               let file = e.target.files[0]
                               let filename = encodeURIComponent(file.name)
                               let res = await fetch(`/api/post/image?file=${filename}`)
                               res = await res.json()

                               //S3 업로드
                               const formData = new FormData()
                               Object.entries({...res.fields, file}).forEach(([key, value]) => {
                                   formData.append(key, value)
                               })
                               let uploadResult = await fetch(res.url, {
                                   method: 'POST',
                                   body: formData,
                               })
                               console.log(uploadResult)

                               if (uploadResult.ok) {
                                   setSrc(uploadResult.url + '/' + filename)
                               } else {
                                   console.log('실패')
                               }

                           }}/>
                    <img src={src}/>
                    <input type="hidden" name="image_url" value={src}/>
                    <button style={{display : "block"}} type="submit">작성하기</button>
                </form>
            </div>
        )
    }
}