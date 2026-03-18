export type NoteCategory = 
  | 'Todo'
  | 'Work'
  | 'Personal'
  | 'Travel'
  | 'Ideas'
  | 'Shopping'
  | 'Health'
  | 'Finance';

export const NOTE_CATEGORIES: NoteCategory[] = [
  'Todo',
  'Work',
  'Personal',
  'Travel',
  'Ideas',
  'Shopping',
  'Health',
  'Finance',
];

export interface Note {
  _id?: string;
  title: string;
  content: string;
  category: NoteCategory;
  createdAt: Date;
  updatedAt: Date;
}
