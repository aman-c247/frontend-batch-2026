'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './CoulmnFilter.module.scss'
import { IconCalendar } from '@/assets/icon/IconCalendar'
import { FILTER_TEXT } from './activityColumn.constants'

export interface ColumnFilters {
  dueDateRange: string
  priority: string
}

interface Props {
  onApply: (filters: ColumnFilters) => void
  onClose: () => void
  anchorRef: React.RefObject<HTMLButtonElement | null>
}

const PRIORITY_OPTIONS = [
  { value: '', label: 'Select Priority' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'standard', label: 'Standard' },
]

export const ColumnFilterPanel = ({ onApply, onClose, anchorRef }: Props) => {
  const [dueDateRange, setDueDateRange] = useState('')
  const [priority, setPriority] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose, anchorRef])

  const handleFilter = () => {
    onApply({ dueDateRange, priority })
    onClose()
  }

  const handleReset = () => {
    setDueDateRange('')
    setPriority('')
    onApply({ dueDateRange: '', priority: '' })
    onClose()
  }

  const formatDisplay = (val: string) => val.replace(/-/g, '/')

  return (
    <div ref={panelRef} className={styles.panel}>
      <div className={styles.field}>
        <label className={styles.label}>{FILTER_TEXT.DUE}</label>
        <div className={styles.dateWrapper}>
          <span className={styles.displayValue}>
            {dueDateRange ? (
              formatDisplay(dueDateRange)
            ) : (
              <span className={styles.placeholder}>
                {FILTER_TEXT.CHOOSE_DATE}
              </span>
            )}
          </span>
          <input
            ref={dateInputRef}
            type="date"
            className={styles.hiddenInput}
            value={dueDateRange}
            onChange={(e) => setDueDateRange(e.target.value)}
          />
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => dateInputRef.current?.showPicker()}
          >
            <IconCalendar />
          </button>
        </div>
      </div>

      {/* Priority */}
      <div className={styles.field}>
        <label className={styles.label}>{FILTER_TEXT.PRIORITY}</label>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.resetBtn} onClick={handleReset}>
          {FILTER_TEXT.RESET}
        </button>
        <button className={styles.filterBtn} onClick={handleFilter}>
          {FILTER_TEXT.FILTER}
        </button>
      </div>
    </div>
  )
}
