import React from 'react'
import NoteCard  from './NoteCard'

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <div className='grid grid-cols-2 gap-6 mt-6 items-start'>
      {notes.map((note, index) => (
        <NoteCard
        index={index}
        key={note.id} 
        note={note} 
        onDelete={onDelete}
        onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default NoteList
