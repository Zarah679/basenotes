import React from "react";
import { RiEdit2Line, RiDeleteBinLine } from "@remixicon/react";

export default function NoteCard({ note, onDelete, onEdit, index }) {
  if (!note) return null;

  //size classes

  // const rowIndex = Math.floor(index / 2); // row in a 2-col grid
  // const colIndex = index % 2;

  // We want ONE big card every 3 cards to create a nice rhythm:
  // [BIG], [MED], [MED], [BIG], [MED], [MED]...
  const isBig = index % 3 === 0;

  const sizeClass = isBig
    ? "col-span-2 min-h-[220px]"
    : "col-span-1 min-h-[180px]";

  // const padClass = isBig ? "p-6" : "p-5";
  // const titleClass = isBig ? "text-xl" : "text-lg";




  //color classes
  const colorClasses = [
    "bg-slate-900 text-white",
    "bg-slate-100 text-slate-900",
    ];

    const colorClass = colorClasses[index % 2];




  // const actionBtn =
  // "grid h-9 w-9 place-items-center rounded-full border shadow-sm transition " +
  // "border-black/10 bg-white/55 text-zinc-800 hover:bg-white/75 " +
  // "dark:border-white/10 dark:bg-white/10 dark:text-white/85 dark:hover:bg-white/16";



  return (
    
    <div className={`
        group
        relative
        ${sizeClass}
        ${colorClass}
        rounded-3xl p-4
        shadow-sm hover:shadow-md
        transition-shadow
      `}>
      {/* hover actions */}
      <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit(note.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full
                    bg-white text-zinc-900 shadow-md ring-1 ring-black/10
                    hover:bg-zinc-100"
          aria-label="Edit"
        >
          <RiEdit2Line size={16} />
        </button>

        <button
          onClick={() => onDelete(note.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full
                    bg-white text-zinc-900 shadow-md ring-1 ring-black/10
                    hover:bg-zinc-100"
          aria-label="Delete"
        >
          <RiDeleteBinLine size={16} />
        </button>
      </div>


      <h2 className="font-semibold text-lg">
        {note.title}
      </h2>

      <p className="mt-2 text-md leading-relaxed opacity-90">
        {note.content}
      </p>

    </div>
  );
}
