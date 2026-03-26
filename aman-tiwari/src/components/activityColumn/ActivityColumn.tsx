'use client'

import { Col } from 'react-bootstrap'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { CoulmnProps } from '@/types/activity.types'
import { ActivityCard } from '../activityCard/ActivityCard'
import styles from '@/components/activityColumn/ActivityColumn.module.scss'
import { IconFilter } from '@/assets/icon/IconFilter'
import { ColumnFilterPanel } from './CoulmnFilter'
import { FILTER_TEXT, STATUS_LABELS } from './activityColumn.constants'
import { useActivityColumn } from '../hooks/useActivityColumn'
import { Button } from '../common/Button'

export const ActivityColumn = ({
  status,
  data,
  onEdit,
  onDelete,
}: CoulmnProps) => {
  const {
    setNodeRef,
    isOver,

    filterBtnRef,
    showFilter,
    setShowFilter,

    setFilters,
    isFiltered,

    filtered,
  } = useActivityColumn(status, data)

  return (
    <Col md={3}>
      <div
        ref={setNodeRef}
        className={`${styles.column} ${styles[status]} ${isOver ? styles.activeDrop : ''}`}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.statusLabel}>{STATUS_LABELS[status]}</span>
            <span className={styles.badge}>{filtered.length}</span>
          </div>
          <Button
            ref={filterBtnRef}
            className={`${styles.filterBtn} ${isFiltered ? styles.filterActive : ''}`}
            onClick={() => setShowFilter((v) => !v)}
            title={FILTER_TEXT.FILTER}
          >
            <IconFilter />
          </Button>

          {showFilter && (
            <ColumnFilterPanel
              anchorRef={filterBtnRef}
              onApply={(filter) => setFilters(filter)}
              onClose={() => setShowFilter(false)}
            />
          )}
        </div>

        <div className={styles.cardList}>
          <SortableContext
            items={filtered.map((a) => a.id!)}
            strategy={verticalListSortingStrategy}
          >
            {filtered.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </Col>
  )
}
