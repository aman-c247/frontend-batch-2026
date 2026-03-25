import type { Status } from '@/types/activity.types'

export const FILTER_TEXT = {
  DUE: 'Activity Due Date',
  CHOOSE_DATE: 'Choose a due date',
  PRIORITY: 'Priority',
  RESET: 'Reset',
  FILTER: 'Filter',
}

export const STATUS_LABELS: Record<Status, string> = {
  open: 'Open',
  onHold: 'On Hold',
  inProgress: 'In Progress',
  resolved: 'Resolved',
}


export const PRIORITY_OPTIONS = [
  { value: '', label: 'Select Priority' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'standard', label: 'Standard' },
]