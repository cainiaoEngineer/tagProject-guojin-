import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Alert, Col, Row } from 'antd'

import styles from './Welcome.less'
import { Link } from 'umi'
const { Meta } = Card
const getHeader = () => (
  <Row>
    <Col span={3}>产品经理：</Col>
    <Col span={9}>袁盼盼</Col>
    <Col span={3}>启动日期：</Col>
    <Col span={9}>2020/08/26</Col>
  </Row>
)
export default () => (
  <PageContainer>
    <Alert message="项目信息" description={getHeader()} type="info" />
    <Row gutter={16} className={styles.marginTop}>
      <Col span={12}>
        <Link
          to={{
            pathname: '/orderInfo',
          }}
        >
          <Card
            title="客户视图-增值服务-订单信息（财富宝）"
            hoverable
            bordered={false}
          >
            <Meta title="祖清华" description="负责人" />
          </Card>
        </Link>
      </Col>
      <Col span={12}>
        <Link
          to={{
            pathname: '/orderInfo/costInfo/paying',
          }}
        >
          <Card title="费用信息" hoverable bordered={false}>
            <Meta title="祖清华" description="负责人" />
          </Card>
        </Link>
      </Col>
    </Row>
    <Row gutter={16} className={styles.marginTop}>
      <Col span={12}>
        <Link
          to={{
            pathname: '/orderInfo/costInfo/HistoryList',
          }}
        >
          <Card title="历史账单" hoverable bordered={false}>
            <Meta title="祖清华" description="负责人" />
          </Card>
        </Link>
      </Col>
    </Row>
  </PageContainer>
)
