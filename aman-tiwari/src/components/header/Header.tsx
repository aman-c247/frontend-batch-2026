import { FaPlus } from 'react-icons/fa'
import styles from '@/components/header/Header.module.scss'
import { HEADER_TEXT } from './header.constants'
import { Button } from '../common/Button'

interface Props {
  onCreateActivity?: () => void
}

export const Header = ({ onCreateActivity }: Props) => {
  return (
    <div className={styles.header}>
      <h4 className={styles.title}>{HEADER_TEXT.LEFT_TEXT}</h4>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          iconPosition="left"
          className={styles.createBtn}
          onClick={onCreateActivity}
          icon={<FaPlus />}
        >
          {HEADER_TEXT.BUTTON_TEXT}
        </Button>
      </div>
    </div>
  )
}
