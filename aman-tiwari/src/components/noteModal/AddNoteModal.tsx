'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './AddNoteModal.module.scss'
import type { NoteProps } from '@/types/activity.types'
import { ACTIVITY_FORM_TEXT } from '../activityForm/ActivityForm.constants'
import { Button } from '../common/Button'

export const AddNoteModal = ({
  initialNote = '',
  onSave,
  onClose,
}: NoteProps) => {
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
          <h2 className={styles.title}>{ACTIVITY_FORM_TEXT.buttons.addNote}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            {ACTIVITY_FORM_TEXT.buttons.close}
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.noteList} ref={listRef}>
            {notes.length === 0 ? (
              <div className={styles.empty}>
                {ACTIVITY_FORM_TEXT.placeholders.noteBelow}
              </div>
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
              placeholder={ACTIVITY_FORM_TEXT.placeholders.write_note}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={8}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            type="button"
            className={styles.submitBtn}
            onClick={handleAdd}
            variant="primary"
          >
            {ACTIVITY_FORM_TEXT.buttons.addNote}
          </Button>
        </div>
      </div>
    </div>
  )
}
