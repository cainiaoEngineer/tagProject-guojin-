import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  message,
  Input,
  Select,
  Form,
  Row,
  Col,
  Tabs,
  Card,
  Modal,
  Switch,
  Tooltip,
  Upload,
  Popconfirm,
  Icon,
  Popover,
} from 'antd'
import { Link } from 'umi'
import React, { useState, useRef, useEffect } from 'react'
import {
  PageContainer,
  FooterToolbar,
  PageHeaderWrapper,
} from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import moment from 'moment'
import { queryRule, updateRule, addRule, removeRule } from './service'
import {
  UploadOutlined,
  QuestionCircleFilled,
  CaretDownOutlined,
} from '@ant-design/icons'
import styles from './index.less'
import KequnModal from '@/components/KequnModal'
import ConfirmModal from '@/components/ConfirmModal'
const { Option } = Select
const { TextArea } = Input
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
}
const normFile = (e) => {
  console.log('Upload event:', e)

  if (Array.isArray(e)) {
    return e
  }

  return e && e.fileList
}

const clientGroupList = () => {
  const actionRef = useRef()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditModalVisible, setEditIsModalVisible] = useState(false)
  const [isdeleteModalVisible, setDeleteModalVisible] = useState(false)
  const [isUnableModalVisible, setUnableModalVisible] = useState(false)

  const [kequnName, setKqName] = useState('')
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  //新建弹窗
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }

  //编辑弹窗
  const handleEditOk = () => {
    setEditIsModalVisible(false)
  }

  const handleEditCancel = () => {
    setEditIsModalVisible(false)
  }

  //删除弹窗
  const hideDeleteModal = () => {
    setDeleteModalVisible(false)
  }

  //禁用弹窗
  const hideUnableModal = () => {
    setUnableModalVisible(false)
  }

  const columns = [
    {
      title: '标签编号',
      align: 'center',
      dataIndex: 'labelId',
      hideInSearch: true,
    },
    {
      title: '标签名称',
      align: 'center',
      dataIndex: 'labelName',
      order: 5,
      formItemProps: {
        placeholder: '请输入客群名称查询',
        allowClear: true,
      },
    },
    {
      title: '标签类型',
      align: 'center',
      dataIndex: 'type',
      order: 4,
      valueEnum: {
        1: { text: '全部' },
        2: { text: '高危标签' },
        3: { text: '系统标签' },
        4: { text: '活动标签' },
        5: { text: '自定义标签' },
      },
      formItemProps: {
        defaultValue: '全部',
        placeholder: '请选择标签类型',
      },
    },
    {
      title: '标签说明',
      align: 'center',
      dataIndex: 'clientTotalNum',
      hideInSearch: true,
    },
    {
      title: '已标签客户数',
      align: 'center',
      dataIndex: 'clientTotalNum',
      hideInSearch: true,
    },
    {
      title: '标签状态',
      align: 'center',
      dataIndex: 'remark',
      order: 3,
      valueEnum: {
        1: { text: '全部' },
        2: { text: '启用' },
        3: { text: '禁用' },
      },
      formItemProps: {
        defaultValue: '全部',
        placeholder: '请选择标签状态',
      },
    },
    {
      title: '业务展示排序',
      align: 'center',
      dataIndex: 'clientTotalNum',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.clientTotalNum - b.clientTotalNum,
      hideInSearch: true,
    },
    {
      title: '创建人',
      align: 'center',
      order: 2,
      dataIndex: 'creator',
      formItemProps: {
        placeholder: '请输入创建人',
        allowClear: true,
      },
    },
    {
      title: '创建时间',
      order: 1,
      align: 'center',
      dataIndex: 'time',
      //   tip: '规则名称是唯一的 key',
      valueType: 'dateRange',
      sorter: (a, b) => a.clientTotalNum - b.clientTotalNum,
      formItemProps: {
        placeholder: ['开始时间', '截止时间'],
        disabledDate: (current) => {
          const tooLate = current && current > moment().endOf('day')
          return tooLate
        },
        onCalendarChange: (value) => {
          // setDates(value)
        },
      },
    },

    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      key: 'action',
      hideInSearch: true,
      width: 150,
      render: (text, record) => (
        <>
          <a
            onClick={() => {
              setEditIsModalVisible(true)
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setKqName(record.name)
              console.log('record.name', record)
              setDeleteModalVisible(true)
            }}
          >
            删除
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setUnableModalVisible(true)
            }}
          >
            禁用
          </a>
        </>
      ),
    },
  ]

  const uploadProps = {
    action: '/upload.do',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList)
      }
    },
    showUploadList: {
      showRemoveIcon: true,
      // removeIcon: (
      //   <StarOutlined
      //     onClick={(e) => console.log(e, 'custom removeIcon event')}
      //   />
      // ),
    },
  }

  const createForm = (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      colon={false}
      initialValues={{
        ['input-number']: 3,
        ['checkbox-group']: ['A', 'B'],
        rate: 3.5,
      }}
    >
      <div className={styles.formTitle}>基础信息</div>

      <Form.Item
        label="客群名称"
        name="name1"
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入客群名称！',
          },
        ]}
      >
        <Input placeholder="请输入客群名称" allowClear />
      </Form.Item>
      <Form.Item
        label="客群描述"
        name="select2"
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入客群描述！',
          },
        ]}
      >
        <TextArea rows={4} allowClear placeholder="请输入客群描述" />
      </Form.Item>
      <Form.Item
        name="select"
        label="业务类型"
        hasFeedback
        rules={[
          {
            required: true,
            message: '请选择业务类型!',
          },
        ]}
      >
        <Select placeholder="请选择业务类型" allowClear>
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
        </Select>
      </Form.Item>
      <Form.Item
        // name="switch"
        label={<span>业务展示&nbsp;</span>}
        valuePropName="checked"
        tooltip={'若开启，则该客群信息将在客户视图-客户特征中进行展示'}
      >
        <Switch />
        <Tooltip
          title="若开启，则该客群信息将在客户视图-客户特征中进行展示"
          placement="right"
          overlayStyle={{}}
        >
          <QuestionCircleFilled
            style={{
              color: '#ccc',
              fontSize: 16,
              position: 'relative',
              left: 10,
              top: 3,
            }}
          />
        </Tooltip>
      </Form.Item>
      <Divider />

      <div className={styles.formTitle}>文件导入</div>
      <Row>
        <Col span={24}>
          1、导入规则：可根据客户的客户号进行导入，模板中填写客户的客户号。
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          2、操作步骤：整理好需要处理的客户清单——下载模板——上传文件——导入。。
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <a
            href="javascript:void(0)"
            style={{ textDecoration: 'underline', color: '#3196eb' }}
          >
            下载《导入数据模版》
          </a>
        </Col>
      </Row>
      <div className={styles.uploadButton}>
        <Form.Item
          name="upload"
          label=""
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
        >
          <Upload
            // name="logo"
            // action="/upload.do"
            // listType="picture"
            {...uploadProps}
          >
            <Button icon={<UploadOutlined />}>点击上传文件</Button>
          </Upload>
          <span className={styles.uploadTips}>
            注：支持CSV格式文件导入，客户数量不超过60万，文件大小不超过10M。
          </span>
        </Form.Item>
      </div>
    </Form>
  )
  const editForm = (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      colon={false}
      initialValues={{
        ['input-number']: 3,
        ['checkbox-group']: ['A', 'B'],
        rate: 3.5,
      }}
    >
      <div className={styles.formTitle}>基础信息</div>

      <Form.Item
        label="客群名称"
        name="name1"
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入客群名称！',
          },
        ]}
      >
        <Input placeholder="请输入客群名称" allowClear />
      </Form.Item>
      <Form.Item
        label="客群描述"
        name="select2"
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入客群描述！',
          },
        ]}
      >
        <TextArea rows={4} allowClear placeholder="请输入客群描述" />
      </Form.Item>
      <Form.Item
        name="select"
        label="业务类型"
        hasFeedback
        rules={[
          {
            required: true,
            message: '请选择业务类型!',
          },
        ]}
      >
        <Select placeholder="请选择业务类型" allowClear>
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
        </Select>
      </Form.Item>
      <Form.Item
        // name="switch"
        label={<span>业务展示&nbsp;</span>}
        valuePropName="checked"
      >
        <Switch />
        <Tooltip
          title="若开启，则该客群信息将在客户视图-客户特征中进行展示"
          placement="right"
          overlayStyle={{}}
        >
          <QuestionCircleFilled
            style={{
              color: '#ccc',
              fontSize: 16,
              position: 'relative',
              left: 10,
              top: 3,
            }}
          />
        </Tooltip>
      </Form.Item>
    </Form>
  )

  return (
    // <PageHeaderWrapper>
    <Card>
      <KequnModal
        title={'新增标签'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        xCancel={handleCancel}
        footer={null}
        width={600}
        contents={createForm}
      />
      <KequnModal
        title={'编辑标签'}
        visible={isEditModalVisible}
        onOk={() => {}}
        onCancel={handleEditCancel}
        xCancel={handleEditCancel}
        footer={null}
        width={600}
        contents={editForm}
      />
      <ConfirmModal
        title={'温馨提示'}
        visible={isdeleteModalVisible}
        onOk={() => {}}
        onCancel={hideDeleteModal}
        xCancel={hideDeleteModal}
        footer={null}
        contents={`确认删除${kequnName}标签吗？`}
        btnLeftText={'确认删除'}
        btnRightText={'取消'}
      />
      <ConfirmModal
        title={'温馨提示'}
        visible={isUnableModalVisible}
        onOk={() => {}}
        onCancel={hideUnableModal}
        xCancel={hideUnableModal}
        footer={null}
        contents={`确认禁用${kequnName}标签吗？`}
        btnLeftText={'确认禁用'}
        btnRightText={'取消'}
      />
      <ProTable
        className={styles.ProTable}
        scroll={{ x: 1300 }}
        actionRef={actionRef}
        rowKey="key"
        bordered={true}
        size={'small'}
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
        toolBarRender={() => [
          <div className={styles.buildClient}>
            <Button
              type="primary"
              onClick={() => {
                setIsModalVisible(true)
              }}
            >
              新增标签<div className={styles.Btndivider}></div>
            </Button>
          </div>,
        ]}
        search={{
          span: 6,
          resetText: '重置',
          searchText: '查询',
          collapsed: false,
          collapseRender: () => false,
        }}
      />
    </Card>
    // </PageHeaderWrapper>
  )
}

export default clientGroupList
