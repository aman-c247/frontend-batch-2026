import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchActivities } from '@/services/activities.service'
import { db } from '@/lib/db'
import type { Activity, ActivityRecord } from '@/types/activity.types'
import { ACTIVITY_MESSAGES, QUERY_KEYS } from './hooks.constants'

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([])

  const { data: apiData = [], isLoading } = useQuery({
    queryKey: QUERY_KEYS.ACTIVITIES,
    queryFn: fetchActivities,
  })

  const loadFromDB = async () => {
    const data = await db.activities.toArray()
    setActivities(data)
  }

  useEffect(() => {
    const init = async () => {
      const count = await db.activities.count()
      if (count === 0 && apiData.length) {
        const withOrder = apiData.map((item, index) => ({
          ...item,
          sortOrder: index,
        }))
        await db.activities.bulkAdd(withOrder)
      }
      loadFromDB()
    }
    init()
  }, [apiData])

  const getRecord = async (id: number): Promise<ActivityRecord | undefined> => {
    return db.activities.get(id)
  }

  const createActivity = async (values: Omit<ActivityRecord, 'id'>) => {
   await toast.promise(db.activities.add(values), {
     loading: ACTIVITY_MESSAGES.CREATE.LOADING,
     success: ACTIVITY_MESSAGES.CREATE.SUCCESS,
     error: ACTIVITY_MESSAGES.CREATE.ERROR,
   })
    loadFromDB()
  }

  const updateActivity = async (
    id: number,
    values: Omit<ActivityRecord, 'id'>,
  ) => {
   await toast.promise(db.activities.update(id, values), {
     loading: ACTIVITY_MESSAGES.UPDATE.LOADING,
     success: ACTIVITY_MESSAGES.UPDATE.SUCCESS,
     error: ACTIVITY_MESSAGES.UPDATE.ERROR,
   })
    loadFromDB()
  }

  const deleteActivity = async (id: number) => {
   await toast.promise(db.activities.delete(id), {
     loading: ACTIVITY_MESSAGES.DELETE.LOADING,
     success: ACTIVITY_MESSAGES.DELETE.SUCCESS,
     error: ACTIVITY_MESSAGES.DELETE.ERROR,
   })
    loadFromDB()
  }

  return {
    activities,
    isLoading,
    loadFromDB,
    getRecord,
    createActivity,
    updateActivity,
    deleteActivity,
  }
}
