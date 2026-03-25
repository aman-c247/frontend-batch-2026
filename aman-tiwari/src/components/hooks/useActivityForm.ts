import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { db } from '@/lib/db'
import type { ActivityFormValues, ActivityRecord } from '@/types/activity.types'
import {
  FORM_DEFAULTS,
  recordToFormValues,
  formValuesToRecord,
} from '@/schema/ActivityForm.helpers'
import { ACTIVITY_FORM_MESSAGES, ACTIVITY_MESSAGES } from './hooks.constants'

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



  const registerActivityType = () =>
    register('activityType', {
      required: ACTIVITY_FORM_MESSAGES.VALIDATION.ACTIVITY_TYPE_REQUIRED,
    })

  const registerCarrier = () =>
    register('carrier', {
      validate: (val) =>
        activityType !== 'Account' || !!val || ACTIVITY_FORM_MESSAGES.VALIDATION.CARRIER_REQUIRED,
    })

  const registerSubType = () => register('subType')

  const registerActivityName = () =>
    register('activityName', {
      required: ACTIVITY_FORM_MESSAGES.VALIDATION.ACTIVITY_NAME_REQUIRED,
      minLength: { value: 2, message: ACTIVITY_FORM_MESSAGES.VALIDATION.ACTIVITY_NAME_MIN },
    })

  const registerActivityDetails = () => register('activityDetails')

  const registerDueDate = () =>
    register('dueDate', {
      required: ACTIVITY_FORM_MESSAGES.VALIDATION.DUE_DATE_REQUIRED,
    })

  const registerPriority = () =>
    register('priority', {
      required: ACTIVITY_FORM_MESSAGES.VALIDATION.PRIORITY_REQUIRED,
    })

  const registerFollowUpDate = () =>
    register('followUpDate', {
      validate: (val) => {
        if (!val) return true
        const due = watch('dueDate')
        if (due && val < due)
          return ACTIVITY_FORM_MESSAGES.VALIDATION.FOLLOWUP_INVALID
        return true
      },
    })

  const registerActivityStatus = () =>
    register('activityStatus', {
      required: ACTIVITY_FORM_MESSAGES.VALIDATION.STATUS_REQUIRED,
    })

  const registerInitialCommunication = () => register('initialCommunication')

  const registerOrganization = () =>
    register('organization', {
      validate: (val) =>
        delegatedActivity !== 'yes' || !!val || ACTIVITY_FORM_MESSAGES.VALIDATION.ORGANIZATION_REQUIRED,
    })

  const registerDepartment = () =>
    register('department', {
      validate: (val) =>
        delegatedActivity !== 'yes' || !!val || ACTIVITY_FORM_MESSAGES.VALIDATION.DEPARTMENT_REQUIRED,
    })

  const registerPosition = () => register('position')

  const registerPerson = () => register('person')

  const registerProject = () =>
    register('project', {
      validate: (val) =>
        assignToProject !== 'yes' || !!val || ACTIVITY_FORM_MESSAGES.VALIDATION.PROJECT_REQUIRED,
    })

  const registerFrequency = () =>
    register('frequency', {
      validate: (val) =>
        recurringActivity !== 'yes' || !!val || ACTIVITY_FORM_MESSAGES.VALIDATION.FREQUENCY_REQUIRED,
    })

  const registerNote = () => register('note')

  const registerAddToDataSet = () => register('addToDataSet')

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
        loading: isEdit ? ACTIVITY_MESSAGES.UPDATE.LOADING : ACTIVITY_MESSAGES.CREATE.LOADING,
        success: isEdit ? ACTIVITY_MESSAGES.UPDATE.SUCCESS : ACTIVITY_MESSAGES.CREATE.SUCCESS,
        error: isEdit
          ? ACTIVITY_MESSAGES.UPDATE.ERROR
          :ACTIVITY_MESSAGES.CREATE.ERROR,
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


    registerActivityType,
    registerCarrier,
    registerSubType,
    registerActivityName,
    registerActivityDetails,
    registerDueDate,
    registerPriority,
    registerFollowUpDate,
    registerActivityStatus,
    registerInitialCommunication,
    registerOrganization,
    registerDepartment,
    registerPosition,
    registerPerson,
    registerProject,
    registerFrequency,
    registerNote,
    registerAddToDataSet,


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
