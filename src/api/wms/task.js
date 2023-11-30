import request from '@/utils/request'

// 创建任务管理
export function createTask(data) {
  return request({
    url: '/wms/task/create',
    method: 'post',
    data: data
  })
}

// 更新任务管理
export function updateTask(data) {
  return request({
    url: '/wms/task/update',
    method: 'put',
    data: data
  })
}

// 删除任务管理
export function deleteTask(id) {
  return request({
    url: '/wms/task/delete?id=' + id,
    method: 'delete'
  })
}

// 获得任务管理
export function getTask(id) {
  return request({
    url: '/wms/task/get?id=' + id,
    method: 'get'
  })
}

// 获得任务管理
export function executeTask(id) {
  return request({
    url: '/wms/task/executeTask?id=' + id,
    method: 'get'
  })
}

// 获得任务管理分页
export function getTaskPage(query) {
  return request({
    url: '/wms/task/page',
    method: 'get',
    params: query
  })
}

// 导出任务管理 Excel
export function exportTaskExcel(query) {
  return request({
    url: '/wms/task/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
