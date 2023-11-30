import request from '@/utils/request'

// 创建工艺流程
export function createFormula(data) {
  return request({
    url: '/wms/formula/create',
    method: 'post',
    data: data
  })
}

// 更新工艺流程
export function updateFormula(data) {
  return request({
    url: '/wms/formula/update',
    method: 'put',
    data: data
  })
}

// 删除工艺流程
export function deleteFormula(id) {
  return request({
    url: '/wms/formula/delete?id=' + id,
    method: 'delete'
  })
}

// 获得工艺流程
export function getFormula(id) {
  return request({
    url: '/wms/formula/get?id=' + id,
    method: 'get'
  })
}

export function handleItems(id){
  return request({
    url: '/wms/formulaItem/?id=' + id,
    method: 'get',
    params: query
  })
}

// 获得工艺流程分页
export function getFormulaPage(query) {
  return request({
    url: '/wms/formula/page',
    method: 'get',
    params: query
  })
}

// 导出工艺流程 Excel
export function exportFormulaExcel(query) {
  return request({
    url: '/wms/formula/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
