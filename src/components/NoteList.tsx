'use client';

import { Note, NoteCategory } from '@/types/note';

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

const categoryColors: Record<NoteCategory, string> = {
  Todo: 'bg-red-100 text-red-800',
  Work: 'bg-blue-100 text-blue-800',
  Personal: 'bg-green-100 text-green-800',
  Travel: 'bg-purple-100 text-purple-800',
  Ideas: 'bg-yellow-100 text-yellow-800',
  Shopping: 'bg-pink-100 text-pink-800',
  Health: 'bg-teal-100 text-teal-800',
  Finance: 'bg-indigo-100 text-indigo-800',
};

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onEdit(note)}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate flex-1">
              {note.title}
            </h3>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${categoryColors[note.category]}`}>
              {note.category}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {note.content}
          </p>
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>
              {new Date(note.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note);
              }}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
