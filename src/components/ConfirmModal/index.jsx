import { Modal, Divider, Form, Button } from 'antd'
import React, { useState } from 'react'
import styles from './index.less'

const confirmModal = ({
  contents,
  btnLeftText,
  btnRightText,
  xCancel,
  ...restProps
}) => {
  return (
    <Modal {...restProps} className={styles.confirmModal}>
      <div style={{ textAlign: 'center', marginTop: 16 }}>{contents}</div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Button type="primary" style={{ marginRight: 20 }}>
          {btnLeftText}
        </Button>
        <Button type="default" style={{ marginLeft: 20 }} onClick={xCancel}>
          {btnRightText}
        </Button>
      </div>
    </Modal>
  )
}
export default confirmModal
