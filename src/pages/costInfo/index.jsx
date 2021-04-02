import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  message,
  Input,
  Form,
  Row,
  Col,
  Card,
  Descriptions,
  Table,
  Space,
  Popover,
} from 'antd'
import { Link } from 'umi'
import React, { useState, useRef } from 'react'
import {
  PageContainer,
  FooterToolbar,
  PageHeaderWrapper,
} from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { queryRule, updateRule, addRule, removeRule } from './service'
import styles from './index.less'

const routes = [
  {
    path: '/orderInfo',
    breadcrumbName: '订单信息',
  },
  {
    path: '/costInfo',
    breadcrumbName: '财富宝费用信息',
  },
]

const columnsTable = [
  {
    title: '账单日期',
    align: 'center',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '支付状态',
    align: 'center',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '月服务费（元）',
    align: 'center',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '计费开始日',
    align: 'center',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '计费截止日',
    align: 'center',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '费用明细',
    align: 'center',
    key: 'action',
    width: 100,
    render: (text, record) => (
      <Link
        // target="_blank"
        to={{
          pathname: '/orderInfo/costInfo/paying',
          // search: `?mailSubject=${desc}`,
          // state: { id: name },
        }}
      >
        查看
      </Link>
    ),
  },
]
const dataSource = [
  {
    key: '1',
    name: '账单日期',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: '支付状态',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: '月服务费（元）',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: '计费开始日',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '5',
    name: '计费截止日',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '6',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
]
const CostInfo = () => {
  const [visible, setVisible] = useState('list1')
  return (
    <PageHeaderWrapper breadcrumb={{ routes }}>
      <Card
        className="extraMargin"
        title={'张三 财富宝账单信息'}
        extra={
          <Link
            to={{
              pathname:
                '/orderInfo/costInfo/HistoryList' /*  state: { id: name }, */,
            }}
          >
            {'查看历史账单 >>'}
          </Link>
        }
      >
        <div className="titleCenter">
          <Row gutter={30}>
            <Col
              span={8}
              className={visible == 'list1' ? 'titleBlue' : 'titleGray'}
            >
              <Popover
                content={
                  <Table
                    columns={columnsTable}
                    dataSource={dataSource}
                    bordered
                    size="small"
                    pagination={{ defaultPageSize: 5 }}
                  />
                }
                trigger="click"
                visible={visible == 'list1'}
                placement="bottomLeft"
                autoAdjustOverflow={true}
                onVisibleChange={() => {
                  setVisible('list1')
                }}
              >
                <Card
                  type="inner"
                  title={<div className={styles.cardTitle}>本期账单</div>}
                >
                  <div style={{ fontSize: 16 }}>本期应扣费用</div>
                  <div style={{ fontSize: 36, fontWeight: 'bold' }}>
                    ￥8989.40
                  </div>
                  <div style={{ fontSize: 16 }}>扣款日期:2020.06.05</div>
                </Card>
              </Popover>
            </Col>
            <Col
              span={8}
              className={visible == 'list2' ? 'titleBlue' : 'titleGray'}
            >
              <Popover
                placement="bottom"
                content={
                  <Table
                    columns={columnsTable}
                    dataSource={dataSource}
                    bordered
                    size="small"
                    pagination={{ defaultPageSize: 5 }}
                  />
                }
                trigger="click"
                visible={visible == 'list2'}
                onVisibleChange={() => {
                  setVisible('list2')
                }}
              >
                <div className="rightCard">
                  <Card
                    type="inner"
                    title={<div className={styles.cardTitle}>未出账单</div>}
                  >
                    <div style={{ fontSize: 16 }}>已计费用</div>
                    <div style={{ fontSize: 36, fontWeight: 'bold' }}>
                      ￥8989.40
                    </div>
                    <div style={{ fontSize: 16 }}>预计扣款日期:2020.07.05</div>
                  </Card>
                </div>
              </Popover>
            </Col>
          </Row>
        </div>
        <Row style={{ marginTop: 350 }}>
          <Col>
            <Card>
              <Descriptions title="总费用信息">
                <Descriptions.Item label="签约日期">
                  Zhou Maomao
                </Descriptions.Item>
                <Descriptions.Item label="开始计费日期">
                  1810000000
                </Descriptions.Item>
                <Descriptions.Item label="扣款周期">
                  1810000000
                </Descriptions.Item>
                <Descriptions.Item label="应扣费用总额">
                  <span>$80.00</span>
                </Descriptions.Item>
                <Descriptions.Item label="实扣费用总额">
                  $20.00
                </Descriptions.Item>
                <Descriptions.Item label="待扣费用总额">
                  $60.00
                </Descriptions.Item>
              </Descriptions>
              <Descriptions title="其他信息">
                <Descriptions.Item label="累计扣款失败次数">
                  Zhou Maomao
                </Descriptions.Item>
                <Descriptions.Item label="连续扣款失败次数">
                  1810000000
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  )
}
export default CostInfo
// export default connect(({ billListDetail, loading }) => ({
//   billListDetail, //可以直接结构出state
//   loading: loading.model.billListDetail,
// }))(CostInfo)
