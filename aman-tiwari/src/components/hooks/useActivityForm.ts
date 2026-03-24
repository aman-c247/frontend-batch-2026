import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { db } from '@/lib/db'
import type { ActivityRecord } from '@/types/activity.types'
import {
  activityFormSchema,
  type ActivityFormValues,
} from '@/schema/ActivityForm.schema'
import {
  FORM_DEFAULTS,
  recordToFormValues,
  formValuesToRecord,
} from '@/schema/ActivityForm.helpers'

interface UseActivityFormOptions {
  editRecord?: ActivityRecord
  onSaved: () => void
  onClose: () => void
}

export function useActivityForm({
  editRecord,
  onSaved,
  onClose,
}: UseActivityFormOptions) {
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: editRecord ? recordToFormValues(editRecord) : FORM_DEFAULTS,
  })

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form

  const activityType = watch('activityType')
  const delegatedActivity = watch('delegatedActivity')
  const assignToProject = watch('assignToProject')
  const recurringActivity = watch('recurringActivity')
  const personalActivity = watch('personalActivity')
  const activityName = watch('activityName')
  const note = watch('note')

  const isAccount = activityType === 'Account'
  const showDelegatedFields = delegatedActivity === 'yes'
  const showProjectField = assignToProject === 'yes'
  const showFrequencyField = recurringActivity === 'yes'

  const handleToggle = (
    field:
      | 'delegatedActivity'
      | 'assignToProject'
      | 'recurringActivity'
      | 'personalActivity',
    value: 'yes' | 'no',
  ) => {
    setValue(field, value, { shouldValidate: true })
    if (field === 'delegatedActivity' && value === 'yes') {
      setValue('personalActivity', 'no')
    }
    if (field === 'personalActivity' && value === 'yes') {
      setValue('delegatedActivity', 'no')
    }
  }

  const onSubmit = handleSubmit(async (values) => {
    const record = formValuesToRecord(values, editRecord)
    const isEdit = !!editRecord?.id

    await toast.promise(
      isEdit
        ? db.activities.update(editRecord!.id!, record)
        : db.activities.add(record),
      {
        loading: isEdit ? 'Saving changes…' : 'Creating activity…',
        success: isEdit ? 'Activity updated!' : 'Activity created!',
        error: isEdit
          ? 'Failed to update activity.'
          : 'Failed to create activity.',
      },
    )

    onSaved()
    onClose()
  })

  return {
    form,
    errors,
    watch,
    setValue,
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
  }
}
