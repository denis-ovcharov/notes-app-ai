'use client';

import { useEffect, useState } from 'react';
import { Note, NoteTag, NOTE_TAGS } from '@/types/note';

interface NoteEditorProps {
  note?: Note | null;
  onSave: (title: string, content: string, tag: NoteTag) => void;
  onCancel: () => void;
}

const tagColors: Record<NoteTag, string> = {
  Todo: 'bg-red-100 text-red-800 border-red-300',
  Work: 'bg-blue-100 text-blue-800 border-blue-300',
  Personal: 'bg-green-100 text-green-800 border-green-300',
  Travel: 'bg-purple-100 text-purple-800 border-purple-300',
  Ideas: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Shopping: 'bg-pink-100 text-pink-800 border-pink-300',
  Health: 'bg-teal-100 text-teal-800 border-teal-300',
  Finance: 'bg-indigo-100 text-indigo-800 border-indigo-300',
};

export default function NoteEditor({ note, onSave, onCancel }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<NoteTag>('Personal');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTag(note.tag || 'Personal');
    }
    setTimeout(() => setIsVisible(true), 10);
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, content, tag);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="absolute inset-0 bg-[var(--color-charcoal)]/60 backdrop-blur-sm"></div>
      
      <div 
        className={`relative w-full max-w-xl bg-[var(--color-warm-white)] rounded-3xl shadow-2xl transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-[var(--color-charcoal)]">
              {note ? 'Edit Note' : 'New Note'}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-[var(--color-light-gray)] transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-[var(--color-warm-gray)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-[var(--color-charcoal)] mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                placeholder="Give your note a title..."
                required
              />
            </div>

            <div>
              <label htmlFor="tag" className="block text-sm font-semibold text-[var(--color-charcoal)] mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  id="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value as NoteTag)}
                  className="input-field appearance-none pr-10 cursor-pointer"
                >
                  {NOTE_TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-[var(--color-warm-gray)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {tag && (
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${tagColors[tag]}`}>
                  {tag}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-[var(--color-charcoal)] mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="input-field resize-none"
                placeholder="What's on your mind?"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary cursor-pointer"
            >
              {note ? 'Save Changes' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
