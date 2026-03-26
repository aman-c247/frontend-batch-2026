'use client'

import type { Activity, CardProps } from '@/types/activity.types'
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
import { useActivityCard } from '../hooks/useActivityCard'
import { CARD_TEXT } from './activityCard.constants'



export const ActivityCard = ({ activity, onEdit, onDelete }: CardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    style,

    showConfirm,
    openDelete,
    closeDelete,
  } = useActivityCard(activity)

  const handleConfirmDelete = () => {
    closeDelete()
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
            <IconCalendarHeart /> {CARD_TEXT.DASH}
          </span>
          <span className={styles.stat}>
            <IconChat /> {CARD_TEXT.THREE}
          </span>
          <span className={styles.stat}>
            <IconPaperclip /> {CARD_TEXT.TWO}
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
              onClick={openDelete}
            >
              <IconTrash />
            </button>
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        show={showConfirm}
        onHide={closeDelete}
        onConfirm={handleConfirmDelete}
        title={CARD_TEXT.TITLE}
        message={activity.title}
      />
    </>
  )
}
