import React, { useEffect, useState } from "react";
import { RiCloseLine } from "@remixicon/react";

const NoteForm = ({ mode = "create", initialNote, onAddNote, onUpdateNote, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Prefill when editing (or reset when switching back to create)
  useEffect(() => {
    if (mode === "edit" && initialNote) {
      setTitle(initialNote.title ?? "");
      setContent(initialNote.content ?? "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [mode, initialNote]);

  function handleSubmit(e) {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    // Optional: stop empty notes
    if (!cleanTitle && !cleanContent) return;

    if (mode === "edit") {
      //?. => optional chaining. only call function if it exists 
      onUpdateNote?.({ title: cleanTitle, content: cleanContent });
    } else {
      onAddNote?.({
        id: Date.now(),
        title: cleanTitle,
        content: cleanContent,
        createdAt: Date.now(),
      });
      // Clear only after creating (edit closes in App)
      setTitle("");
      setContent("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full shadow-lg max-w-md bg-gray-200 flex flex-col gap-6 p-6 rounded-lg"
    >
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">
          {mode === "edit" ? "Edit Note" : "Add New Note"}
        </h1>

        <button type="button" onClick={onClose} aria-label="Close">
          <RiCloseLine />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-left" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-md"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-left" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          rows={4}
          placeholder="Start typing your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded-md"
        />
      </div>

      <div className="modal-footer flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-white font-bold py-2 px-5 rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-slate-900 text-white font-bold py-2 px-5 rounded-md hover:bg-slate-700"
        >
          {mode === "edit" ? "Update Note" : "Save Note"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
