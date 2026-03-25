
import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Activity } from '@/types/activity.types'

export function useActivityCard(activity: Activity) {
  const [showConfirm, setShowConfirm] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: activity.id! })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const openDelete = () => setShowConfirm(true)
  const closeDelete = () => setShowConfirm(false)

  return {

    attributes,
    listeners,
    setNodeRef,
    style,

    showConfirm,
    openDelete,
    closeDelete,
  }
}
