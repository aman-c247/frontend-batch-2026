'use client'

import { useState } from 'react'
import { Controller } from 'react-hook-form'
import type { ActivityRecord } from '@/types/activity.types'
import { AddNoteModal } from '../noteModal/AddNoteModal'
import {
  ACTIVITY_FORM_TEXT,
  ACTIVITY_TYPE_OPTIONS,
  COMMUNICATION_OPTIONS,
  DEPARTMENT_OPTION,
  FREQUENCY_OPTIONS,
  ORG_OPTION,
  PERSON_OPTION,
  POSITION_OPTION,
  PRIORITY_OPTIONS,
  PROJECT_OPTION,
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

  editRecord?: ActivityRecord
}

export const ActivityFormModal = ({ onClose, editRecord }: Props) => {
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

    registerFields,
  } = useActivityForm({ editRecord, onClose })

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
        <div className={styles.header}>
          <h2 className={styles.title}>
            {editRecord
              ? `Edit Activity – ${editRecord.activityName}`
              : ACTIVITY_FORM_TEXT.title.create}
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            {ACTIVITY_FORM_TEXT.buttons.close}
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
                registerProps={registerFields.activityType}
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
                  registerProps={registerFields.carrier}
                  error={errors.carrier?.message}
                >
                  <option value="West side Organization">
                    {ACTIVITY_FORM_TEXT.fields.carrier_option}
                  </option>
                </SelectField>
              </div>
            )}
          </div>

          {isAccount && (
            <div className={styles.row}>
              <div className={styles.field}>
                <FieldLabel
                  text={ACTIVITY_FORM_TEXT.fields.subType}
                  requiredText="(Required)"
                  required
                />
                <SelectField registerProps={registerFields.subType}>
                  <option value="Main Account">
                    {ACTIVITY_FORM_TEXT.fields.mainAccount_option}
                  </option>
                </SelectField>
              </div>
            </div>
          )}

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

          <div className={styles.row}>
            <div className={styles.field}>
              <FieldLabel text={ACTIVITY_FORM_TEXT.fields.dueDate} required />
              <DateField
                value={watch('dueDate')}
                onChange={(val) =>
                  setValue('dueDate', val, { shouldValidate: true })
                }
                registerProps={registerFields.dueDate}
                error={errors.dueDate?.message}
              />
            </div>
            <div className={styles.field}>
              <FieldLabel text={ACTIVITY_FORM_TEXT.fields.priority} required />
              <SelectField
                registerProps={registerFields.priority}
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
                registerProps={registerFields.followUpDate}
                error={errors.followUpDate?.message}
              />
            </div>
            <div className={styles.field}>
              <FieldLabel
                text={ACTIVITY_FORM_TEXT.fields.activityStatus}
                required
              />
              <SelectField
                registerProps={registerFields.activityStatus}
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
              <SelectField registerProps={registerFields.initialCommunication}>
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
                        registerProps={registerFields.organization}
                        error={errors.organization?.message}
                      >
                        {ORG_OPTION.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </SelectField>
                    </div>
                    <div className={styles.field}>
                      <FieldLabel
                        text={ACTIVITY_FORM_TEXT.fields.department}
                        required
                      />
                      <SelectField
                        registerProps={registerFields.department}
                        error={errors.department?.message}
                      >
                        {DEPARTMENT_OPTION.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </SelectField>
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <FieldLabel text={ACTIVITY_FORM_TEXT.fields.position} />
                      <SelectField registerProps={registerFields.position}>
                        {POSITION_OPTION.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </SelectField>
                    </div>
                    <div className={styles.field}>
                      <FieldLabel text={ACTIVITY_FORM_TEXT.fields.person} />
                      <SelectField registerProps={registerFields.person}>
                        {PERSON_OPTION.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.value}
                          </option>
                        ))}
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
                      registerProps={registerFields.project}
                      error={errors.project?.message}
                    >
                      {PROJECT_OPTION.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
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
                    registerProps={registerFields.frequency}
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
              ? ACTIVITY_FORM_TEXT.buttons.save
              : ACTIVITY_FORM_TEXT.buttons.create}
          </button>
        </div>
      </div>
    </div>
  )
}
