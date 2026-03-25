export const ACTIVITY_MESSAGES = {
  CREATE: {
    LOADING: 'Creating activity…',
    SUCCESS: 'Activity created!',
    ERROR: 'Failed to create activity.',
  },
  UPDATE: {
    LOADING: 'Saving changes…',
    SUCCESS: 'Activity updated!',
    ERROR: 'Failed to update activity.',
  },
  DELETE: {
    LOADING: 'Deleting…',
    SUCCESS: 'Activity deleted.',
    ERROR: 'Failed to delete activity.',
  },
}

export const QUERY_KEYS = {
  ACTIVITIES: ['activities'],
}

export const ACTIVITY_FORM_MESSAGES = {
  VALIDATION: {
    ACTIVITY_TYPE_REQUIRED: 'Activity type is required',
    CARRIER_REQUIRED: 'Carrier is required',
    ACTIVITY_NAME_REQUIRED: 'Activity name is required',
    ACTIVITY_NAME_MIN: 'Name must be at least 2 characters',
    DUE_DATE_REQUIRED: 'Due date is required',
    PRIORITY_REQUIRED: 'Priority is required',
    STATUS_REQUIRED: 'Activity status is required',
    ORGANIZATION_REQUIRED: 'Organization is required',
    DEPARTMENT_REQUIRED: 'Department is required',
    PROJECT_REQUIRED: 'Project is required',
    FREQUENCY_REQUIRED: 'Frequency is required',
    FOLLOWUP_INVALID: 'Follow-up date must be on or before due date',
  },

  TOAST: {
    CREATE: {
      LOADING: 'Creating activity…',
      SUCCESS: 'Activity created!',
      ERROR: 'Failed to create activity.',
    },
    UPDATE: {
      LOADING: 'Saving changes…',
      SUCCESS: 'Activity updated!',
      ERROR: 'Failed to update activity.',
    },
  },
}
