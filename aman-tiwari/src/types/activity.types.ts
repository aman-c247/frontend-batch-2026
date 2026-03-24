export type Priority = 'urgent' | 'high' | 'standard'
export type Status = 'open' | 'onHold' | 'inProgress' | 'resolved'

export interface Activity {
  id?: number
  title?: string
  owner: string
  date: string
  priority: Priority
  status: Status
  sortOrder?: number
}

export interface ActivityRecord extends Omit<Activity, 'id'> {
  id?: number
  activityType?: string
  carrier?: string
  subType?: string
  activityName?: string
  activityDetails?: string
  dueDate?: string
  followUpDate?: string
  activityStatus?: string
  initialCommunication?: string
  delegatedActivity?: boolean
  assignToProject?: boolean
  recurringActivity?: boolean
  personalActivity?: boolean
  organization?: string
  department?: string
  position?: string
  person?: string
  project?: string
  frequency?: string
  note?: string
  addToDataSet?: boolean

  createdAt?: string
  updatedAt?: string
}

export type YesNo = 'yes' | 'no'

export interface FormState {
  activityType: string
  carrier: string
  subType: string
  activityName: string
  addToDataSet: boolean
  activityDetails: string
  dueDate: string
  priority: string
  followUpDate: string
  activityStatus: string
  initialCommunication: string
  delegatedActivity: YesNo
  assignToProject: YesNo
  recurringActivity: YesNo
  personalActivity: YesNo
  organization: string
  department: string
  position: string
  person: string
  project: string
  frequency: string
  note: string
}

export type ActivityFormValues = {
  activityType: string
  carrier?: string
  subType?: string
  activityName: string
  addToDataSet: boolean
  activityDetails?: string
  dueDate: string
  priority: string
  followUpDate?: string
  activityStatus: string
  initialCommunication?: string
  delegatedActivity: 'yes' | 'no'
  assignToProject: 'yes' | 'no'
  recurringActivity: 'yes' | 'no'
  personalActivity: 'yes' | 'no'
  organization?: string
  department?: string
  position?: string
  person?: string
  project?: string
  frequency?: string
  note?: string
}
