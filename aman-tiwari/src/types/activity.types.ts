import type { UseFormRegisterReturn } from 'react-hook-form'

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

export interface ColumnFilters {
  dueDateRange: string
  priority: string
}

export type ToggleField =
  | 'delegatedActivity'
  | 'assignToProject'
  | 'recurringActivity'
  | 'personalActivity'

export interface LabelProps {
  htmlFor?: string
  text: string
  required?: boolean
  requiredText?: string
}

export interface SelectFieldProps {
  id?: string

  value?: string
  onChange?: (val: string) => void

  registerProps?: UseFormRegisterReturn
  disabled?: boolean
  children: React.ReactNode
  error?: string
}

export interface DateFieldProps {
  id?: string
  value: string
  onChange: (val: string) => void
  registerProps?: UseFormRegisterReturn
  error?: string
}

export interface ToggleProps {
  field: ToggleField
  value: YesNo
  disabled?: boolean
  onChange: (field: ToggleField, value: YesNo) => void
}

export interface ToggleRowProps {
  label: string
  field: ToggleField
  value: YesNo
  disabled?: boolean
  onChange: (field: ToggleField, value: YesNo) => void
}

export interface TinyEditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
  height?: number
  width?: string | number
}

export interface NoteProps {
  initialNote?: string
  onSave: (note: string) => void
  onClose: () => void
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  iconOnly?: boolean

}


export interface SearchFieldProps {
  value: string
  onChange: (val: string) => void
  error?: string
  addToDataSet: boolean
  onAddToDataSetChange: (val: boolean) => void
}

