'use client'
import { FieldLabel, FieldError } from './ActivityFormFields'
import styles from '@/components/activityForm/ActivityFormModal.module.scss'
import fieldStyles from './ActivitynameSearch.module.scss'
import { ACTIVITY_FORM_TEXT } from './ActivityForm.constants'
import type { SearchFieldProps } from '@/types/activity.types'
import { useActivityNameSearch } from '../hooks/useActivityNameSearch'

export const ActivityNameSearchField = ({
  value,
  onChange,
  error,
  addToDataSet,
  onAddToDataSetChange,
}: SearchFieldProps) => {
  const {
    inputValue,
    suggestions,
    isOpen,
    noMatch,
    activeIndex,
    setIsOpen,
    handleInput,
    handleSelect,
    handleKeyDown,

    wrapperRef,
  } = useActivityNameSearch(value, onChange)

  return (
    <div className={styles.fullRow}>
      <div className={styles.field}>
        <FieldLabel text="Activity Name" required />
        <div ref={wrapperRef} className={fieldStyles.searchWrapper}>
          <input
            className={styles.input}
            placeholder="Search Activity Name"
            value={inputValue}
            onChange={(e) => handleInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e.key)}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true)
            }}
            autoComplete="off"
          />
          {isOpen && suggestions.length > 0 && (
            <ul className={fieldStyles.dropdown}>
              {suggestions.map((name, i) => (
                <li
                  key={name}
                  className={`${fieldStyles.dropdownItem} ${i === activeIndex ? fieldStyles.active : ''}`}
                  onMouseDown={() => handleSelect(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <FieldError message={error} />
      </div>

      {noMatch && inputValue.trim() && (
        <div className={styles.checkRow} style={{ marginTop: 8 }}>
          <input
            type="checkbox"
            id="addToDataSet"
            checked={addToDataSet}
            onChange={(e) => onAddToDataSetChange(e.target.checked)}
          />
          <label htmlFor="addToDataSet">
            {ACTIVITY_FORM_TEXT.buttons.add_activity}
          </label>
        </div>
      )}
    </div>
  )
}
