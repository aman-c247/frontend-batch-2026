
import { useMemo } from 'react'
import type { Activity, Status } from '@/types/activity.types'

export const useActivitiesByStatus = (
  activities: Activity[],
  statuses: Status[],
) => {
  return useMemo(() => {
    return statuses.reduce(
      (acc, status) => {
        acc[status] = activities.filter((a) => a.status === status)
        return acc
      },
      {} as Record<Status, Activity[]>,
    )
  }, [activities, statuses])
}
