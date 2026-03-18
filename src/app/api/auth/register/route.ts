import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hashPassword, createToken, setSessionToken } from '@/lib/auth';
import { User } from '@/types/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('notes-app');

    const existingUser = await db.collection<User>('users').findOne({ username });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this username already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const now = new Date();

    const result = await db.collection<User>('users').insertOne({
      username,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });

    const newUser: User = {
      _id: result.insertedId.toString(),
      username,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    };

    const token = await createToken(newUser);
    await setSessionToken(token);

    return NextResponse.json(
      {
        user: {
          _id: newUser._id,
          username: newUser.username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
