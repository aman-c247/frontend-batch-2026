
export const ACTIVITY_FORM_TEXT = {
  title: {
    create: 'Create Activity',
    edit: (name: string) => `Edit Activity – ${name}`,
  },

  buttons: {
    addNote: 'Add Note',
    create: 'Create Activity',
    save: 'Save Activity',
  },

  fields: {
    activityType: 'Activity Type',
    carrier: 'Carrier',
    subType: 'Sub-Type',
    activityDetails: 'Activity Details',
    dueDate: 'Due Date',
    priority: 'Priority',
    followUpDate: 'Follow-Up Date',
    activityStatus: 'Activity Status',
    initialCommunication: 'Initial Communication',
    organization: 'Organization',
    department: 'Department',
    position: 'Position',
    person: 'Person',
    project: 'Project',
    frequency: 'Frequency',
  },

  toggles: {
    delegated: 'Delegated Activity?',
    assignProject: 'Assign To Specific Project?',
    recurring: 'Recurring Activity?',
    personal: 'Personal Activity?',
  },

  placeholders: {
    activityDetails: 'Write activity details here...',
  },
}




export const ACTIVITY_TYPE_OPTIONS = [
  { value: '', label: 'Select Activity Type' },
  { value: 'Account', label: 'Account' },
  { value: 'Non Account', label: 'Non Account' },
  { value: 'Personal', label: 'Personal' },
]

export const PRIORITY_OPTIONS = [
  { value: 'Standard', label: 'Standard' },
  { value: 'High', label: 'High' },
  { value: 'Urgent', label: 'Urgent' },
]

export const STATUS_OPTIONS = [
  { value: 'Open', label: 'Open' },
  { value: 'onHold', label: 'On Hold' },
  { value: 'inProgress', label: 'In Progress' },
  { value: 'Resolved', label: 'Resolved' },
]

export const COMMUNICATION_OPTIONS = [
  { value: '', label: 'Select Initial Communication' },
  { value: 'Email', label: 'Email' },
  { value: 'Email Out', label: 'Email Out' },
  { value: 'Phone In', label: 'Phone In' },
  { value: 'Phone Out', label: 'Phone Out' },
  { value: 'Meeting', label: 'Meeting' },
]

export const FREQUENCY_OPTIONS = [
  { value: '', label: 'Select Frequency' },
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Quarterly', label: 'Quarterly' },
  { value: 'Annually', label: 'Annually' },
]
