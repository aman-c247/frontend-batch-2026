import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchActivities } from '@/services/activities.service'
import { db } from '@/lib/db'
import type { Activity, ActivityRecord } from '@/types/activity.types'
import { ACTIVITY_MESSAGES, QUERY_KEYS } from './hooks.constants'
import { useLiveQuery } from 'dexie-react-hooks'

export function useActivities() {
  const activities = useLiveQuery(() => db.activities.orderBy('sortOrder').toArray(), []) || [];

  const { data: apiData = [], isLoading } = useQuery({
    queryKey: QUERY_KEYS.ACTIVITIES,
    queryFn: fetchActivities,
  })

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

    }
    init()
  }, [apiData])

  const getRecord = async (id: number): Promise<ActivityRecord | undefined> => {
    return db.activities.get(id)
  }


  const deleteActivity = async (id: number) => {
   await toast.promise(db.activities.delete(id), {
     loading: ACTIVITY_MESSAGES.DELETE.LOADING,
     success: ACTIVITY_MESSAGES.DELETE.SUCCESS,
     error: ACTIVITY_MESSAGES.DELETE.ERROR,
   })

  }

  return {
    activities,
    isLoading,
    getRecord,
    deleteActivity,
  }
}
