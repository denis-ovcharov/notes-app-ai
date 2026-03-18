import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Note, NoteCategory } from '@/types/note';
import { ObjectId, Filter } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as NoteCategory | null;

    const client = await clientPromise;
    const db = client.db('notes-app');

    const filter: Filter<Note> = category ? { category } : {};

    const notes = await db
      .collection<Note>('notes')
      .find(filter)
      .sort({ updatedAt: -1 })
      .toArray();

    const serializedNotes = notes.map((note) => ({
      ...note,
      _id: note._id.toString(),
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    }));

    return NextResponse.json(serializedNotes);
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
      createdAt: now,
      updatedAt: now,
    });

    const newNote = {
      _id: result.insertedId.toString(),
      title,
      content,
      category,
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
