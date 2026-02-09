import "./App.css";
import { useEffect, useMemo, useState } from "react";

import Header from "./components.jsx/Header";
import NoteList from "./components.jsx/NoteList";
import NoteForm from "./components.jsx/NoteForm";
import EmptyState from "./components.jsx/EmptyState";

function App() {
  //Persistence
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("notes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  //Theme Toggle 


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  function addNote(newNote) {
    setNotes((prev) => [newNote, ...prev]);
    setIsModalOpen(false);
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editingNote === id) setEditingNote(null);
  }

  function startEdit(id) {
    setEditingNote(id);
    setIsModalOpen(true);
  }

  function updateNote(id, { title, content }) {
    setNotes((prev) => //prev: current array of notes
      prev.map((n) => //one note inside that array 
        n.id === id
          ? { ...n, title: title.trim(), content: content.trim(), updatedAt: Date.now() }
          : n
      )
    );
    setEditingNote(null);
    setIsModalOpen(false);
  }

  const noteBeingEdited = useMemo(
    () => notes.find((n) => n.id === editingNote) ?? null,
    [notes, editingNote]
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
  <>
    <div className="min-h-screen bg-[#f6f3ff] text-zinc-900">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Header onAddClick={() => {
            setEditingNote(null);
            setIsModalOpen(true);
          }} />

          {notes.length === 0 ? (
            <EmptyState onAddClick={() => {
              setEditingNote(null);
              setIsModalOpen(true);
            }} />
          ) : (
            <NoteList notes={notes} onDelete={deleteNote} onEdit={startEdit} />
          )}
        </div>
      </div>
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
        <NoteForm
          mode={noteBeingEdited ? "edit" : "add"}
          initialNote={noteBeingEdited}
          onAddNote={addNote}
          onUpdateNote={(data) => updateNote(editingNote, data)}
          onClose={() => {
            setIsModalOpen(false);
            setEditingNote(null);
          }}
        />
      </div>
    )}
  </>
);

}

export default App;
