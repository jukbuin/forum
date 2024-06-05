'use client'
export default function Error({error, reset}) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src="/error.png" alt="Error Image"/>
        </div>
    )
}