'use client';

import { NoteTag, NOTE_TAGS } from '@/types/note';

interface CategoryFilterProps {
  selectedCategory: NoteTag | null;
  onSelectCategory: (category: NoteTag | null) => void;
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

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border cursor-pointer ${
          selectedCategory === null
            ? 'bg-gray-800 text-white border-gray-800'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
      >
        All
      </button>
      {NOTE_TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectCategory(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border cursor-pointer ${
            selectedCategory === tag
              ? 'bg-gray-800 text-white border-gray-800'
              : `${tagColors[tag]} hover:opacity-80`
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
