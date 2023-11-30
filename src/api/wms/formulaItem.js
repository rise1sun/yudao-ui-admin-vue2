import request from '@/utils/request'

// 创建工艺流程节点
export function createFormulaItem(data) {
  return request({
    url: '/wms/formula-item/create',
    method: 'post',
    data: data
  })
}

// 更新工艺流程节点
export function updateFormulaItem(data) {
  return request({
    url: '/wms/formula-item/update',
    method: 'put',
    data: data
  })
}

// 删除工艺流程节点
export function deleteFormulaItem(id) {
  return request({
    url: '/wms/formula-item/delete?id=' + id,
    method: 'delete'
  })
}
export function getFormulaItemList(){
  return request({
    url: '/wms/formula-item/getList',
    method: 'get'
  })
}

// 获得工艺流程节点
export function getFormulaItem(id) {
  return request({
    url: '/wms/formula-item/get?id=' + id,
    method: 'get'
  })
}

// 获得工艺流程节点分页
export function getFormulaItemPage(query) {
  return request({
    url: '/wms/formula-item/page',
    method: 'get',
    params: query
  })
}

// 导出工艺流程节点 Excel
export function exportFormulaItemExcel(query) {
  return request({
    url: '/wms/formula-item/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
