/**
 * 获取员工的综合列表数据
 * ***/
import request from '@/utils/request'
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
