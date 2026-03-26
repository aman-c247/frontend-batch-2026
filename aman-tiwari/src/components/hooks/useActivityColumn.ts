import { useState, useRef, useMemo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import type {
  Activity,
  ActivityRecord,
  ColumnFilters,
  Status,
} from '@/types/activity.types'

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate())

const matchesDueRange = (
  activity: Activity & Partial<ActivityRecord>,
  filterDate: string,
): boolean => {
  if (!filterDate) return true

  const rawDate = (activity as ActivityRecord).dueDate ?? activity.date
  if (!rawDate) return false

  const due = startOfDay(new Date(rawDate))
  const selected = startOfDay(new Date(filterDate))

  if (isNaN(due.getTime()) || isNaN(selected.getTime())) return false

  return due <= selected
}

export function useActivityColumn(status: Status, data: Activity[]) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  const filterBtnRef = useRef<HTMLButtonElement>(null)
  const [showFilter, setShowFilter] = useState(false)

  const [filters, setFilters] = useState<ColumnFilters>({
    dueDateRange: '',
    priority: '',
  })

  const isFiltered = !!(filters.dueDateRange || filters.priority)

  const filtered = useMemo(() => {
    return data
      .filter((activity) => activity.status === status)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .filter((activity) => {
        if (filters.priority && activity.priority !== filters.priority)
          return false
        if (!matchesDueRange(activity, filters.dueDateRange)) return false
        return true
      })
  }, [data, status, filters])

  return {
    setFilters,
    setNodeRef,
    setShowFilter,

    showFilter,
    isOver,
    isFiltered,
    filterBtnRef,
    filters,
    filtered,
  }
}
