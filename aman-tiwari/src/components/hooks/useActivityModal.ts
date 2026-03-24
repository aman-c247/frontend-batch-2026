import { useState } from 'react'
import type { ActivityRecord } from '@/types/activity.types'

export function useActivityModal() {
  const [showModal, setShowModal] = useState(false)
  const [editRecord, setEditRecord] = useState<ActivityRecord | undefined>()

  const openCreate = () => {
    setEditRecord(undefined)
    setShowModal(true)
  }

  const openEdit = (record: ActivityRecord) => {
    setEditRecord(record)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditRecord(undefined)
  }

  return { showModal, editRecord, openCreate, openEdit, closeModal }
}
