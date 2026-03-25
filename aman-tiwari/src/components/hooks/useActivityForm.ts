'use client'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { db } from '@/lib/db'
import type { ActivityFormValues, ActivityRecord } from '@/types/activity.types'
import {
  FORM_DEFAULTS,
  recordToFormValues,
  formValuesToRecord,
} from '@/schema/ActivityForm.helpers'
import { ACTIVITY_MESSAGES } from './hooks.constants'
import { getActivityRegister } from './activity.register'

interface UseActivityFormOptions {
  editRecord?: ActivityRecord
  onClose: () => void
}

export function useActivityForm({
  editRecord,
  onClose,
}: UseActivityFormOptions) {
  const form = useForm<ActivityFormValues>({
    defaultValues: editRecord ? recordToFormValues(editRecord) : FORM_DEFAULTS,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = form

  const registerFields = getActivityRegister(register, watch)

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
        loading: isEdit
          ? ACTIVITY_MESSAGES.UPDATE.LOADING
          : ACTIVITY_MESSAGES.CREATE.LOADING,
        success: isEdit
          ? ACTIVITY_MESSAGES.UPDATE.SUCCESS
          : ACTIVITY_MESSAGES.CREATE.SUCCESS,
        error: isEdit
          ? ACTIVITY_MESSAGES.UPDATE.ERROR
          : ACTIVITY_MESSAGES.CREATE.ERROR,
      },
    )

    onClose()
  })

  return {
    form,
    errors,
    watch,
    setValue,
    onSubmit,
    handleToggle,


    registerFields,

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
