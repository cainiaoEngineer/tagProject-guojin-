import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  message,
  Input,
  Form,
  Row,
  Col,
  Tabs,
  Card,
} from 'antd'
import { Link } from 'umi'
import React, { useState, useRef } from 'react'
import {
  PageContainer,
  FooterToolbar,
  PageHeaderWrapper,
} from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import moment from 'moment'
import { queryRule, updateRule, addRule, removeRule } from './service'
const routes = [
  {
    path: '/orderInfo',
    breadcrumbName: '订单信息',
  },
  {
    path: '/costInfo',
    breadcrumbName: '财富宝费用信息',
  },
  {
    breadcrumbName: '历史账单',
  },
]

const OrderInfo = () => {
  const actionRef = useRef()
  const columns = [
    {
      title: '账单日期',
      order: 2,
      align: 'center',
      dataIndex: 'name',
      //   tip: '规则名称是唯一的 key',
      valueType: 'dateRange',
      formItemProps: {
        placeholder: ['开始时间', '截止时间'],
        disabledDate: (current) => {
          const tooLate = current && current > moment().endOf('day')
          return tooLate
        },
        onCalendarChange: (value) => {
          setDates(value)
        },
      },
    },
    {
      title: '支付状态',
      align: 'center',
      order: 3,
      dataIndex: 'desc',
      valueEnum: {
        0: { text: '全部' },
        1: { text: '签约中' },
        2: { text: '已退订' },
      },
      formItemProps: {
        defaultValue: '全部',
        placeholder: '请选择支付状态',
      },
    },
    {
      title: '支付订单编号',
      align: 'center',
      dataIndex: 'callNo',
      hideInSearch: true,
    },
    {
      title: '应扣费用(元)',
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
    },
    {
      title: '实扣费用(元)',
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
    },
    {
      title: '计费开始日',
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
    },
    {
      title: '计费截止日',
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
    },
    {
      title: '扣款时间',
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
    },
    {
      title: '费用明细',
      align: 'center',
      fixed: 'right',
      key: 'action',
      hideInSearch: true,
      width: 100,
      render: (text, record) => (
        <Link
          // target="_blank"
          to={{
            pathname: '/costInfo/paying',
            // search: `?mailSubject=${desc}`,
            // state: { id: name },
          }}
        >
          查看
        </Link>
      ),
    },
  ]
  return (
    <PageHeaderWrapper breadcrumb={{ routes }}>
      <Card>
        <ProTable
          scroll={{ x: 1300 }}
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
            searchText: '搜索',
            collapsed: false,
            collapseRender: () => false,
          }}
        />
      </Card>
    </PageHeaderWrapper>
  )
}

export default OrderInfo
