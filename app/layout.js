import "./globals.css";
import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {LoginBtn, LogOutBtn} from "@/app/LoginBtn";
import {cookies} from "next/headers";
import DarkMode from "@/app/DarkMode";


export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    icons: {
        icon: "/cookie.png",
    },
};

export default async function RootLayout({children}) {
    let session = await getServerSession(authOptions)

    let res = cookies().get('mode')
    console.log(res.value)

    return (
        <html lang="en">
        <body className={ res != undefined &&res.value == 'dark' ? "dark-mode" : ''}>
        <div className="navbar">
            <Link href="/" className="logo"><img src="/cookie.png" style={{width : 21.33, height : 21.33}}/> 먹킷리스트</Link>
            <Link href="/list">List</Link>
            <Link href="/write">Write</Link>
            <Link href="/register">Register</Link>
            {
                session == null ? <LoginBtn/> : <span>{session.user.name}님&nbsp;&nbsp; <LogOutBtn/></span>
            }
            <DarkMode/>
        </div>
        {children}
        </body>
        </html>
    );
}
