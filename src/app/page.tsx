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

      const response = await apiRequest<{ data: { notes: Note[]; pagination: PaginationInfo } }>(`/notes?${params.toString()}`);
      setNotes(response.data.notes);
      setPagination(response.data.pagination);
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
      };

      if (tag) {
        body.tag = tag;
      }

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 border-4 border-[var(--color-light-gray)] border-t-[var(--color-terracotta)] rounded-full animate-spin"></div>
          <p className="text-[var(--color-warm-gray)]">Loading your notes...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 animate-fade-in-up">
          <div>
            <h1 className="font-display text-4xl font-bold text-[var(--color-charcoal)]">
              My Notes
            </h1>
            <p className="text-[var(--color-warm-gray)] mt-1">
              {pagination ? `${pagination.total} notes captured` : 'Your thoughts, organized'}
            </p>
          </div>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="btn-primary flex items-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </button>
        </div>

        <CategoryFilter
          selectedCategory={selectedTag}
          onSelectCategory={handleCategorySelect}
        />

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4 animate-fade-in">
              <div className="w-10 h-10 border-3 border-[var(--color-light-gray)] border-t-[var(--color-terracotta)] rounded-full animate-spin"></div>
              <p className="text-[var(--color-warm-gray)]">Loading notes...</p>
            </div>
          </div>
        ) : (
          <>
            {pagination && pagination.totalPages > 1 && (
              <div className="mb-6 animate-fade-in">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
            <div className="animate-fade-in-up">
              <NoteList
                notes={notes}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            </div>
          </>
        )}
      </main>

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
