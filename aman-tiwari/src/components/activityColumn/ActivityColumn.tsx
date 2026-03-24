'use client'

import { useRef, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Activity, ActivityRecord, Status } from '@/types/activity.types'
import { ActivityCard } from '../activityCard/ActivityCard'
import styles from '@/components/activityColumn/ActivityColumn.module.scss'
import { IconFilter } from '@/assets/icon/IconFilter'
import { ColumnFilterPanel, type ColumnFilters } from './CoulmnFilter'

interface Props {
  status: Status
  data: Activity[]
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const STATUS_LABELS: Record<Status, string> = {
  open: 'Open',
  onHold: 'On Hold',
  inProgress: 'In Progress',
  resolved: 'Resolved',
}

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

export const ActivityColumn = ({ status, data, onEdit, onDelete }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  const filterBtnRef = useRef<HTMLButtonElement>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState<ColumnFilters>({
    dueDateRange: '',
    priority: '',
  })

  const isFiltered = !!(filters.dueDateRange || filters.priority)

  const filtered = data
    .filter((activity) => activity.status === status)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .filter((activity) => {
      if (filters.priority && activity.priority !== filters.priority) return false
      if (!matchesDueRange(activity, filters.dueDateRange)) return false
      return true
    })

  return (
    <Col md={3}>
      <div
        ref={setNodeRef}
        className={`${styles.column} ${styles[status]} ${isOver ? styles.activeDrop : ''}`}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.statusLabel}>{STATUS_LABELS[status]}</span>
            <span className={styles.badge}>{filtered.length}</span>
          </div>
          <button
            ref={filterBtnRef}
            className={`${styles.filterBtn} ${isFiltered ? styles.filterActive : ''}`}
            onClick={() => setShowFilter((v) => !v)}
            title="Filter"
          >
            <IconFilter />
          </button>

          {showFilter && (
            <ColumnFilterPanel
              anchorRef={filterBtnRef}
              onApply={(filter) => setFilters(filter)}
              onClose={() => setShowFilter(false)}
            />
          )}
        </div>

        <div className={styles.cardList}>
          <SortableContext
            items={filtered.map((a) => a.id!)}
            strategy={verticalListSortingStrategy}
          >
            {filtered.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </Col>
  )
}
