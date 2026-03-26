'use client'

import { useRef } from 'react'
import styles from '@/components/activityForm/ActivityFormModal.module.scss'
import { IconCalendar } from '@/assets/icon/IconCalendar'
import { ACTIVITY_FORM_TEXT } from './ActivityForm.constants'
import type {
  DateFieldProps,
  LabelProps,
  SelectFieldProps,
  ToggleProps,
  ToggleRowProps,
} from '@/types/activity.types'
import { Button } from '../common/Button'

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

export const SelectField = ({
  id,
  value,
  onChange,
  registerProps,
  disabled,
  children,
  error,
}: SelectFieldProps) => (
  <>
    <select
      id={id}
      className={styles.select}
      disabled={disabled}
      {...(registerProps ?? {})}
      {...(!registerProps && value !== undefined
        ? {
            value,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
              onChange?.(e.target.value),
          }
        : {})}
    >
      {children}
    </select>
    <FieldError message={error} />
  </>
)

export const DateField = ({
  id,
  value,
  onChange,
  registerProps,
  error,
}: DateFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const today = new Date().toISOString().split('T')[0]
  const formatDisplay = (val: string) => val.replace(/-/g, '/')

  return (
    <>
      <div className={styles.dateWrapper}>
        <span className={styles.displayValue}>
          {value ? (
            formatDisplay(value)
          ) : (
            <span className={styles.placeholder}>
              {ACTIVITY_FORM_TEXT.placeholders.dueDate}
            </span>
          )}
        </span>

        <input
          ref={(node) => {
            ;(
              inputRef as React.MutableRefObject<HTMLInputElement | null>
            ).current = node
            if (registerProps?.ref) {
              if (typeof registerProps.ref === 'function')
                registerProps.ref(node)
              else
                (
                  registerProps.ref as React.MutableRefObject<HTMLInputElement | null>
                ).current = node
            }
          }}
          id={id}
          type="date"
          min={today}
          className={styles.hiddenInput}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            registerProps?.onChange?.(e)
          }}
          onBlur={registerProps?.onBlur}
          name={registerProps?.name}
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

export const YesNoToggle = ({
  field,
  value,
  disabled,
  onChange,
}: ToggleProps) => (
  <div className={styles.toggleGroup}>
    <Button
      type={ACTIVITY_FORM_TEXT.buttons.button as 'button'}
      className={`${styles.toggleBtn} ${value === 'yes' ? styles.active : ''}`}
      onClick={() => onChange(field, 'yes')}
      disabled={disabled}
    >
      {ACTIVITY_FORM_TEXT.toggles.yes}
    </Button>
    <Button
      type={ACTIVITY_FORM_TEXT.buttons.button as 'button'}
      className={`${styles.toggleBtn} ${value === 'no' ? styles.inactive : ''}`}
      onClick={() => onChange(field, 'no')}
      disabled={disabled}
    >
      {ACTIVITY_FORM_TEXT.toggles.no}
    </Button>
  </div>
)

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
