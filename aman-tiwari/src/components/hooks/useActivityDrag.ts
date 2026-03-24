import { useState } from 'react'
import { DragEndEvent } from '@dnd-kit/core'
import toast from 'react-hot-toast'
import { db } from '@/lib/db'
import type { Activity, Status } from '@/types/activity.types'
import { ACTIVITY_FORM_MESSAGES } from './hooks.constants'

const STATUS_SET = new Set<string>(['open', 'onHold', 'inProgress', 'resolved'])

const STATUS_LABELS: Record<Status, string> = {
  open: 'Open',
  onHold: 'On Hold',
  inProgress: 'In Progress',
  resolved: 'Resolved',
}

interface UseActivityDragOptions {
  activities: Activity[]
  onDragSettled: () => void
}

export function useActivityDrag({
  activities,
  onDragSettled,
}: UseActivityDragOptions) {
  const [activeItem, setActiveItem] = useState<Activity | null>(null)

  const handleDragStart = (id: number) => {
    const item = activities.find((a) => a.id === id)
    setActiveItem(item ?? null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {

    setActiveItem(null)

    const { active, over } = event
    if (!over) return

    const activeId = Number(active.id)
    const overId = over.id

    const all = await db.activities.toArray()
    const activeActivity = all.find((a) => a.id === activeId)
    if (!activeActivity) return


    if (STATUS_SET.has(String(overId))) {
      const newStatus = overId as Status


      if (activeActivity.status === newStatus) return

      const columnItems = all
        .filter((a) => a.status === newStatus && a.id !== activeId)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

      await db.activities.update(activeId, {
        status: newStatus,
        sortOrder: columnItems.length,
      })

      toast.success(`Moved to "${STATUS_LABELS[newStatus]}"`)
      onDragSettled()
      return
    }


    const overItem = all.find((a) => a.id === Number(overId))
    if (!overItem) return

    const newStatus = overItem.status
    const movedAcrossColumns = activeActivity.status !== newStatus

    const columnItems = all
      .filter((a) => a.status === newStatus && a.id !== activeId)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

    const overIndex = columnItems.findIndex((a) => a.id === overItem.id)
    columnItems.splice(overIndex, 0, { ...activeActivity, status: newStatus })

    await Promise.all(
      columnItems.map((item, index) =>
        db.activities.update(item.id!, {
          sortOrder: index,
          status: newStatus,
        }),
      ),
    )

    if (movedAcrossColumns) {
      toast.success(`Moved to "${STATUS_LABELS[newStatus]}"`)
    } else {
      toast.success( ACTIVITY_FORM_MESSAGES.TOAST.UPDATE.SUCCESS)
    }

    onDragSettled()
  }

  return { activeItem, handleDragStart, handleDragEnd }
}
