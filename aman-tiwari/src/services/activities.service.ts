import { activities } from '@/data/data'
import type { Activity } from '@/types/activity.types'

export const fetchActivities = async (): Promise<Activity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(activities), 500)
  })
}
