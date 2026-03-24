import { Button } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import styles from '@/components/header/Header.module.scss'
import { HEADER_TEXT } from './header.constants'

interface Props {
  onCreateActivity?: () => void
}

export const Header = ({ onCreateActivity }: Props) => {
  return (
    <div className={styles.header}>
      <h4 className={styles.title}>{HEADER_TEXT.LEFT_TEXT}</h4>

      <div className={styles.actions}>
        <Button
          variant="primary"
          className={styles.createBtn}
          onClick={onCreateActivity}
        >
          {HEADER_TEXT.BUTTON_TEXT}
          <FaPlus className={styles.icon} />
        </Button>
      </div>
    </div>
  )
}
