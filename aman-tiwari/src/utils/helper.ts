import type { Status } from '@/types/activity.types'

export const priorityColor = {
  urgent: 'danger',
  high: 'warning',
  standard: 'secondary',
}

export const statusMap: Record<Status, string> = {
  open: 'Open',
  onHold: 'On Hold',
  inProgress: 'In Progress',
  resolved: 'Resolved',
}


