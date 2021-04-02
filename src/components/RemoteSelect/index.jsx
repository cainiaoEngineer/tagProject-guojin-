import { Select, message } from 'antd'
import React, { useState, useEffect, forwardRef } from 'react'
import { ModeOption } from 'antd/lib/select'
import styles from './index.less'
import { set } from 'lodash'
const RemoteSelect = forwardRef((props, ref) => {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(props.value)
  const { dispatch } = props

  console.log('props, ref', props, ref)

  const dropdownMatchSelectWidth = false

  function onChange(value) {
    setValue(value)
    if (props.onChange) {
      props.onChange(value)
    }
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useEffect(() => {
    if (props.dataUrl && dispatch) {
      setLoading(true)
      dispatch({}) //发请求
    }
  })

  return (
    <Select
      disabled={props.disabled}
      style={{ width: props.width }}
      mode={props.mode || 'default'}
      loading={loading}
      placeholder={props.placeholder}
      value={value}
      onChange={onChange}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      getPopupContainer={() => {
        document.getElementById('mainContainer')
      }}
      defaultValue={!props.noAll ? '' : null}
    >
      {!props.noAll ? (
        <Option key="all" value="">
          全部
        </Option>
      ) : null}
      {options.map((option) => (
        <Option
          key={option[props.option.key]}
          value={option[props.option.value]}
        >
          {option[props.option.label]}
        </Option>
      ))}
    </Select>
  )
})
export default RemoteSelect
