<template>
  <div class="app-container">

    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="条码号" prop="barcode" label-width="68px">
        <el-input v-model="queryParams.barcode" placeholder="请输入条码号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="数据来源" prop="dataSource">
        <el-input v-model="queryParams.dataSource" placeholder="请输入数据来源" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="规格" prop="spec">
        <el-input v-model="queryParams.spec" placeholder="请输入规格" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="库区" prop="area">
        <el-input v-model="queryParams.area" placeholder="请输入库区" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="库位" prop="storage">
        <el-input v-model="queryParams.storage" placeholder="请输入库位" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="条码状态" prop="barcodeStatus" label-width="68px">
        <el-select v-model="queryParams.barcodeStatus" placeholder="请选择条码状态" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_BARCODE_STATUS)"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="托盘条码" prop="trayId" label-width="68px">
        <el-input v-model="queryParams.trayId" placeholder="请输入托盘条码" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
<!--      <el-form-item label="当前工艺流程编号" prop="formulaItemId">
        <el-input v-model="queryParams.formulaItemId" placeholder="请输入当前工艺流程编号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="ng点位" prop="ngSite">
        <el-input v-model="queryParams.ngSite" placeholder="请输入ng点位" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="复测记录标记" prop="retest">
        <el-input v-model="queryParams.retest" placeholder="请输入复测记录标记" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="工艺流程id" prop="formulaId">
        <el-input v-model="queryParams.formulaId" placeholder="请输入工艺流程id" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="托盘条码" prop="trayId" label-width="68px">
        <el-input v-model="queryParams.trayId" placeholder="请输入托盘条码" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="通道号" prop="channelIndex">
        <el-input v-model="queryParams.channelIndex" placeholder="请输入通道号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="批次id" prop="batchId">
        <el-input v-model="queryParams.batchId" placeholder="请输入批次id" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="关联电芯号" prop="batteryId">
        <el-input v-model="queryParams.batteryId" placeholder="请输入关联电芯号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
<!--      <el-form-item label="设备名" prop="cabName">
        <el-input v-model="queryParams.cabName" placeholder="请输入设备名" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
      <el-form-item label="是否锁定" prop="isLocked" >
        <el-select v-model="queryParams.isLocked" placeholder="请选择是否锁定" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_BARCODE_IS_LOCK)"
                     :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="MES生产订单号" prop="mesProductionNumber" label-width="120px">
        <el-input v-model="queryParams.mesProductionNumber" placeholder="请输入MES生产订单号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="客户编号" prop="customerNumber">
        <el-input v-model="queryParams.customerNumber" placeholder="请输入客户编号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
<!--      <el-form-item label="备注" prop="remark">
        <el-input v-model="queryParams.remark" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作工具栏 -->
    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
                   v-hasPermi="['wms:barcode:create']">新增</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wms:barcode:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 列表 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="条码id" align="center" prop="id" />
      <el-table-column label="条码号" align="center" prop="barcode" />
      <el-table-column label="数据来源" align="center" prop="dataSource" />
<!--      <el-table-column label="规格" align="center" prop="spec" />-->
      <el-table-column label="库区" align="center" prop="area" />
      <el-table-column label="库位" align="center" prop="storage" />
      <el-table-column label="条码状态" align="center" prop="barcodeStatus">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_BARCODE_STATUS" :value="scope.row.barcodeStatus" />
        </template>
      </el-table-column>
      <el-table-column label="工艺节点" align="center" prop="formulaItemName" />
      <el-table-column label="ng点位" align="center" prop="ngSite" />
      <el-table-column label="复测记录标记" align="center" prop="retest" />
      <el-table-column label="工艺流程" align="center" prop="formulaName" />
      <el-table-column label="托盘条码" align="center" prop="trayId" />
      <el-table-column label="通道号" align="center" prop="channelIndex" />
      <el-table-column label="批次" align="center" prop="batchName" />
<!--      <el-table-column label="关联电芯号" align="center" prop="batteryId" />-->
<!--      <el-table-column label="设备名" align="center" prop="cabName" />-->
      <el-table-column label="是否锁定" align="center" prop="isLocked" />
<!--      <el-table-column label="MES生产订单号" align="center" prop="mesProductionNumber" />
      <el-table-column label="客户编号" align="center" prop="customerNumber" />-->
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template v-slot="scope">
        <span> {{parseTime(scope.row.createTime)}} </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['wms:barcode:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wms:barcode:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>

    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="title" :visible.sync="open" width="500px" v-dialogDrag append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="条码号" prop="barcode">
          <el-input v-model="form.barcode" placeholder="请输入条码号" />
        </el-form-item>
        <el-form-item label="数据来源" prop="dataSource">
          <el-input v-model="form.dataSource" placeholder="请输入数据来源" />
        </el-form-item>
        <el-form-item label="规格" prop="spec">
          <el-input v-model="form.spec" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="库区" prop="area">
          <el-input v-model="form.area" placeholder="请输入库区" />
        </el-form-item>
        <el-form-item label="库位" prop="storage">
          <el-input v-model="form.storage" placeholder="请输入库位" />
        </el-form-item>
        <el-form-item label="条码状态" prop="barcodeStatus">
          <el-select v-model="form.barcodeStatus" placeholder="请选择条码状态">
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_BARCODE_STATUS)"
                       :key="parseInt(dict.value)" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
<!--        <el-form-item label="工艺流程节点" prop="formulaItemId">
          <el-input v-model="form.formulaItemId" placeholder="请输入当前工艺流程编号" />
        </el-form-item>-->
        <el-form-item label="ng点位" prop="ngSite">
          <el-input v-model="form.ngSite" placeholder="请输入ng点位" />
        </el-form-item>
        <el-form-item label="复测记录标记" prop="retest">
          <el-input v-model="form.retest" placeholder="请输入复测记录标记" />
        </el-form-item>
<!--        <el-form-item label="工艺流程" prop="formulaId">
          <el-input v-model="form.formulaId" placeholder="请输入工艺流程id" />
        </el-form-item>-->
        <el-form-item label="托盘条码" prop="trayId">
          <el-input v-model="form.trayId" placeholder="请输入托盘条码" />
        </el-form-item>
        <el-form-item label="通道号" prop="channelIndex">
          <el-input v-model="form.channelIndex" placeholder="请输入通道号" />
        </el-form-item>
<!--        <el-form-item label="批次" prop="batchId">
          <el-input v-model="form.batchId" placeholder="请输入批次id" />
        </el-form-item>-->
<!--        <el-form-item label="关联电芯号" prop="batteryId">
          <el-input v-model="form.batteryId" placeholder="请输入关联电芯号" />
        </el-form-item>-->
<!--        <el-form-item label="设备名" prop="cabName">
          <el-input v-model="form.cabName" placeholder="请输入设备名" />
        </el-form-item>-->
        <el-form-item label="是否锁定" prop="isLocked">
          <el-radio-group v-model="form.isLocked">
            <el-select v-model="form.isLocked" placeholder="请选择是否锁定" clearable size="small">
              <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_BARCODE_IS_LOCK)"
                         :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"/>
            </el-select>
          </el-radio-group>
        </el-form-item>
<!--        <el-form-item label="MES生产订单号" prop="mesProductionNumber">
          <el-input v-model="form.mesProductionNumber" placeholder="请输入MES生产订单号" />
        </el-form-item>
        <el-form-item label="客户编号" prop="customerNumber">
          <el-input v-model="form.customerNumber" placeholder="请输入客户编号" />
        </el-form-item>-->
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item class="hidden-field" label="创建时间" prop="createTime">
          <el-date-picker v-model="form.createTime" type="datetime" placeholder="请选择创建时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createBarcode, updateBarcode, deleteBarcode, getBarcode, getBarcodePage, exportBarcodeExcel } from "@/api/wms/barcode";

export default {
  name: "Barcode",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 条码列表
      list: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        barcode: null,
        dataSource: null,
        spec: null,
        area: null,
        storage: null,
        barcodeStatus: null,
        formulaItemName: null,
        ngSite: null,
        retest: null,
        formulaName: null,
        trayId: null,
        channelIndex: null,
        batchName: null,
        batteryId: null,
        cabName: null,
        isLocked: null,
        mesProductionNumber: null,
        customerNumber: null,
        remark: null,
        createTime: [],
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        barcode: [{ required: true, message: "条码号不能为空", trigger: "blur" }],
        dataSource: [{ required: true, message: "数据来源不能为空", trigger: "blur" }],
        spec: [{ required: true, message: "规格不能为空", trigger: "blur" }],
        area: [{ required: true, message: "库区不能为空", trigger: "blur" }],
        storage: [{ required: true, message: "库位不能为空", trigger: "blur" }],
        barcodeStatus: [{ required: true, message: "条码状态不能为空", trigger: "change" }],
       /*  mesProductionNumber: [{ required: true, message: "MES生产订单号不能为空", trigger: "blur" }],
        customerNumber: [{ required: true, message: "客户编号不能为空", trigger: "blur" }], */
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      // 执行查询
      getBarcodePage(this.queryParams).then(response => {
        this.list = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    /** 取消按钮 */
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 表单重置 */
    reset() {
      this.form = {
        id: undefined,
        barcode: undefined,
        dataSource: undefined,
        spec: undefined,
        area: undefined,
        storage: undefined,
        barcodeStatus: undefined,
        formulaItemName: undefined,
        ngSite: undefined,
        retest: undefined,
        formulaName: undefined,
        trayId: undefined,
        channelIndex: undefined,
        batchName: undefined,
        batteryId: undefined,
        cabName: undefined,
        isLocked: undefined,
        mesProductionNumber: undefined,
        customerNumber: undefined,
        remark: undefined,
        createTime: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加条码";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      const createTime = row.createTime;
      getBarcode(id,createTime).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改条码";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return;
        }
        // 修改的提交
        if (this.form.id != null) {
          updateBarcode(this.form).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
          return;
        }
        // 添加的提交
        createBarcode(this.form).then(response => {
          this.$modal.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id;
      const createTime = row.createTime;
      this.$modal.confirm('是否确认删除条码编号为"' + id + '"的数据项?').then(function() {
          return deleteBarcode(id,createTime);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      // 处理查询参数
      let params = {...this.queryParams};
      params.pageNo = undefined;
      params.pageSize = undefined;
      this.$modal.confirm('是否确认导出所有条码数据项?').then(() => {
          this.exportLoading = true;
          return exportBarcodeExcel(params);
        }).then(response => {
          this.$download.excel(response, '条码.xls');
          this.exportLoading = false;
        }).catch(() => {});
    }
  }

};
</script>
<style>
.hidden-field {
  display: none;
}
</style>

