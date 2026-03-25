'use client'

import { Container, Row } from 'react-bootstrap'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'

import { ActivityColumn } from '@/components/activityColumn/ActivityColumn'
import { ActivityCard } from '@/components/activityCard/ActivityCard'
import { ActivityFormModal } from '@/components/activityForm/ActivityFormModal'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolBar/Toolbar'

import { useActivities } from '@/components/hooks/useActivity'
import { useActivityDrag } from '@/components/hooks/useActivityDrag'
import { useActivityModal } from '@/components/hooks/useActivityModal'

import styles from '@/components/MainPage.module.scss'

import { useCallback } from 'react'
import { STATUSES } from '@/components/constants'
import { useActivitiesByStatus } from '@/components/hooks/useActivityBystatus'

export default function ActivityPage() {
  const { activities, isLoading, getRecord, deleteActivity } = useActivities()

  const { activeItem, onDragEnd, onDragStart } = useActivityDrag({
    activities,
  })

  const { showModal, editRecord, openCreate, openEdit, closeModal } =
    useActivityModal()

  const activitiesByStatus = useActivitiesByStatus(activities,STATUSES)

  const handleEdit = useCallback(
    async (id: number) => {
      const record = await getRecord(id)
      if (record) openEdit(record)
    },
    [getRecord, openEdit],
  )

  if (isLoading) return <div className="p-4">Loading...</div>

  return (
    <Container fluid className={styles.page}>
      <Header onCreateActivity={openCreate} />
      <Toolbar />

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Row className={styles.contentWrapper}>
          {STATUSES.map((status) => (
            <ActivityColumn
              key={status}
              status={status}
              data={activitiesByStatus[status]}
              onEdit={handleEdit}
              onDelete={deleteActivity}
            />
          ))}
        </Row>

        <DragOverlay>
          {activeItem ? <ActivityCard activity={activeItem} /> : null}
        </DragOverlay>
      </DndContext>

      {showModal && (
        <ActivityFormModal
          onClose={closeModal}
          editRecord={editRecord}
        />
      )}
    </Container>
  )
}
