'use client'
import styles from '@/components/activityForm/ActivityFormModal.module.scss'
import { useRef } from 'react'
import { IconCalendar } from '@/assets/icon/IconCalendar'

type YesNo = 'yes' | 'no'
type ToggleField =
  | 'delegatedActivity'
  | 'assignToProject'
  | 'recurringActivity'
  | 'personalActivity'

interface LabelProps {
  htmlFor?: string
  text: string
  required?: boolean
  requiredText?: string
}
export const FieldLabel = ({
  htmlFor,
  text,
  required,
  requiredText = '(Required)',
}: LabelProps) => (
  <label className={styles.label} htmlFor={htmlFor}>
    {text}
    {required && <span className={styles.required}>{requiredText}</span>}
  </label>
)

export const FieldError = ({ message }: { message?: string }) =>
  message ? <span className={styles.required}>{message}</span> : null

interface SelectFieldProps {
  id?: string
  value: string
  onChange: (val: string) => void
  disabled?: boolean
  children: React.ReactNode
  error?: string
}
export const SelectField = ({
  id,
  value,
  onChange,
  disabled,
  children,
  error,
}: SelectFieldProps) => (
  <>
    <select
      id={id}
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      {children}
    </select>
    <FieldError message={error} />
  </>
)

interface DateFieldProps {
  id?: string
  value: string
  onChange: (val: string) => void
  error?: string
}

export const DateField = ({ id, value, onChange, error }: DateFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const formatDisplay = (val: string) => val.replace(/-/g, '/')

  return (
    <>
      <div className={styles.dateWrapper}>
        <span className={styles.displayValue}>
          {value ? (
            formatDisplay(value)
          ) : (
            <span className={styles.placeholder}>Choose a due date</span>
          )}
        </span>

        <input
          ref={inputRef}
          id={id}
          type="date"
          className={styles.hiddenInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => inputRef.current?.showPicker()}
        >

          <IconCalendar />
        </button>
      </div>
      <FieldError message={error} />
    </>
  )
}

interface ToggleProps {
  field: ToggleField
  value: YesNo
  disabled?: boolean
  onChange: (field: ToggleField, value: YesNo) => void
}
export const YesNoToggle = ({
  field,
  value,
  disabled,
  onChange,
}: ToggleProps) => (
  <div className={styles.toggleGroup}>
    <button
      type="button"
      className={`${styles.toggleBtn} ${value === 'yes' ? styles.active : ''}`}
      onClick={() => onChange(field, 'yes')}
      disabled={disabled}
    >
      YES
    </button>
    <button
      type="button"
      className={`${styles.toggleBtn} ${value === 'no' ? styles.inactive : ''}`}
      onClick={() => onChange(field, 'no')}
      disabled={disabled}
    >
      NO
    </button>
  </div>
)

interface ToggleRowProps {
  label: string
  field: ToggleField
  value: YesNo
  disabled?: boolean
  onChange: (field: ToggleField, value: YesNo) => void
}
export const ToggleRow = ({
  label,
  field,
  value,
  disabled,
  onChange,
}: ToggleRowProps) => (
  <div className={styles.toggleRow}>
    <span className={styles.sectionLabel}>{label}</span>
    <YesNoToggle
      field={field}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  </div>
)
