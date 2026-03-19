export type NoteTag =
  | 'Todo'
  | 'Work'
  | 'Personal'
  | 'Travel'
  | 'Ideas'
  | 'Shopping'
  | 'Health'
  | 'Finance';

export const NOTE_TAGS: NoteTag[] = [
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
  _id: string;
  title: string;
  content: string;
  tag?: NoteTag;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
