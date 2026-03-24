import { Button } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import styles from '@/components/header/Header.module.scss'

interface Props {
  onCreateActivity?: () => void
}

export const Header = ({ onCreateActivity }: Props) => {
  return (
    <div className={styles.header}>
      <h4 className={styles.title}>My Activities</h4>

      <div className={styles.actions}>
        <Button
          variant="primary"
          className={styles.createBtn}
          onClick={onCreateActivity}
        >
          Create Activity
          <FaPlus className={styles.icon} />
        </Button>
      </div>
    </div>
  )
}
