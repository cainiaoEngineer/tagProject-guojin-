/*
 * @Author: zqh
 * @Date: 2021-02-02 10:51:53
 * @LastEditors: zqh
 * @LastEditTime: 2021-02-03 11:00:13
 * @Description: file content
 * @FilePath: \weath\src\pages\tagDetail\tbColumns.js
 */
import { Link } from 'umi'
import RemoteSelect from '@/components/RemoteSelect'

const columns = [
  {
    title: '',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInTable: true,
    // render: () => <RemoteSelect placeholder="请输入客户姓名/资金账号" />,
    renderFormItem: () => (
      <RemoteSelect
        noAll={false}
        placeholder="请输入客户姓名/资金账号"
        params={JSON.stringify({
          name: 1,
        })}
        dataUrl="/clientGroups/ dictionaryQuery"
        option={{ key: '', label: '', value: '' }}
      />
    ),
  },
  {
    title: '客户姓名',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInSearch: true,
  },
  {
    title: '资金账号',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInSearch: true,
  },
  {
    title: '客户贡献（M）',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInSearch: true,
  },
  {
    title: '客户星级',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInSearch: true,
  },
  {
    title: '风险等级',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInSearch: true,
  },
  {
    title: '服务团队',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInSearch: true,
  },
  {
    title: '归属营业部',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInSearch: true,
  },
  {
    title: '开户营业部',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInSearch: true,
  },
  {
    title: '已签约服务产品',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInSearch: true,
  },
  {
    title: '产品类别',
    align: 'center',
    dataIndex: 'orderId',
    //   tip: '规则名称是唯一的 key',
    hideInSearch: true,
  },
]

export { columns }
