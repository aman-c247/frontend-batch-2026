'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './AddNoteModal.module.scss'

interface Props {
  initialNote?: string
  onSave: (note: string) => void
  onClose: () => void
}

export const AddNoteModal = ({ initialNote = '', onSave, onClose }: Props) => {
  const [notes, setNotes] = useState<string[]>(() =>
    initialNote.trim() ? initialNote.split('\n---\n').filter(Boolean) : [],
  )
  const [draft, setDraft] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [notes])

  const handleAdd = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    const updated = [...notes, trimmed]
    setNotes(updated)
    setDraft('')
    onSave(updated.join('\n---\n'))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Note</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.noteList} ref={listRef}>
            {notes.length === 0 ? (
              <div className={styles.empty}>Add your note below.</div>
            ) : (
              notes.map((n, i) => (
                <div key={i} className={styles.noteBubble}>
                  <p className={styles.noteText}>{n}</p>
                </div>
              ))
            )}
          </div>
          <div className={styles.inputRow}>
            <textarea
              className={styles.textarea}
              placeholder="Write a note"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={8}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.addBtn}
            onClick={handleAdd}
            disabled={!draft.trim()}
            title="Add note"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
