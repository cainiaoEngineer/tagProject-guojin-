/*
 * @Author: your name
 * @Date: 2020-08-28 15:24:40
 * @LastEditTime: 2020-08-28 15:24:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \weath\src\pages\orderInfo\costInfo\costDetail\service.js
 */
import request from '@/utils/request'

export async function queryRule(params) {
  return request('/api/rule', {
    params,
  })
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  })
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  })
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  })
}
