import request from '@/utils/request'

// 创建批次
export function createBatch(data) {
  return request({
    url: '/wms/batch/create',
    method: 'post',
    data: data
  })
}

// 更新批次
export function updateBatch(data) {
  return request({
    url: '/wms/batch/update',
    method: 'put',
    data: data
  })
}

// 删除批次
export function deleteBatch(id) {
  return request({
    url: '/wms/batch/delete?id=' + id,
    method: 'delete'
  })
}

// 获得批次
export function getBatch(id) {
  return request({
    url: '/wms/batch/get?id=' + id,
    method: 'get'
  })
}

// 获得批次分页
export function getBatchPage(query) {
  return request({
    url: '/wms/batch/page',
    method: 'get',
    params: query
  })
}

// 导出批次 Excel
export function exportBatchExcel(query) {
  return request({
    url: '/wms/batch/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
export function getFormulas(){
  return request({
    url: '/wms/formula/getFormulas',
    method: 'get'
  })
}


