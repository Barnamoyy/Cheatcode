import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(request: Request, response: Response) {
    const body = await request.json();
    const userId = process.env.CLERK_USER_ID;
    const { role } =  body;
    if(userId){
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role
            }
        })
        return NextResponse.json({ success: true });
    }
    else {
        return NextResponse.json({success: false, message: 'User not found'})
    }
}