import request from '@/utils/request'

// 创建wms托盘日志记录
export function createTrayLog(data) {
  return request({
    url: '/wms/tray-log/create',
    method: 'post',
    data: data
  })
}

// 更新wms托盘日志记录
export function updateTrayLog(data) {
  return request({
    url: '/wms/tray-log/update',
    method: 'put',
    data: data
  })
}

// 删除wms托盘日志记录
export function deleteTrayLog(id) {
  return request({
    url: '/wms/tray-log/delete?id=' + id,
    method: 'delete'
  })
}

// 获得wms托盘日志记录
export function getTrayLog(id) {
  return request({
    url: '/wms/tray-log/get?id=' + id,
    method: 'get'
  })
}

// 获得wms托盘日志记录分页
export function getTrayLogPage(query) {
  return request({
    url: '/wms/tray-log/page',
    method: 'get',
    params: query
  })
}

// 导出wms托盘日志记录 Excel
export function exportTrayLogExcel(query) {
  return request({
    url: '/wms/tray-log/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
