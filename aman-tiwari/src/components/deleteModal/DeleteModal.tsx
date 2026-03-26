'use client'

import type { DeleteModalProps } from '@/types/activity.types'
import { DELETE_TEXT } from './deletemodal.constants'
import styles from './DeleteModal.module.scss'
import { IconTrash } from '@/assets/icon/IconTrash'


export const ConfirmDeleteModal = ({
  show,
  onHide,
  onConfirm,
  title = 'Delete Activity',
  message = 'activity',
  isLoading = false,
}: DeleteModalProps) => {
  if (!show) return null

  return (
    <div className={styles.overlay} onMouseDown={onHide}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper}>
          <IconTrash />
        </div>

        <h5 className={styles.title}>{title}</h5>
        <p className={styles.message}>{DELETE_TEXT.ALERT(message)}</p>

        <div className={styles.buttonGroup}>
          <button
            className={styles.cancelBtn}
            onClick={onHide}
            disabled={isLoading}
          >
            {DELETE_TEXT.cancel}
          </button>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? DELETE_TEXT.deleting : DELETE_TEXT.delete}
          </button>
        </div>
      </div>
    </div>
  )
}
