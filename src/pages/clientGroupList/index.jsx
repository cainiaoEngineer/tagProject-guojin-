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
  const [kequnName, setKqName] = useState('')
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  const showModal = () => {
    setIsModalVisible(true)
  }

  const showEditModal = () => {
    setEditIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleEditOk = () => {
    setEditIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleEditCancel = () => {
    setEditIsModalVisible(false)
  }
  const hideDeleteModal = () => {
    setDeleteModalVisible(false)
  }
  const columns = [
    {
      title: '客群编号',
      align: 'center',
      dataIndex: 'groupId',
      hideInSearch: true,
    },
    {
      title: '客群名称',
      align: 'center',
      dataIndex: 'name',
      order: 8,
      formItemProps: {
        placeholder: '请输入客群名称查询',
        allowClear: true,
      },
    },
    {
      title: '客群描述',
      align: 'center',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '客户数量',
      align: 'center',
      dataIndex: 'clientTotalNum',
      hideInSearch: true,
    },
    {
      title: '资金账号',
      align: 'center',
      order: 7,
      dataIndex: 'clientId',
      hideInTable: true,
      formItemProps: {
        placeholder: '请输入客户资金账号',
        allowClear: true,
      },
    },
    {
      title: '客群类型',
      align: 'center',
      order: 6,
      dataIndex: 'groupType',
      valueEnum: {
        1: { text: '全部' },
        2: { text: '静态客群' },
        3: { text: '动态客群' },
      },
      formItemProps: {
        defaultValue: '全部',
        placeholder: '请选择客群类型',
      },
    },
    {
      title: '业务类型',
      align: 'center',
      order: 5,
      dataIndex: 'businessType',
      valueEnum: {
        1: { text: '全部' },
        2: { text: '小宝配置' },
        3: { text: '营销活动' },
        4: { text: '系统配置' },
        5: { text: '其他客群' },
      },
      formItemProps: {
        defaultValue: '全部',
        placeholder: '请选择业务类型',
      },
    },
    {
      title: '业务展示',
      align: 'center',
      order: 3,
      dataIndex: 'businessShow',
      valueEnum: {
        1: { text: '全部' },
        2: { text: '展示' },
        3: { text: '不展示' },
      },
      formItemProps: {
        defaultValue: '全部',
        placeholder: '请选择业务展示',
      },
    },
    {
      title: '创建类型',
      align: 'center',
      order: 4,
      dataIndex: 'type',
      valueEnum: {
        1: { text: '全部' },
        2: { text: '文件导入' },
        3: { text: '条件筛选' },
      },
      formItemProps: {
        defaultValue: '全部',
        placeholder: '请选择创建类型',
      },
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
      width: 100,
      render: (text, record) => (
        <>
          <a
            onClick={() => {
              showEditModal()
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

  const typeContent = (
    <div className={styles.BtnSelect}>
      <div className={styles.Btn1}>条件筛选</div>
      <div
        onClick={() => {
          showModal()
        }}
        className={styles.Btn2}
      >
        文件导入
      </div>
    </div>
  )
  return (
    // <PageHeaderWrapper>
    <Card>
      <KequnModal
        title={'创建客群'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={600}
        contents={createForm}
      />
      <KequnModal
        title={'编辑客群'}
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={null}
        width={600}
        contents={editForm}
      />
      <Modal
        visible={isdeleteModalVisible}
        footer={null}
        closable={false}
        onCancel={hideDeleteModal}
        className={styles.confirmModal}
      >
        <div
          style={{ textAlign: 'center', marginTop: 16 }}
        >{`确认删除${kequnName}客群吗？`}</div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Button type="primary" style={{ marginRight: 20 }}>
            确认删除
          </Button>
          <Button
            type="default"
            style={{ marginLeft: 20 }}
            onClick={hideDeleteModal}
          >
            取消
          </Button>
        </div>
      </Modal>
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
            <Popover trigger="click" content={typeContent} placement="bottom">
              <Button type="primary" icon={<CaretDownOutlined />}>
                创建客群<div className={styles.Btndivider}></div>
              </Button>
            </Popover>
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
