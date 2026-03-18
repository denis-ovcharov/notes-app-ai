import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { comparePassword, createToken, setSessionToken } from '@/lib/auth';
import { User } from '@/types/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('notes-app');

    const user = await db.collection<User>('users').findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = await createToken(user);
    await setSessionToken(token);

    return NextResponse.json({
      user: {
        _id: user._id?.toString(),
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}
