'use client';

import { Note, NoteTag } from '@/types/note';

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

const tagClasses: Record<NoteTag, string> = {
  Todo: 'tag-todo',
  Work: 'tag-work',
  Personal: 'tag-personal',
  Travel: 'tag-travel',
  Ideas: 'tag-ideas',
  Shopping: 'tag-shopping',
  Health: 'tag-health',
  Finance: 'tag-finance',
};

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6">
          <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-white mb-2">
          No notes yet
        </h3>
        <p className="text-white/50">
          Start capturing your thoughts by clicking &quot;New Note&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note, index) => (
        <div
          key={note._id}
          className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 cursor-pointer opacity-0 animate-fade-in-up stagger-${Math.min(index + 1, 5)} border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300`}
          onClick={() => onEdit(note)}
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3 className="font-display text-lg font-semibold text-white truncate flex-1">
              {note.title}
            </h3>
            {note.tag && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${tagClasses[note.tag]}`}>
                {note.tag}
              </span>
            )}
          </div>
          
          <p className="text-white/60 text-sm mb-5 line-clamp-3 leading-relaxed">
            {note.content}
          </p>
          
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <span className="text-xs text-white/40 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(note.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              {' · '}
              {new Date(note.updatedAt).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note);
              }}
              className="text-xs text-white/40 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-500/20"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
