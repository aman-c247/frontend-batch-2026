'use client'

import { useState } from 'react'
import { Controller } from 'react-hook-form'
import type { ActivityRecord } from '@/types/activity.types'
import { AddNoteModal } from '../noteModal/AddNoteModal'
import {
  ACTIVITY_FORM_TEXT,
  ACTIVITY_TYPE_OPTIONS,
  COMMUNICATION_OPTIONS,
  FREQUENCY_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from './ActivityForm.constants'
import { useActivityForm } from '@/components/hooks/useActivityForm'
import {
  FieldLabel,
  SelectField,
  DateField,
  ToggleRow,
} from './ActivityFormFields'
import { IconNote } from '@/assets/icon/IconNote'
import styles from '@/components/activityForm/ActivityFormModal.module.scss'
import TinyEditor from '../tinyEditor/TinyEditor'
import { ActivityNameSearchField } from './ActivitynameSearchField'

interface Props {
  onClose: () => void
  onSaved: () => void
  editRecord?: ActivityRecord
}

export const ActivityFormModal = ({ onClose, onSaved, editRecord }: Props) => {
  const [showNote, setShowNote] = useState(false)

  const {
    form,
    errors,
    onSubmit,
    handleToggle,
    isAccount,
    showDelegatedFields,
    showProjectField,
    showFrequencyField,
    activityName,
    delegatedActivity,
    assignToProject,
    recurringActivity,
    personalActivity,
    note,
  } = useActivityForm({ editRecord, onSaved, onClose })

  const { watch, setValue, control } = form

  if (showNote)
    return (
      <AddNoteModal
        initialNote={note}
        onSave={(val) => setValue('note', val)}
        onClose={() => setShowNote(false)}
      />
    )

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {editRecord
              ? `Edit Activity – ${editRecord.activityName}`
              : ACTIVITY_FORM_TEXT.title.create}
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.row}>
            <div className={styles.field}>
              <FieldLabel
                text={ACTIVITY_FORM_TEXT.fields.activityType}
                required
              />
              <SelectField
                value={watch('activityType')}
                onChange={(val) =>
                  setValue('activityType', val, { shouldValidate: true })
                }
                error={errors.activityType?.message}
              >
                {ACTIVITY_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </SelectField>
            </div>

            {isAccount && (
              <div className={styles.field}>
                <FieldLabel text={ACTIVITY_FORM_TEXT.fields.carrier} required />
                <SelectField
                  value={watch('carrier') ?? ''}
                  onChange={(val) =>
                    setValue('carrier', val, { shouldValidate: true })
                  }
                  error={errors.carrier?.message}
                >
                  <option value="West side Organization">
                    West side Organization
                  </option>
                </SelectField>
              </div>
            )}
          </div>

          {/* Sub Type */}
          {isAccount && (
            <div className={styles.row}>
              <div className={styles.field}>
                <FieldLabel
                  text={ACTIVITY_FORM_TEXT.fields.subType}
                  requiredText="(Required)"
                  required
                />
                <SelectField
                  value={watch('subType') ?? ''}
                  onChange={(val) => setValue('subType', val)}
                >
                  <option value="Main Account">Main Account</option>
                </SelectField>
              </div>
            </div>
          )}

          {/* Activity Name */}
          <ActivityNameSearchField
            key={editRecord?.id ?? 'new'}
            value={activityName ?? ''}
            onChange={(val) =>
              setValue('activityName', val, { shouldValidate: true })
            }
            error={errors.activityName?.message}
            addToDataSet={!!watch('addToDataSet')}
            onAddToDataSetChange={(val) => setValue('addToDataSet', val)}
          />

          {/* Activity Details */}
          <div className={styles.fullRow}>
            <div className={styles.field}>
              <FieldLabel text={ACTIVITY_FORM_TEXT.fields.activityDetails} />
              <Controller
                name="activityDetails"
                control={control}
                render={({ field }) => (
                  <TinyEditor
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder={
                      ACTIVITY_FORM_TEXT.placeholders.activityDetails
                    }
                    height={200}
                  />
                )}
              />
            </div>
          </div>

          {/* Due Date + Priority */}
          <div className={styles.row}>
            <div className={styles.field}>
              <FieldLabel text={ACTIVITY_FORM_TEXT.fields.dueDate} required />
              <DateField
                value={watch('dueDate')}
                onChange={(val) =>
                  setValue('dueDate', val, { shouldValidate: true })
                }
                error={errors.dueDate?.message}
              />
            </div>
            <div className={styles.field}>
              <FieldLabel text={ACTIVITY_FORM_TEXT.fields.priority} required />
              <SelectField
                value={watch('priority')}
                onChange={(val) =>
                  setValue('priority', val, { shouldValidate: true })
                }
                error={errors.priority?.message}
              >
                {PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <FieldLabel text={ACTIVITY_FORM_TEXT.fields.followUpDate} />
              <DateField
                value={watch('followUpDate') ?? ''}
                onChange={(val) => setValue('followUpDate', val)}
              />
            </div>
            <div className={styles.field}>
              <FieldLabel
                text={ACTIVITY_FORM_TEXT.fields.activityStatus}
                required
              />
              <SelectField
                value={watch('activityStatus')}
                onChange={(val) =>
                  setValue('activityStatus', val, { shouldValidate: true })
                }
                error={errors.activityStatus?.message}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <FieldLabel
                text={ACTIVITY_FORM_TEXT.fields.initialCommunication}
              />
              <SelectField
                value={watch('initialCommunication') ?? ''}
                onChange={(val) => setValue('initialCommunication', val)}
              >
                {COMMUNICATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>

          {!showDelegatedFields && !showProjectField ? (
            <div className={styles.row}>
              <ToggleRow
                label={ACTIVITY_FORM_TEXT.toggles.delegated}
                field="delegatedActivity"
                value={delegatedActivity}
                disabled={personalActivity === 'yes'}
                onChange={handleToggle}
              />
              <ToggleRow
                label={ACTIVITY_FORM_TEXT.toggles.assignProject}
                field="assignToProject"
                value={assignToProject}
                onChange={handleToggle}
              />
            </div>
          ) : (
            <>
              <div className={styles.row}>
                <ToggleRow
                  label={ACTIVITY_FORM_TEXT.toggles.delegated}
                  field="delegatedActivity"
                  value={delegatedActivity}
                  disabled={personalActivity === 'yes'}
                  onChange={handleToggle}
                />
              </div>

              {showDelegatedFields && (
                <>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <FieldLabel
                        text={ACTIVITY_FORM_TEXT.fields.organization}
                        required
                      />
                      <SelectField
                        value={watch('organization') ?? ''}
                        onChange={(val) =>
                          setValue('organization', val, {
                            shouldValidate: true,
                          })
                        }
                        error={errors.organization?.message}
                      >
                        <option value="">Select Organization</option>
                        <option value="C247 Infotech">C247 Infotech</option>
                      </SelectField>
                    </div>
                    <div className={styles.field}>
                      <FieldLabel
                        text={ACTIVITY_FORM_TEXT.fields.department}
                        required
                      />
                      <SelectField
                        value={watch('department') ?? ''}
                        onChange={(val) =>
                          setValue('department', val, { shouldValidate: true })
                        }
                        error={errors.department?.message}
                      >
                        <option value="">Select Department</option>
                        <option value="Development Studio">
                          Development Studio
                        </option>
                      </SelectField>
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <FieldLabel text={ACTIVITY_FORM_TEXT.fields.position} />
                      <SelectField
                        value={watch('position') ?? ''}
                        onChange={(val) => setValue('position', val)}
                      >
                        <option value="">Select Position</option>
                        <option value="Software Developer">
                          Software Developer
                        </option>
                      </SelectField>
                    </div>
                    <div className={styles.field}>
                      <FieldLabel text={ACTIVITY_FORM_TEXT.fields.person} />
                      <SelectField
                        value={watch('person') ?? ''}
                        onChange={(val) => setValue('person', val)}
                      >
                        <option value="">Select Person</option>
                        <option value="Aman">Aman</option>
                      </SelectField>
                    </div>
                  </div>
                </>
              )}

              <div className={styles.row}>
                <ToggleRow
                  label={ACTIVITY_FORM_TEXT.toggles.assignProject}
                  field="assignToProject"
                  value={assignToProject}
                  onChange={handleToggle}
                />
              </div>

              {showProjectField && (
                <div className={styles.row}>
                  <div className={styles.field}>
                    <FieldLabel
                      text={ACTIVITY_FORM_TEXT.fields.project}
                      required
                    />
                    <SelectField
                      value={watch('project') ?? ''}
                      onChange={(val) =>
                        setValue('project', val, { shouldValidate: true })
                      }
                      error={errors.project?.message}
                    >
                      <option value="">Select Project</option>
                      <option value="Activity Task">Activity Task</option>
                    </SelectField>
                  </div>
                </div>
              )}
            </>
          )}

          {!showFrequencyField ? (
            <div className={styles.row}>
              <ToggleRow
                label={ACTIVITY_FORM_TEXT.toggles.recurring}
                field="recurringActivity"
                value={recurringActivity}
                onChange={handleToggle}
              />
              <ToggleRow
                label={ACTIVITY_FORM_TEXT.toggles.personal}
                field="personalActivity"
                value={personalActivity}
                disabled={delegatedActivity === 'yes'}
                onChange={handleToggle}
              />
            </div>
          ) : (
            <>
              <div className={styles.row}>
                <ToggleRow
                  label={ACTIVITY_FORM_TEXT.toggles.recurring}
                  field="recurringActivity"
                  value={recurringActivity}
                  onChange={handleToggle}
                />
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <FieldLabel
                    text={ACTIVITY_FORM_TEXT.fields.frequency}
                    required
                  />
                  <SelectField
                    value={watch('frequency') ?? ''}
                    onChange={(val) =>
                      setValue('frequency', val, { shouldValidate: true })
                    }
                    error={errors.frequency?.message}
                  >
                    {FREQUENCY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </SelectField>
                </div>
              </div>

              <div className={styles.row}>
                <ToggleRow
                  label={ACTIVITY_FORM_TEXT.toggles.personal}
                  field="personalActivity"
                  value={personalActivity}
                  disabled={delegatedActivity === 'yes'}
                  onChange={handleToggle}
                />
              </div>
            </>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.row}>
            <button
              type="button"
              className={styles.noteBtn}
              onClick={() => setShowNote(true)}
            >
              <IconNote /> {ACTIVITY_FORM_TEXT.buttons.addNote}
            </button>
          </div>
          <button type="button" className={styles.submitBtn} onClick={onSubmit}>
            {editRecord
              ? ACTIVITY_FORM_TEXT.buttons.addNote
              : ACTIVITY_FORM_TEXT.buttons.create}
          </button>
        </div>
      </div>
    </div>
  )
}
