'use client'

import styles from './DeleteModal.module.scss'
import { IconTrash } from '@/assets/icon/IconTrash'

interface Props {
  show: boolean
  onHide: () => void
  onConfirm: () => void
  title?: string
  message?: string
  isLoading?: boolean
}

export const ConfirmDeleteModal = ({
  show,
  onHide,
  onConfirm,
  title = 'Delete Activity',
  message = 'tital',
  isLoading = false,
}: Props) => {
  if (!show) return null

  return (
    <div className={styles.overlay} onMouseDown={onHide}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>

        <div className={styles.iconWrapper}>
          <IconTrash />
        </div>


        <h5 className={styles.title}>{title}</h5>
        <p className={styles.message}>{`Are you sure you want to delete ${message}? This action cannot be undone`}</p>


        <div className={styles.buttonGroup}>
          <button
            className={styles.cancelBtn}
            onClick={onHide}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
