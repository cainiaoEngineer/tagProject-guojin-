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
  Tag,
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
  {
    breadcrumbName: '费用明细',
  },
]

const OrderInfo = () => {
  const actionRef = useRef()
  const columns = [
    {
      title: '日期',
      dataIndex: 'name',
      //   tip: '规则名称是唯一的 key',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '日终总资产（元）',
      tip: `包含普通和信用账户的场内、场外、OTC（证券理财产品和银行理财产品）、质押资产（约定购回和债券质押）市值，账户内资金余额（含外币资产，以人民币计算），期权账户市值；不包含限售股市值。`,
      dataIndex: 'desc',
      align: 'center',
    },
    {
      title: '服务费率（%）',
      dataIndex: 'callNo',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '日计提服务费（元）',
      tip: `日计提服务费=日终总资产*服务费率/当年天数  若是试用期，则服务费为0,
        若是最低收费补扣款，服务费资金账户每年最低收费3600元，当年已计提费用不足3600元时，将在自服务协议生效日起每满12个月（不含体验期）届满前最后一个扣款日收取剩余服务费
        `,
      dataIndex: 'callNo',
      hideInSearch: true,
      align: 'center',
    },
  ]
  return (
    <PageHeaderWrapper breadcrumb={{ routes }}>
      <Card>
        <div className="setTableSty">
          <ProTable
            headerTitle={
              <>
                <span>总计</span>
                <span
                  style={{ fontSize: 36, fontWeight: 'bold', marginLeft: 10 }}
                >
                  ￥127.09
                </span>
                <Tag
                  style={{ position: 'absolute', marginLeft: 10 }}
                  color="#108ee9"
                >
                  计费中
                </Tag>
              </>
            }
            actionRef={actionRef}
            rowKey="key"
            bordered={true}
            request={(params, sorter, filter) =>
              queryRule({ ...params, sorter, filter })
            }
            pagination={{
              pageSizeOptions: ['10', '20', '50'],
              defaultPageSize: 10,
            }}
            size="small"
            columns={columns}
            options={false}
            search={null}
          />
        </div>
      </Card>
    </PageHeaderWrapper>
  )
}

export default OrderInfo
