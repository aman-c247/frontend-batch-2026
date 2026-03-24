import type { ActivityFormValues } from '@/types/activity.types'
import type { ActivityRecord, Activity } from '@/types/activity.types'

export const FORM_DEFAULTS: ActivityFormValues = {
  activityType: '',
  carrier: 'West side Organization',
  subType: 'Main Account',
  activityName: '',
  addToDataSet: false,
  activityDetails: '',
  dueDate: '',
  priority: 'Standard',
  followUpDate: '',
  activityStatus: 'Open',
  initialCommunication: '',
  delegatedActivity: 'no',
  assignToProject: 'no',
  recurringActivity: 'no',
  personalActivity: 'no',
  organization: '',
  department: '',
  position: '',
  person: '',
  project: '',
  frequency: '',
  note: '',
}

const PRIORITY_TO_FORM: Record<string, string> = {
  standard: 'Standard',
  high: 'High',
  urgent: 'Urgent',
}

const STATUS_TO_FORM: Record<string, string> = {
  open: 'Open',
  onHold: 'onHold',
  inProgress: 'inProgress',
  resolved: 'Resolved',
}


export function recordToFormValues(record: ActivityRecord): ActivityFormValues {
  return {
    activityType: record.activityType ?? '',
    carrier: record.carrier ?? 'West side Organization',
    subType: record.subType ?? 'Main Account',
    activityName: record.activityName ?? record.title ?? '',
    addToDataSet: record.addToDataSet ?? false,
    activityDetails: record.activityDetails ?? '',
    dueDate: record.dueDate ?? record.date ?? '',
    priority: record.priority
      ? (PRIORITY_TO_FORM[record.priority] ?? 'Standard')
      : 'Standard',
    followUpDate: record.followUpDate ?? '',
    activityStatus:
      record.activityStatus ??
      STATUS_TO_FORM[record.status ?? 'open'] ??
      'Open',
    initialCommunication: record.initialCommunication ?? '',
    delegatedActivity: record.delegatedActivity ? 'yes' : 'no',
    assignToProject: record.assignToProject ? 'yes' : 'no',
    recurringActivity: record.recurringActivity ? 'yes' : 'no',
    personalActivity: record.personalActivity ? 'yes' : 'no',
    organization: record.organization ?? '',
    department: record.department ?? '',
    position: record.position ?? '',
    person: record.person ?? '',
    project: record.project ?? '',
    frequency: record.frequency ?? '',
    note: record.note ?? '',
  }
}

const PRIORITY_TO_DB: Record<string, Activity['priority']> = {
  Standard: 'standard',
  High: 'high',
  Urgent: 'urgent',
}

const STATUS_TO_DB: Record<string, Activity['status']> = {
  Open: 'open',
  onHold: 'onHold',
  inProgress: 'inProgress',
  Resolved: 'resolved',
}


export function formValuesToRecord(
  values: ActivityFormValues,
  editRecord?: ActivityRecord,
): Omit<ActivityRecord, 'id'> {
  const isDelegated = values.delegatedActivity === 'yes'
  const isProject = values.assignToProject === 'yes'
  const isRecurring = values.recurringActivity === 'yes'
  const isAccount = values.activityType === 'Account'

  return {

    title: values.activityName,
    owner: values.person || 'Admin Dev',
    date: values.dueDate,
    priority: PRIORITY_TO_DB[values.priority] ?? 'standard',
    status: STATUS_TO_DB[values.activityStatus] ?? 'open',
    sortOrder: editRecord?.sortOrder ?? 0,


    activityType: values.activityType,
    carrier: isAccount ? values.carrier : undefined,
    subType: isAccount ? values.subType : undefined,
    activityName: values.activityName,
    activityDetails: values.activityDetails || undefined,
    dueDate: values.dueDate,
    followUpDate: values.followUpDate || undefined,
    activityStatus: values.activityStatus,
    initialCommunication: values.initialCommunication || undefined,
    delegatedActivity: isDelegated,
    assignToProject: isProject,
    recurringActivity: isRecurring,
    personalActivity: values.personalActivity === 'yes',
    organization: isDelegated ? values.organization : undefined,
    department: isDelegated ? values.department : undefined,
    position: isDelegated ? values.position : undefined,
    person: isDelegated ? values.person : undefined,
    project: isProject ? values.project : undefined,
    frequency: isRecurring ? values.frequency : undefined,
    note: values.note || undefined,
    addToDataSet: values.addToDataSet,
    createdAt: editRecord?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}
