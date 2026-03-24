export const ACTIVITY_FORM_TEXT = {
  title: {
    create: 'Create Activity',
    edit: (name: string) => `Edit Activity – ${name}`,
  },

  buttons: {
    addNote: 'Add Note',
    create: 'Create Activity',
    save: 'Save Activity',
    add_activity: 'Add Activity Name to Data Set',
    close: '✕',
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
    carrier_option: 'West side Organization',
    mainAccount_option: 'Main Account',
  },

  toggles: {
    delegated: 'Delegated Activity?',
    assignProject: 'Assign To Specific Project?',
    recurring: 'Recurring Activity?',
    personal: 'Personal Activity?',
    yes: 'YES',
    no: 'NO',
  },

  placeholders: {
    activityDetails: 'Write activity details here...',
    dueDate: 'Choose a due date',
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
  { value: 'Standard', label: 'Standard' },
  { value: 'High', label: 'High' },
  { value: 'Urgent', label: 'Urgent' },
]

export const ORG_OPTION = [
  { value: '', label: 'Select Organization' },
  { value: 'C247 Infotech', label: 'C247 Infotech' },
]

export const POSITION_OPTION = [
  { value: '', label: 'Select Position' },
  { value: 'Software Developer', label: 'Software Developer' },
]

export const PERSON_OPTION = [
  { value: '', label: 'Select Person' },
  { value: 'Aman', label: 'Aman' },
]

export const PROJECT_OPTION = [
  { value: '', label: 'Select Project' },
  { value: 'activity task', label: 'Activity Task' },
]

export const DEPARTMENT_OPTION = [
  { value: '', label: 'Select Department' },
  { value: 'C247 Infotech', label: 'C247 Infotech' },
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
