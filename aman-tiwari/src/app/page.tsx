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
import type { Status } from '@/types/activity.types'
import AppToaster from '@/components/common/AppToster'

const STATUSES: Status[] = ['open', 'onHold', 'inProgress', 'resolved']

export default function ActivityPage() {
  const { activities, isLoading, loadFromDB, getRecord, deleteActivity } =
    useActivities()

  const { activeItem, handleDragStart, handleDragEnd } = useActivityDrag({
    activities,
    onDragSettled: loadFromDB,
  })

  const { showModal, editRecord, openCreate, openEdit, closeModal } =
    useActivityModal()

  const handleEdit = async (id: number) => {
    const record = await getRecord(id)
    if (record) openEdit(record)
  }

  if (isLoading) return <div className="p-4">Loading...</div>

  return (
    <Container fluid className={styles.page}>
      <AppToaster />

      <Header onCreateActivity={openCreate} />
      <Toolbar />

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={(e) => handleDragStart(Number(e.active.id))}
        onDragEnd={handleDragEnd}
      >
        <Row className={styles.contentWrapper}>
          {STATUSES.map((status) => (
            <ActivityColumn
              key={status}
              status={status}
              data={activities}
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
          onSaved={loadFromDB}
          editRecord={editRecord}
        />
      )}
    </Container>
  )
}
