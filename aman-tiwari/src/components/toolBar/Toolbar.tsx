import { Col, Row } from 'react-bootstrap'
import styles from '@/components/toolBar/Toolbar.module.scss'
export const Toolbar = () => (
  <Row className={styles.toolbar}>
    <Col md={6}>

    </Col>

    <Col md={6} className={styles.rightSection}>
      <div className={styles.priority}>
        <span className={styles.priorityText}>Priority :</span>
        <div className={styles.priority_wrapper}>
          <div className={styles.subwraper}>
            <span className={styles.urgent}></span>Urgent
          </div>
          <div className={styles.subwraper}>
            <span className={styles.high}></span> High
          </div>
          <div className={styles.subwraper}>
            <span className={styles.standard}></span>Standard
          </div>
        </div>
      </div>


    </Col>
  </Row>
)
