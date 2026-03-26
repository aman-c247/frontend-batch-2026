import { useCallback, useState } from 'react'
import { DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import toast from 'react-hot-toast'
import { db } from '@/lib/db'
import type { Activity, Status } from '@/types/activity.types'
import { ACTIVITY_FORM_MESSAGES } from './hooks.constants'
import { STATUS_LABELS } from '../activityColumn/activityColumn.constants'

const STATUS_SET = new Set<string>(['open', 'onHold', 'inProgress', 'resolved'])

interface UseActivityDragOptions {
  activities: Activity[]
}

export function useActivityDrag({ activities }: UseActivityDragOptions) {
  const [activeItem, setActiveItem] = useState<Activity | null>(null)

  const onDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = parseInt(event.active.id as string, 10)
      if (isNaN(id)) return

      const item = activities.find((activity) => activity.id === id)
      setActiveItem(item || null)
    },
    [activities],
  )
  const onDragEnd = useCallback(
    async (event: DragEndEvent) => {
      setActiveItem(null)

      const { active, over } = event
      if (!over) return

      const activeId = parseInt(active.id as string, 10)
      if (isNaN(activeId)) return

      const all = activities
      const activeActivity = all.find((activity) => activity.id === activeId)
      if (!activeActivity) return
      const overId = over.id

      if (STATUS_SET.has(String(overId))) {
        const newStatus = overId as Status

        if (activeActivity.status === newStatus) return

        const columnItems = all
          .filter(
            (activity) =>
              activity.status === newStatus && activity.id !== activeId,
          )
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

        await db.activities.update(activeId, {
          status: newStatus,
          sortOrder: columnItems.length,
        })

        toast.success(`Moved to "${STATUS_LABELS[newStatus]}"`)

        return
      }

      const overItem = all.find((a) => a.id === Number(overId))
      if (!overItem) return

      const newStatus = overItem.status
      const movedAcrossColumns = activeActivity.status !== newStatus

      const columnItems = all
        .filter(
          (activity) =>
            activity.status === newStatus && activity.id !== activeId,
        )
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
        toast.success(ACTIVITY_FORM_MESSAGES.TOAST.UPDATE.SUCCESS)
      }
    },
    [activities],
  )

  return { activeItem, onDragEnd, onDragStart }
}
