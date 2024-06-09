import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export async function middleware(req) {
    const session = await getToken({req : req})
    if(req.nextUrl.pathname.startsWith('/write')) {
        if (session == null) {
            return NextResponse.redirect('http://mukkitlist-env.eba-uuhabuji.ap-northeast-2.elasticbeanstalk.com/api/auth/signin')
        }
    }

}