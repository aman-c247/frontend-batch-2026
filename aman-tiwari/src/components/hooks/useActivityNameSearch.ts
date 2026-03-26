'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { db } from '@/lib/db'

export const useActivityNameSearch = (
  value: string,
  onChange: (val: string) => void,
) => {
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
          .map((a) => a.activityName)
          .filter(
            (name): name is string =>
              !!name && name.toLowerCase().includes(lower),
          ),
      ),
    )

    setSuggestions(matched)
    setNoMatch(matched.length === 0)
    setIsOpen(matched.length > 0)
    setActiveIndex(-1)
  }, [])

  const handleInput = (val: string) => {
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

  const handleKeyDown = (key: string) => {
    if (!isOpen) return

    if (key === 'ArrowDown') {
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (key === 'ArrowUp') {
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (key === 'Enter' && activeIndex >= 0) {
      handleSelect(suggestions[activeIndex])
    } else if (key === 'Escape') {
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
  }, [setIsOpen])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return {
    inputValue,
    suggestions,
    isOpen,
    noMatch,
    activeIndex,
    setIsOpen,
    handleInput,
    handleSelect,
    handleKeyDown,

    wrapperRef
  }
}
