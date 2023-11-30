import request from '@/utils/request'

// 创建条码
export function createBarcode(data) {
  return request({
    url: '/wms/barcode/create',
    method: 'post',
    data: data
  })
}

// 更新条码
export function updateBarcode(data) {
  return request({
    url: '/wms/barcode/update',
    method: 'put',
    data: data
  })
}

// 删除条码
export function deleteBarcode(id,createTime) {
  return request({
    url: '/wms/barcode/delete?id=' + id+'&createTime='+createTime,
    method: 'delete'
  })
}

// 获得条码
export function getBarcode(id,createTime) {
  return request({
    url: '/wms/barcode/get?id=' + id+'&createTime='+createTime,
    method: 'get'
  })
}

// 获得条码分页
export function getBarcodePage(query) {
  return request({
    url: '/wms/barcode/page',
    method: 'get',
    params: query
  })
}

// 导出条码 Excel
export function exportBarcodeExcel(query) {
  return request({
    url: '/wms/barcode/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
