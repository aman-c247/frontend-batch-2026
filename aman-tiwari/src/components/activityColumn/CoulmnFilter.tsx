'use client'

import styles from './CoulmnFilter.module.scss'
import { IconCalendar } from '@/assets/icon/IconCalendar'
import { FILTER_TEXT, PRIORITY_OPTIONS } from './activityColumn.constants'
import type { ColumnFilters } from '@/types/activity.types'
import { useColumnFilter } from '../hooks/useColumnFilter'



interface Props {
  onApply: (filters: ColumnFilters) => void
  onClose: () => void
  anchorRef: React.RefObject<HTMLButtonElement | null>
}



export const ColumnFilterPanel = ({ onApply, onClose, anchorRef }: Props) => {
 const {
   dueDateRange,
   priority,
   setDueDateRange,
   setPriority,

   panelRef,
   dateInputRef,

   handleFilter,
   handleReset,
   
   formatDisplay,
 } = useColumnFilter(onApply, onClose, anchorRef)

  return (
    <div ref={panelRef} className={styles.panel}>
      <div className={styles.field}>
        <label className={styles.label}>{FILTER_TEXT.DUE}</label>
        <div className={styles.dateWrapper}>
          <span className={styles.displayValue}>
            {dueDateRange ? (
              formatDisplay(dueDateRange)
            ) : (
              <span className={styles.placeholder}>
                {FILTER_TEXT.CHOOSE_DATE}
              </span>
            )}
          </span>
          <input
            ref={dateInputRef}
            type="date"
            className={styles.hiddenInput}
            value={dueDateRange}
            onChange={(e) => setDueDateRange(e.target.value)}
          />
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => dateInputRef.current?.showPicker()}
          >
            <IconCalendar />
          </button>
        </div>
      </div>

      {/* Priority */}
      <div className={styles.field}>
        <label className={styles.label}>{FILTER_TEXT.PRIORITY}</label>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.resetBtn} onClick={handleReset}>
          {FILTER_TEXT.RESET}
        </button>
        <button className={styles.filterBtn} onClick={handleFilter}>
          {FILTER_TEXT.FILTER}
        </button>
      </div>
    </div>
  )
}
