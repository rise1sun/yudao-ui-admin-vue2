import request from '@/utils/request'

// 创建库位
export function createStorage(data) {
  return request({
    url: '/wms/storage/create',
    method: 'post',
    data: data
  })
}

// 更新库位
export function updateStorage(data) {
  return request({
    url: '/wms/storage/update',
    method: 'put',
    data: data
  })
}

// 删除库位
export function deleteStorage(id) {
  return request({
    url: '/wms/storage/delete?id=' + id,
    method: 'delete'
  })
}

// 获得库位
export function getStorage(id) {
  return request({
    url: '/wms/storage/get?id=' + id,
    method: 'get'
  })
}

export function getAreaLists() {
  return request({
    url: '/wms/storage/getArealist',
    method: 'get'
  })
}
// 获得库位分页
export function getStoragePage(query) {
  return request({
    url: '/wms/storage/page',
    method: 'get',
    params: query
  })
}

// 导出库位 Excel
export function exportStorageExcel(query) {
  return request({
    url: '/wms/storage/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
