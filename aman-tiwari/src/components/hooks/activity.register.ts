
import type { UseFormRegister, UseFormWatch } from 'react-hook-form'
import type { ActivityFormValues } from '@/types/activity.types'
import { ACTIVITY_FORM_MESSAGES } from './hooks.constants'

export function getActivityRegister(
  register: UseFormRegister<ActivityFormValues>,
  watch: UseFormWatch<ActivityFormValues>,
) {
  const activityType = watch('activityType')
  const delegatedActivity = watch('delegatedActivity')
  const assignToProject = watch('assignToProject')
  const recurringActivity = watch('recurringActivity')

  return {
    activityType: register('activityType', {
      required: ACTIVITY_FORM_MESSAGES.VALIDATION.ACTIVITY_TYPE_REQUIRED,
    }),

    carrier: register('carrier', {
      validate: (val) =>
        activityType !== 'Account' ||
        !!val ||
        ACTIVITY_FORM_MESSAGES.VALIDATION.CARRIER_REQUIRED,
    }),

    subType: register('subType'),

    activityName: register('activityName', {
      required: ACTIVITY_FORM_MESSAGES.VALIDATION.ACTIVITY_NAME_REQUIRED,
      minLength: {
        value: 2,
        message: ACTIVITY_FORM_MESSAGES.VALIDATION.ACTIVITY_NAME_MIN,
      },
    }),

    activityDetails: register('activityDetails'),

    dueDate: register('dueDate', {
      required: ACTIVITY_FORM_MESSAGES.VALIDATION.DUE_DATE_REQUIRED,
    }),

    priority: register('priority', {
      required: ACTIVITY_FORM_MESSAGES.VALIDATION.PRIORITY_REQUIRED,
    }),

    followUpDate: register('followUpDate', {
      validate: (val) => {
        if (!val) return true
        const due = watch('dueDate')
        if (due && val > due) {
          return ACTIVITY_FORM_MESSAGES.VALIDATION.FOLLOWUP_INVALID
        }
        return true
      },
    }),

    activityStatus: register('activityStatus', {
      required: ACTIVITY_FORM_MESSAGES.VALIDATION.STATUS_REQUIRED,
    }),

    initialCommunication: register('initialCommunication'),

    organization: register('organization', {
      validate: (val) =>
        delegatedActivity !== 'yes' ||
        !!val ||
        ACTIVITY_FORM_MESSAGES.VALIDATION.ORGANIZATION_REQUIRED,
    }),

    department: register('department', {
      validate: (val) =>
        delegatedActivity !== 'yes' ||
        !!val ||
        ACTIVITY_FORM_MESSAGES.VALIDATION.DEPARTMENT_REQUIRED,
    }),

    position: register('position'),

    person: register('person'),

    project: register('project', {
      validate: (val) =>
        assignToProject !== 'yes' ||
        !!val ||
        ACTIVITY_FORM_MESSAGES.VALIDATION.PROJECT_REQUIRED,
    }),

    frequency: register('frequency', {
      validate: (val) =>
        recurringActivity !== 'yes' ||
        !!val ||
        ACTIVITY_FORM_MESSAGES.VALIDATION.FREQUENCY_REQUIRED,
    }),

    note: register('note'),

    addToDataSet: register('addToDataSet'),
  }
}
