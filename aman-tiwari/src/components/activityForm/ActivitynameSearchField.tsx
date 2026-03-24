'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { db } from '@/lib/db'
import { FieldLabel, FieldError } from './ActivityFormFields'
import styles from '@/components/activityForm/ActivityFormModal.module.scss'
import fieldStyles from './ActivitynameSearch.module.scss'
import { ACTIVITY_FORM_TEXT } from './ActivityForm.constants'

interface Props {
  value: string
  onChange: (val: string) => void
  error?: string
  addToDataSet: boolean
  onAddToDataSetChange: (val: boolean) => void
}

export const ActivityNameSearchField = ({
  value,
  onChange,
  error,
  addToDataSet,
  onAddToDataSetChange,
}: Props) => {
  const [inputValue, setInputValue] = useState(value ?? '')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([])
      setIsOpen(false)
      setNoMatch(false)
      return
    }

    const all = await db.activities.toArray()
    const lower = query.toLowerCase()

    const matched = Array.from(
      new Set(
        all
          .map((activity) =>activity.activityName)
          .filter((name): name is string => !!name && name.toLowerCase().includes(lower)),
      ),
    )

    setSuggestions(matched)
    setNoMatch(matched.length === 0)
    setIsOpen(matched.length > 0)
    setActiveIndex(-1)
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    onChange(val)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 300)
  }

  const handleSelect = (name: string) => {
    setInputValue(name)
    onChange(name)
    setSuggestions([])
    setIsOpen(false)
    setNoMatch(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      handleSelect(suggestions[activeIndex])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className={styles.fullRow}>
      <div className={styles.field}>
        <FieldLabel text="Activity Name" required />
        <div ref={wrapperRef} className={fieldStyles.searchWrapper}>
          <input
            className={styles.input}
            placeholder="Search Activity Name"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true)
            }}
            autoComplete="off"
          />
          {isOpen && suggestions.length > 0 && (
            <ul className={fieldStyles.dropdown}>
              {suggestions.map((name, i) => (
                <li
                  key={name}
                  className={`${fieldStyles.dropdownItem} ${i === activeIndex ? fieldStyles.active : ''}`}
                  onMouseDown={() => handleSelect(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <FieldError message={error} />
      </div>

      {noMatch && inputValue.trim() && (
        <div className={styles.checkRow} style={{ marginTop: 8 }}>
          <input
            type="checkbox"
            id="addToDataSet"
            checked={addToDataSet}
            onChange={(e) => onAddToDataSetChange(e.target.checked)}
          />
          <label htmlFor="addToDataSet">{ACTIVITY_FORM_TEXT.buttons.add_activity}</label>
        </div>
      )}
    </div>
  )
}
