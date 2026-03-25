import type { ColumnFilters } from '@/types/activity.types'
import { useEffect, useRef, useState } from 'react'

export function useColumnFilter(
  onApply: (filters: ColumnFilters) => void,
  onClose: () => void,
  anchorRef: React.RefObject<HTMLButtonElement | null>,
) {
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
    const openDatePicker = () => {
    dateInputRef.current?.showPicker()
  }

  const formatDisplay = (val: string) => val.replace(/-/g, '/')

  return {

    dueDateRange,
    priority,
    setDueDateRange,
    setPriority,


    panelRef,
    dateInputRef,


    handleFilter,
    handleReset,
    openDatePicker,
    formatDisplay,
  }
  }
