import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { fetchActivities } from '@/services/activities.service'
import { db } from '@/lib/db'
import type { Activity, ActivityRecord } from '@/types/activity.types'

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([])

  const { data: apiData = [], isLoading } = useQuery({
    queryKey: ['activities'],
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
      loading: 'Creating activity…',
      success: 'Activity created!',
      error: 'Failed to create activity.',
    })
    loadFromDB()
  }

  const updateActivity = async (
    id: number,
    values: Omit<ActivityRecord, 'id'>,
  ) => {
    await toast.promise(db.activities.update(id, values), {
      loading: 'Saving changes…',
      success: 'Activity updated!',
      error: 'Failed to update activity.',
    })
    loadFromDB()
  }

  const deleteActivity = async (id: number) => {
    await toast.promise(db.activities.delete(id), {
      loading: 'Deleting…',
      success: 'Activity deleted.',
      error: 'Failed to delete activity.',
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
