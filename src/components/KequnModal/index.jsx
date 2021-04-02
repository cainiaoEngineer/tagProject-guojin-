import { Modal, Divider, Form, Button } from 'antd'
import React from 'react'
import classNames from 'classnames'
import styles from './index.less'

const KequnModal = ({ xCancel, contents, ...restProps }) => (
  <Modal {...restProps} className={styles.uploadModal}>
    {contents}
    <Divider />
    <div className={styles.submitBtn}>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
          提交
        </Button>
        <Button type="default" style={{ marginLeft: 20 }} onClick={xCancel}>
          取消
        </Button>
      </Form.Item>
    </div>
  </Modal>
)
export default KequnModal
