import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Note, NoteCategory } from '@/types/note';
import { ObjectId, Filter } from 'mongodb';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as NoteCategory | null;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const client = await clientPromise;
    const db = client.db('notes-app');

    const filter: Filter<Note> = { userId: session.userId };
    if (category) {
      filter.category = category;
    }

    const total = await db.collection<Note>('notes').countDocuments(filter);

    const notes = await db
      .collection<Note>('notes')
      .find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const serializedNotes = notes.map((note) => ({
      ...note,
      _id: note._id.toString(),
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      notes: serializedNotes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, category } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('notes-app');

    const now = new Date();
    const result = await db.collection<Note>('notes').insertOne({
      title,
      content,
      category,
      userId: session.userId,
      createdAt: now,
      updatedAt: now,
    });

    const newNote = {
      _id: result.insertedId.toString(),
      title,
      content,
      category,
      userId: session.userId,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
