import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { db } from '@/lib/db'
import type { ActivityFormValues, ActivityRecord } from '@/types/activity.types'
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
      required: 'Activity type is required',
    })

  const registerCarrier = () =>
    register('carrier', {
      validate: (val) =>
        activityType !== 'Account' || !!val || 'Carrier is required',
    })

  const registerSubType = () => register('subType')

  const registerActivityName = () =>
    register('activityName', {
      required: 'Activity name is required',
      minLength: { value: 2, message: 'Name must be at least 2 characters' },
    })

  const registerActivityDetails = () => register('activityDetails')

  const registerDueDate = () =>
    register('dueDate', {
      required: 'Due date is required',
    })

  const registerPriority = () =>
    register('priority', {
      required: 'Priority is required',
    })

  const registerFollowUpDate = () =>
    register('followUpDate', {
      validate: (val) => {
        if (!val) return true
        const due = watch('dueDate')
        if (due && val < due)
          return 'Follow-up date must be on or after due date'
        return true
      },
    })

  const registerActivityStatus = () =>
    register('activityStatus', {
      required: 'Activity status is required',
    })

  const registerInitialCommunication = () => register('initialCommunication')

  const registerOrganization = () =>
    register('organization', {
      validate: (val) =>
        delegatedActivity !== 'yes' || !!val || 'Organization is required',
    })

  const registerDepartment = () =>
    register('department', {
      validate: (val) =>
        delegatedActivity !== 'yes' || !!val || 'Department is required',
    })

  const registerPosition = () => register('position')

  const registerPerson = () => register('person')

  const registerProject = () =>
    register('project', {
      validate: (val) =>
        assignToProject !== 'yes' || !!val || 'Project is required',
    })

  const registerFrequency = () =>
    register('frequency', {
      validate: (val) =>
        recurringActivity !== 'yes' || !!val || 'Frequency is required',
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
