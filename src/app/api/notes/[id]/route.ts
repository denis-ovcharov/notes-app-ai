import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Note } from '@/types/note';
import { ObjectId, Filter } from 'mongodb';
import { getSession } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Note ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('notes-app');

    const filter: Filter<Note> = {
      _id: new ObjectId(id) as unknown as string,
      userId: session.userId,
    };
    const note = await db.collection<Note>('notes').findOne(filter);

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    const serializedNote = {
      ...note,
      _id: note._id.toString(),
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };

    return NextResponse.json(serializedNote);
  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, content, category } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Note ID is required' },
        { status: 400 }
      );
    }

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('notes-app');

    const now = new Date();
    const filter: Filter<Note> = {
      _id: new ObjectId(id) as unknown as string,
      userId: session.userId,
    };

    const result = await db.collection<Note>('notes').updateOne(filter, {
      $set: {
        title,
        content,
        category,
        updatedAt: now,
      },
    });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    const updatedNote = {
      _id: id,
      title,
      content,
      category,
      createdAt: new Date().toISOString(),
      updatedAt: now.toISOString(),
    };

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Note ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('notes-app');

    const filter: Filter<Note> = {
      _id: new ObjectId(id) as unknown as string,
      userId: session.userId,
    };
    const result = await db.collection<Note>('notes').deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}
