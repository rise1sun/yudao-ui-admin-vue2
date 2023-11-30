import request from '@/utils/request'

// 创建托盘
export function createTray(data) {
  return request({
    url: '/wms/tray/create',
    method: 'post',
    data: data
  })
}

// 更新托盘
export function updateTray(data) {
  return request({
    url: '/wms/tray/update',
    method: 'put',
    data: data
  })
}

// 删除托盘
export function deleteTray(id) {
  return request({
    url: '/wms/tray/delete?id=' + id,
    method: 'delete'
  })
}

// 获得托盘
export function getTray(id) {
  return request({
    url: '/wms/tray/get?id=' + id,
    method: 'get'
  })
}

// 获得托盘分页
export function getTrayPage(query) {
  return request({
    url: '/wms/tray/page',
    method: 'get',
    params: query
  })
}

// 导出托盘 Excel
export function exportTrayExcel(query) {
  return request({
    url: '/wms/tray/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

// 下载托盘导入模板
export function importTemplate() {
  return request({
    url: '/wms/tray/get-import-template',
    method: 'get',
    responseType: 'blob'
  })
}
