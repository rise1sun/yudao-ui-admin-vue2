import request from '@/utils/request'

// 创建静置任务信息
export function createRestingTask(data) {
  return request({
    url: '/wms/resting-task/create',
    method: 'post',
    data: data
  })
}

// 更新静置任务信息
export function updateRestingTask(data) {
  return request({
    url: '/wms/resting-task/update',
    method: 'put',
    data: data
  })
}

// 删除静置任务信息
export function deleteRestingTask(id) {
  return request({
    url: '/wms/resting-task/delete?id=' + id,
    method: 'delete'
  })
}

// 获得静置任务信息
export function getRestingTask(id) {
  return request({
    url: '/wms/resting-task/get?id=' + id,
    method: 'get'
  })
}

// 获得静置任务信息分页
export function getRestingTaskPage(query) {
  return request({
    url: '/wms/resting-task/page',
    method: 'get',
    params: query
  })
}

// 导出静置任务信息 Excel
export function exportRestingTaskExcel(query) {
  return request({
    url: '/wms/resting-task/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
