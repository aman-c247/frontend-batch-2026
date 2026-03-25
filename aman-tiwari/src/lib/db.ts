import type { ActivityRecord } from '@/types/activity.types'
import Dexie, { Table } from 'dexie'

class ActivityDatabase extends Dexie {
  activities!: Table<ActivityRecord>

  constructor() {
    super('ActivityDB')
    this.version(2).stores({
      activities:
        '++id, status, priority, activityType, activityStatus, createdAt, sortOrder',
    })
  }
}

export const db = new ActivityDatabase()
