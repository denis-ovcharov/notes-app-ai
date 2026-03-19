'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Note, NoteTag } from '@/types/note';
import NoteList from '@/components/NoteList';
import NoteEditor from '@/components/NoteEditor';
import CategoryFilter from '@/components/CategoryFilter';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import Pagination from '@/components/Pagination';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';
import { apiRequest } from '@/lib/api';

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface NotesResponse {
  notes: Note[];
  pagination: PaginationInfo;
}

export default function Home() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [selectedTag, setSelectedTag] = useState<NoteTag | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [selectedTag, currentPage, user]);

  const fetchNotes = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...(selectedTag && { tags: selectedTag }),
      });

      const data = await apiRequest<NotesResponse>(`/notes?${params.toString()}`);
      setNotes(data.notes);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = async (title: string, content: string, tag: NoteTag) => {
    try {
      const url = editingNote ? `/notes/${editingNote._id}` : '/notes';
      const method = editingNote ? 'PATCH' : 'POST';

      const body: { title: string; content: string; tag?: NoteTag } = {
        title,
        content,
        tag,
      };

      await apiRequest(url, {
        method,
        body: JSON.stringify(body),
      });

      setCurrentPage(1);
      await fetchNotes();
      setIsEditorOpen(false);
      setEditingNote(null);
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
      await apiRequest(`/notes/${noteToDelete._id}`, {
        method: 'DELETE',
      });
      await fetchNotes();
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategorySelect = (tag: NoteTag | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">My Notes</h1>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md cursor-pointer"
          >
            + New Note
          </button>
        </div>

        <CategoryFilter
          selectedCategory={selectedTag}
          onSelectCategory={handleCategorySelect}
        />

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {pagination && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
            <NoteList
              notes={notes}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          </>
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
    </div>
  );
}
