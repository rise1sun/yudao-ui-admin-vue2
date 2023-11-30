import request from '@/utils/request'

// 创建月份条码
export function createTimeTableName(data) {
  return request({
    url: '/wms/time-table-name/create',
    method: 'post',
    data: data
  })
}

// 更新月份条码
export function updateTimeTableName(data) {
  return request({
    url: '/wms/time-table-name/update',
    method: 'put',
    data: data
  })
}

// 删除月份条码
export function deleteTimeTableName(id) {
  return request({
    url: '/wms/time-table-name/delete?id=' + id,
    method: 'delete'
  })
}

// 获得月份条码
export function getTimeTableName(id) {
  return request({
    url: '/wms/time-table-name/get?id=' + id,
    method: 'get'
  })
}

// 获得月份条码分页
export function getTimeTableNamePage(query) {
  return request({
    url: '/wms/time-table-name/page',
    method: 'get',
    params: query
  })
}

// 导出月份条码 Excel
export function exportTimeTableNameExcel(query) {
  return request({
    url: '/wms/time-table-name/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
