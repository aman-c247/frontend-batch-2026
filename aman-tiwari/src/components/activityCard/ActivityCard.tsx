'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Activity } from '@/types/activity.types'
import styles from './ActivityCard.module.scss'
import { IconUser } from '@/assets/icon/IconUser'
import { IconCalendar } from '@/assets/icon/IconCalendar'
import { IconChat } from '@/assets/icon/IconChat'
import { IconPaperclip } from '@/assets/icon/IconPaperclip'
import { IconChevron } from '@/assets/icon/IconChevron'
import { IconEdit } from '@/assets/icon/IconEdit'
import { IconTrash } from '@/assets/icon/IconTrash'
import { IconCalendarHeart } from '@/assets/icon/IconHeart'
import { ConfirmDeleteModal } from '@/components/deleteModal/DeleteModal'

interface Props {
  activity: Activity
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export const ActivityCard = ({ activity, onEdit, onDelete }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: activity.id! })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowConfirm(true)
  }

  const handleConfirmDelete = () => {
    setShowConfirm(false)
    onDelete?.(activity.id!)
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${styles.card} ${styles[activity.priority]}`}
      >
        <div className={styles.title}>{activity.title}</div>

        <div className={styles.meta}>
          <span className={styles.owner}>
            <IconUser />
            {activity.owner}
          </span>
          <span className={styles.dateBadge}>
            <IconCalendar />
            {activity.date}
          </span>
        </div>

        <div className={styles.stats}>
          <span className={styles.stat}>
            <IconCalendarHeart /> -
          </span>
          <span className={styles.stat}>
            <IconChat /> 3
          </span>
          <span className={styles.stat}>
            <IconPaperclip /> 2
          </span>
        </div>

        <div className={styles.actions}>
          <button className={styles.expandBtn}>
            <IconChevron />
          </button>
          <div className={styles.actionBtns}>
            <button
              className={`${styles.actionBtn} ${styles.edit}`}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                onEdit?.(activity.id!)
              }}
            >
              <IconEdit />
            </button>
            <button
              className={`${styles.actionBtn} ${styles.delete}`}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleDeleteClick}
            >
              <IconTrash />
            </button>
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Activity"
        message={activity.title}
      />
    </>
  )
}
