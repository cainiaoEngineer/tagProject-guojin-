/*
 * @Author: your name
 * @Date: 2020-08-26 14:27:45
 * @LastEditTime: 2020-09-15 10:43:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \weath\src\pages\orderInfo\service.js
 */
import request from '@/utils/request'
// import request from 'umi-request'
import baseUrl from '@/utils/testEnv'
export async function queryRule(params) {
  return request(`/api/rule`, {
    params,
  })
}

export async function removeRule(params) {
  return request(`${baseUrl}/api/rule`, {
    method: 'POST',
    data: { ...params, method: 'delete' },
  })
}
export async function addRule(params) {
  return request(`${baseUrl}/api/rule`, {
    method: 'POST',
    data: { ...params, method: 'post' },
  })
}
export async function updateRule(params) {
  return request(`${baseUrl}/api/rule`, {
    method: 'POST',
    data: { ...params, method: 'update' },
  })
}
