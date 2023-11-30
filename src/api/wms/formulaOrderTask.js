import request from '@/utils/request'

// 创建工艺流程订单任务
export function createFormulaOrderTask(data) {
  return request({
    url: '/wms/formula-order-task/create',
    method: 'post',
    data: data
  })
}

// 更新工艺流程订单任务
export function updateFormulaOrderTask(data) {
  return request({
    url: '/wms/formula-order-task/update',
    method: 'put',
    data: data
  })
}

// 删除工艺流程订单任务
export function deleteFormulaOrderTask(id) {
  return request({
    url: '/wms/formula-order-task/delete?id=' + id,
    method: 'delete'
  })
}

// 获得工艺流程订单任务
export function getFormulaOrderTask(id) {
  return request({
    url: '/wms/formula-order-task/get?id=' + id,
    method: 'get'
  })
}

// 获得工艺流程订单任务分页
export function getFormulaOrderTaskPage(query) {
  return request({
    url: '/wms/formula-order-task/page',
    method: 'get',
    params: query
  })
}

// 导出工艺流程订单任务 Excel
export function exportFormulaOrderTaskExcel(query) {
  return request({
    url: '/wms/formula-order-task/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
