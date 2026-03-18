import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getSession, createToken, setSessionToken } from '@/lib/auth';
import { User } from '@/types/user';

export async function PUT(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('notes-app');

    const result = await db.collection<User>('users').findOneAndUpdate(
      { _id: session.userId },
      {
        $set: {
          username,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser: User = {
      ...result,
      _id: result._id.toString(),
    };

    const newToken = await createToken(updatedUser);
    await setSessionToken(newToken);

    return NextResponse.json({
      user: {
        userId: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
