/**
 * Created by 芋道源码
 *
 * 数据字典工具类
 */
import store from '@/store'

export const DICT_TYPE = {
  USER_TYPE: 'user_type',
  COMMON_STATUS: 'common_status',
  TERMINAL: 'terminal',

  // ========== SYSTEM 模块 ==========
  SYSTEM_USER_SEX: 'system_user_sex',
  SYSTEM_MENU_TYPE: 'system_menu_type',
  SYSTEM_ROLE_TYPE: 'system_role_type',
  SYSTEM_DATA_SCOPE: 'system_data_scope',
  SYSTEM_NOTICE_TYPE: 'system_notice_type',
  SYSTEM_OPERATE_TYPE: 'system_operate_type',
  SYSTEM_LOGIN_TYPE: 'system_login_type',
  SYSTEM_LOGIN_RESULT: 'system_login_result',
  SYSTEM_SMS_CHANNEL_CODE: 'system_sms_channel_code',
  SYSTEM_SMS_TEMPLATE_TYPE: 'system_sms_template_type',
  SYSTEM_SMS_SEND_STATUS: 'system_sms_send_status',
  SYSTEM_SMS_RECEIVE_STATUS: 'system_sms_receive_status',
  SYSTEM_ERROR_CODE_TYPE: 'system_error_code_type',
  SYSTEM_OAUTH2_GRANT_TYPE: 'system_oauth2_grant_type',
  SYSTEM_MAIL_SEND_STATUS: 'system_mail_send_status',
  SYSTEM_NOTIFY_TEMPLATE_TYPE: 'system_notify_template_type',

  // ========== INFRA 模块 ==========
  INFRA_BOOLEAN_STRING: 'infra_boolean_string',
  INFRA_REDIS_TIMEOUT_TYPE: 'infra_redis_timeout_type',
  INFRA_JOB_STATUS: 'infra_job_status',
  INFRA_JOB_LOG_STATUS: 'infra_job_log_status',
  INFRA_API_ERROR_LOG_PROCESS_STATUS: 'infra_api_error_log_process_status',
  INFRA_CONFIG_TYPE: 'infra_config_type',
  INFRA_CODEGEN_TEMPLATE_TYPE: 'infra_codegen_template_type',
  INFRA_CODEGEN_FRONT_TYPE: 'infra_codegen_front_type',
  INFRA_CODEGEN_SCENE: 'infra_codegen_scene',
  INFRA_FILE_STORAGE: 'infra_file_storage',

  // ========== BPM 模块 ==========
  BPM_MODEL_CATEGORY: 'bpm_model_category',
  BPM_MODEL_FORM_TYPE: 'bpm_model_form_type',
  BPM_TASK_ASSIGN_RULE_TYPE: 'bpm_task_assign_rule_type',
  BPM_PROCESS_INSTANCE_STATUS: 'bpm_process_instance_status',
  BPM_PROCESS_INSTANCE_RESULT: 'bpm_process_instance_result',
  BPM_TASK_ASSIGN_SCRIPT: 'bpm_task_assign_script',
  BPM_OA_LEAVE_TYPE: 'bpm_oa_leave_type',

  // ========== PAY 模块 ==========
  PAY_CHANNEL_WECHAT_VERSION: 'pay_channel_wechat_version', // 微信渠道版本

  PAY_CHANNEL_CODE: 'pay_channel_code', // 支付渠道编码类型
  PAY_ORDER_STATUS: 'pay_order_status', // 商户支付订单状态
  PAY_REFUND_STATUS: 'pay_refund_status', // 退款订单状态
  PAY_NOTIFY_STATUS: 'pay_notify_status', // 商户支付回调状态
  PAY_NOTIFY_TYPE: 'pay_notify_type', // 商户支付回调状态

  // ========== MP 模块 ==========
  MP_AUTO_REPLY_REQUEST_MATCH: 'mp_auto_reply_request_match', // 自动回复请求匹配类型
  MP_MESSAGE_TYPE: 'mp_message_type', // 消息类型

  // ========== MALL - PRODUCT 模块 ==========
  PRODUCT_SPU_STATUS: 'product_spu_status', // 商品 SPU 状态

  // ========== MALL - ORDER 模块 ==========
  TRADE_AFTER_SALE_STATUS: 'trade_after_sale_status', // 售后 - 状态
  TRADE_AFTER_SALE_WAY: 'trade_after_sale_way', // 售后 - 方式
  TRADE_AFTER_SALE_TYPE: 'trade_after_sale_type', // 售后 - 类型
  TRADE_ORDER_TYPE: 'trade_order_type', // 订单 - 类型
  TRADE_ORDER_STATUS: 'trade_order_status', // 订单 - 状态
  TRADE_ORDER_ITEM_AFTER_SALE_STATUS: 'trade_order_item_after_sale_status', // 订单项 - 售后状态

  // ========== MALL - PROMOTION 模块 ==========
  PROMOTION_DISCOUNT_TYPE: 'promotion_discount_type', // 优惠类型
  PROMOTION_PRODUCT_SCOPE: 'promotion_product_scope', // 营销的商品范围
  PROMOTION_COUPON_TEMPLATE_VALIDITY_TYPE: 'promotion_coupon_template_validity_type', // 优惠劵模板的有限期类型
  PROMOTION_COUPON_STATUS: 'promotion_coupon_status', // 优惠劵的状态
  PROMOTION_COUPON_TAKE_TYPE: 'promotion_coupon_take_type', // 优惠劵的领取方式
  PROMOTION_ACTIVITY_STATUS: 'promotion_activity_status', // 优惠活动的状态
  PROMOTION_CONDITION_TYPE: 'promotion_condition_type', // 营销的条件类型枚举


  // ========== WMS - TRAY 模块 ==========
  WMS_TRAY_TYPE: "wms_tray_type", // 托盘类型
  WMS_TRAY_STATUS: "wms_tray_status", //托盘状态
  WMS_TRAY_TEST: "wms_tray_test", //测试托盘
  // ========== WMS - STORAGE 模块 ==========

  WMS_STORAGE_STATUS: "wms_storage_status", // 库位状态
  WMS_STORAGE_HAS_GOODS: "wms_storage_has_goods", //库位是否含有货物
  WMS_STORAGE_HAS_FIRE_CHANNEL: "wms_storage_has_fire_channel", //库位是否有消防通道
  WMS_FIRE_PROCESS_STATE: "wms_fire_process_state", //消防处理状态

  // ========== WMS - BARCODE 模块 ==========
  WMS_BARCODE_STATUS: "wms_barcode_status", //条码状态
  WMS_BARCODE_SOURCE: "wms_barcode_source", //条码来源
  WMS_BARCODE_TYPE: "wms_barcode_type", //条码状态

  // ========== WMS - FORMULA 模块 ==========
  WMS_FORMULA_STATUS: "wms_formula_status",
  WMS_FORMULA_TYPE: "wms_formula_type",
  // ========== WMS - FORMULA 模块 ==========
  WMS_FORMULA_ITEM_TYPE: "wms_formula_item_type",
  WMS_FORMULA_ITEM_STATUS: "wms_formula_item_status",
  WMS_UPLINK_SWITCH: "wms_uplink_switch",
  WMS_RESTING_TASK_STATUS: "wms_resting_task_status",
  // ========== WMS - BATCH 模块 ==========
  WMS_BATCH_STATUS: "wms_batch_status",

  // ========== WMS - task 模块 ==========
  WMS_TASK_STATUS: "wms_task_status",
  WMS_TASK_TYPE: "wms_task_type",

  // ========== WMS - traylog 模块 ==========
  WMS_TRAY_LOG_TYPE: "wms_tray_log_type",
  WMS_SERVICE_TYPE: "wms_service_type",


  WCS_TASK_TEMPLATE_CANCEL_STRATEGY: "wcs_task_template_cancel_strategy",
  WCS_TASK_TYPE: "wcs_task_type",
  WCS_NOTIFY_TASK: "wcs_notify_task",
  WCS_TASK_TRIGGER_TYPE: "wcs_task_trigger_type",
  WCS_THIRD_PROTOCOL_TYPE: "wcs_third_protocol_type",
  WCS_THIRD_REPORT_TYPE: "wcs_third_report_type",
  WCS_RELATE_DEVICE_TYPE: "wcs_relate_device_type",
  WCS_IS_CHANGE_LOAD: "wcs_is_change_load",
  WCS_TASK_LEVEL: "wcs_task_level",
  WCS_LINE_CONFIG_TYPE: "wcs_line_config_type",
  WCS_PLC_PROTOCOL_TYPE: "wcs_plc_protocol_type",
  WCS_DEVICE_TYPE: "wcs_device_type",
  WCS_SEGMENT_TYPE: "wcs_segment_type",
  WCS_TASK_STATE: "wcs_task_state",
  WCS_NODE_TYPE:"wcs_node_type",
  ALARM_LEVEL: "alarm_level",
  ALARM_TYPE: "alarm_type"
}

/**
 * 获取 dictType 对应的数据字典数组
 *
 * @param dictType 数据类型
 * @returns {*|Array} 数据字典数组
 */
export function getDictDatas(dictType) {
  return store.getters.dict_datas[dictType] || []
}

/**
 * 获取 dictType 对应的数据字典数组
 *
 * @param dictType 数据类型
 * @param values 数组、单个元素
 * @returns {*|Array} 数据字典数组
 */
export function getDictDatas2(dictType, values) {
  if (values === undefined) {
    return [];
  }
  // 如果是单个元素，则转换成数组
  if (!Array.isArray(values)) {
    values = [this.value];
  }
  // 获得字典数据
  const results = [];
  for (const value of values) {
    const dict = getDictData(dictType, value);
    if (dict) {
      results.push(dict);
    }
  }
  return results;
}

export function getDictData(dictType, value) {
  // 获取 dictType 对应的数据字典数组
  const dictDatas = getDictDatas(dictType)
  if (!dictDatas || dictDatas.length === 0) {
    return ''
  }
  // 获取 value 对应的展示名
  value = value + '' // 强制转换成字符串，因为 DictData 小类数值，是字符串
  for (const dictData of dictDatas) {
    if (dictData.value === value) {
      return dictData;
    }
  }
  return undefined
}

export function getDictDataLabel(dictType, value) {
  const dict = getDictData(dictType, value);
  return dict ? dict.label : '';
}
