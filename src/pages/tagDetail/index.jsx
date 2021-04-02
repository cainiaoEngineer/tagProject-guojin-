import { PlusOutlined } from '@ant-design/icons'
import {
  Tabs,
  Card,
  Descriptions,
  Row,
  Col,
  Divider,
  Tag,
  Button,
  Timeline,
  Table,
} from 'antd'
import { Link } from 'umi'
import React, { useState, useRef } from 'react'

import ProDescriptions from '@ant-design/pro-descriptions'
import {
  PageContainer,
  FooterToolbar,
  PageHeaderWrapper,
} from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { queryRule, updateRule, addRule, removeRule } from './service'
import styles from './index.less'
import { columns } from './tbColumns'
import { LeftOutlined } from '@ant-design/icons'
import ConfirmModal from '@/components/ConfirmModal'

const { TabPane } = Tabs

const OrderInfo = () => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState(false)
  const [stepFormValues, setStepFormValues] = useState({})
  const actionRef = useRef()
  const [selectedRowsState, setSelectedRows] = useState([])
  const [isUnableModalVisible, setUnableModalVisible] = useState(false)
  //禁用弹窗
  const hideUnableModal = () => {
    setUnableModalVisible(false)
  }
  const editColumns = [
    {
      title: '字段名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '编辑前',
      dataIndex: 'remarkBefore',
    },
    {
      title: '编辑后',
      dataIndex: 'remarkAfter',
    },
  ]

  return (
    <Card className={styles.tagDetailSty}>
      <ConfirmModal
        title={'温馨提示'}
        visible={isUnableModalVisible}
        onOk={() => {}}
        onCancel={hideUnableModal}
        xCancel={hideUnableModal}
        footer={null}
        contents={
          <>
            <div>
              {`确认禁用`}
              <span style={{ fontWeight: 700 }}>{`${111}`}</span>
              {`标签吗？`}
            </div>
            <div>{`禁用状态的标签将无法在各业务场景中使用。`}</div>
          </>
        }
        btnLeftText={'确认禁用'}
        btnRightText={'取消'}
      />

      <a
        href="javascript:void(0)"
        onClick={() => {
          history.go(-1)
        }}
      >
        <LeftOutlined style={{ color: '#666' }} />
        <span className={styles.back}>返回</span>
      </a>
      <Divider />
      <div className={styles.titleSty}>
        <div className={styles.titleStyle}>xxx项目</div>
        <Tag color="green">启用中</Tag>
        <Button
          className={styles.disableBtn}
          onClick={() => {
            setUnableModalVisible(true)
          }}
        >
          禁用
        </Button>
      </div>

      <div className={styles.descriptionsSty}>
        <div className={styles.desItem}>
          <span className={styles.descriptionsLabel}>
            编号<span className={styles.descriptionsColon}>:</span>
          </span>
          <span>1000016</span>
        </div>
        <div className={styles.desItem}>
          <span className={styles.descriptionsLabel}>
            创建人<span className={styles.descriptionsColon}>:</span>
          </span>
          <span>顾xxx</span>
        </div>
        <div className={styles.desItem}>
          <span className={styles.descriptionsLabel}>
            创建时间<span className={styles.descriptionsColon}>:</span>
          </span>
          <span>2019-07-23 14：12：25</span>
        </div>
      </div>

      <Tabs
        defaultActiveKey="1"
        /* onChange={callback} */
      >
        <TabPane tab="基础信息" key="1">
          <ProDescriptions
            colon={false}
            labelStyle={{ color: '#666666' }}
            actionRef={actionRef}
            request={async () => {
              return Promise.resolve({
                success: true,
                data: { id: '这是一段文本', date: '20200730', money: '12121' },
              })
            }}
          >
            <ProDescriptions.Item label="标签" dataIndex="id" />
          </ProDescriptions>
          <ProDescriptions colon={false}>
            <ProDescriptions.Item
              dataIndex="date"
              label="日期"
              valueType="date"
            />
          </ProDescriptions>
          <ProDescriptions colon={false}>
            <ProDescriptions.Item
              label="money"
              dataIndex="money"
              valueType="money"
            />
          </ProDescriptions>
        </TabPane>
        <TabPane tab="客户信息" key="2">
          <ProTable
            className={styles.tagListSty}
            scroll={{ x: 1200 }}
            actionRef={actionRef}
            rowKey="key"
            bordered={true}
            size="small"
            request={(params, sorter, filter) =>
              queryRule({ ...params, sorter, filter })
            }
            pagination={{
              pageSizeOptions: ['10', '20', '50'],
              defaultPageSize: 10,
            }}
            columns={columns}
            options={false}
            collapsed={false}
            search={{
              span: 8,
              resetText: '',
              searchText: '导出',
              collapsed: false,
              collapseRender: () => false,
            }}
          />
        </TabPane>
        <TabPane tab="操作日志" key="3">
          <Timeline>
            <Timeline.Item dot={<div className={styles.timeDot}></div>}>
              <p className={styles.timeTag}>
                <span>2015-09-01</span>
                <span>08:45</span>
              </p>
              <p>
                <div className={styles.logContents}>
                  <div>
                    <span className={styles.logName}>张庆</span>
                    <span className={styles.ableType}>启用</span>
                  </div>
                  <div className={styles.reason}>这里是启用原因</div>
                </div>
              </p>
            </Timeline.Item>
            <Timeline.Item dot={<div className={styles.timeDot}></div>}>
              <p className={styles.timeTag}>
                <span>2015-09-01</span>
                <span>08:45</span>
              </p>
              <p>
                <div className={styles.logContents}>
                  <div>
                    <span className={styles.logName}>张庆</span>
                    <span
                      className={styles.disableType}
                      onClick={() => showmodal}
                    >
                      禁用
                    </span>
                  </div>
                  <div className={styles.reason}>这里是启用原因</div>
                </div>
              </p>
            </Timeline.Item>
            <Timeline.Item dot={<div className={styles.timeDot}></div>}>
              <p className={styles.timeTag}>
                <span>2015-09-01</span>
                <span>08:45</span>
              </p>
              <p>
                <div className={styles.logContents}>
                  <div>
                    <span className={styles.logName}>张庆</span>
                    <span className={styles.createType}>创建</span>
                  </div>
                </div>
              </p>
            </Timeline.Item>
            <Timeline.Item dot={<div className={styles.timeDot}></div>}>
              <p className={styles.timeTag}>
                <span>2015-09-01</span>
                <span>08:45</span>
              </p>
              <p>
                <div className={styles.logContents}>
                  <div style={{ marginBottom: 10 }}>
                    <span className={styles.logName}>张庆</span>
                    <span className={styles.editType}>编辑</span>
                  </div>
                  <Table
                    columns={editColumns}
                    pagination={false}
                    bordered
                    size="small"
                    dataSource={[
                      {
                        name: 'remark',
                        remarkBefore: '123',
                        remarkAfter: '345',
                      },
                    ]}
                  />
                </div>
              </p>
            </Timeline.Item>
          </Timeline>
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default OrderInfo
