'use client';

import { useEffect, useState } from 'react';
import { Note, NoteCategory } from '@/types/note';
import NoteList from '@/components/NoteList';
import NoteEditor from '@/components/NoteEditor';
import CategoryFilter from '@/components/CategoryFilter';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory | null>(null);

  useEffect(() => {
    fetchNotes();
  }, [selectedCategory]);

  const fetchNotes = async () => {
    try {
      const url = selectedCategory 
        ? `/api/notes?category=${selectedCategory}` 
        : '/api/notes';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = async (title: string, content: string, category: NoteCategory) => {
    try {
      const url = editingNote ? `/api/notes/${editingNote._id}` : '/api/notes';
      const method = editingNote ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, category }),
      });

      if (response.ok) {
        await fetchNotes();
        setIsEditorOpen(false);
        setEditingNote(null);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleDeleteNote = (note: Note) => {
    setNoteToDelete(note);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;

    try {
      const response = await fetch(`/api/notes/${noteToDelete._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchNotes();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setNoteToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  const handleCancelEditor = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">My Notes</h1>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            + New Note
          </button>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <NoteList
            notes={notes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
          />
        )}
      </div>

      {isEditorOpen && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onCancel={handleCancelEditor}
        />
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </main>
  );
}
