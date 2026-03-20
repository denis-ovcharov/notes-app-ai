'use client';

import { NoteTag, NOTE_TAGS } from '@/types/note';

interface CategoryFilterProps {
  selectedCategory: NoteTag | null;
  onSelectCategory: (category: NoteTag | null) => void;
}

const tagClasses: Record<NoteTag, { active: string; inactive: string }> = {
  Todo: { active: 'bg-red-500 text-white', inactive: 'tag-todo hover:ring-2 hover:ring-red-300' },
  Work: { active: 'bg-blue-500 text-white', inactive: 'tag-work hover:ring-2 hover:ring-blue-300' },
  Personal: { active: 'bg-green-500 text-white', inactive: 'tag-personal hover:ring-2 hover:ring-green-300' },
  Travel: { active: 'bg-purple-500 text-white', inactive: 'tag-travel hover:ring-2 hover:ring-purple-300' },
  Ideas: { active: 'bg-yellow-500 text-white', inactive: 'tag-ideas hover:ring-2 hover:ring-yellow-300' },
  Shopping: { active: 'bg-pink-500 text-white', inactive: 'tag-shopping hover:ring-2 hover:ring-pink-300' },
  Health: { active: 'bg-teal-500 text-white', inactive: 'tag-health hover:ring-2 hover:ring-teal-300' },
  Finance: { active: 'bg-indigo-500 text-white', inactive: 'tag-finance hover:ring-2 hover:ring-indigo-300' },
};

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
            selectedCategory === null
              ? 'bg-[var(--color-charcoal)] text-white shadow-md'
              : 'bg-white text-[var(--color-warm-gray)] border border-[var(--color-light-gray)] hover:border-[var(--color-terracotta-light)] hover:text-[var(--color-charcoal)]'
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
