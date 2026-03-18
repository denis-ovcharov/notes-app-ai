'use client';

import { Note, NoteCategory, NOTE_CATEGORIES } from '@/types/note';

interface NoteEditorProps {
  note?: Note | null;
  onSave: (title: string, content: string, category: NoteCategory) => void;
  onCancel: () => void;
}

const categoryColors: Record<NoteCategory, string> = {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;
    const category = (form.elements.namedItem('category') as HTMLSelectElement).value as NoteCategory;
    onSave(title, content, category);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {note ? 'Edit Note' : 'Create Note'}
          </h2>
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={note?.title || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter note title..."
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={note?.category || 'Personal'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              {NOTE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={note?.content || ''}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Write your note here..."
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {note ? 'Save Changes' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
