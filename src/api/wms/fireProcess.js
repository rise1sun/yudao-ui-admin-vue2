import request from '@/utils/request'

// 创建消防任务
export function createFireProcess(data) {
  return request({
    url: '/wms/fire-process/create',
    method: 'post',
    data: data
  })
}

// 更新消防任务
export function updateFireProcess(data) {
  return request({
    url: '/wms/fire-process/update',
    method: 'put',
    data: data
  })
}

// 删除消防任务
export function deleteFireProcess(id) {
  return request({
    url: '/wms/fire-process/delete?id=' + id,
    method: 'delete'
  })
}

// 获得消防任务
export function getFireProcess(id) {
  return request({
    url: '/wms/fire-process/get?id=' + id,
    method: 'get'
  })
}

// 获得消防任务分页
export function getFireProcessPage(query) {
  return request({
    url: '/wms/fire-process/page',
    method: 'get',
    params: query
  })
}

// 导出消防任务 Excel
export function exportFireProcessExcel(query) {
  return request({
    url: '/wms/fire-process/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
