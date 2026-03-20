'use client';

import { NoteTag, NOTE_TAGS } from '@/types/note';

interface CategoryFilterProps {
  selectedCategory: NoteTag | null;
  onSelectCategory: (category: NoteTag | null) => void;
}

const tagClasses: Record<NoteTag, { active: string; inactive: string }> = {
  Todo: { active: 'bg-red-500 text-white', inactive: 'bg-red-500/20 text-red-300 hover:bg-red-500/30' },
  Work: { active: 'bg-blue-500 text-white', inactive: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' },
  Personal: { active: 'bg-green-500 text-white', inactive: 'bg-green-500/20 text-green-300 hover:bg-green-500/30' },
  Travel: { active: 'bg-purple-500 text-white', inactive: 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' },
  Ideas: { active: 'bg-yellow-500 text-white', inactive: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30' },
  Shopping: { active: 'bg-pink-500 text-white', inactive: 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30' },
  Health: { active: 'bg-teal-500 text-white', inactive: 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30' },
  Finance: { active: 'bg-indigo-500 text-white', inactive: 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30' },
};

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
            selectedCategory === null
              ? 'bg-white text-[var(--color-charcoal)] shadow-lg'
              : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:border-white/30'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            All
          </span>
        </button>
        {NOTE_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelectCategory(tag)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
              selectedCategory === tag
                ? tagClasses[tag].active
                : `${tagClasses[tag].inactive}`
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
