<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="条码号" prop="barcode">
        <el-input v-model="queryParams.barcode" placeholder="请输入条码号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
<!--      <el-form-item label="数据来源" prop="dataSource">
        <el-input v-model="queryParams.dataSource" placeholder="请输入数据来源" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
<!--      <el-form-item label="规格型号" prop="spec">
        <el-input v-model="queryParams.spec" placeholder="请输入规格型号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="queryParams.type" placeholder="请输入类型" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
      <el-form-item label="库位" prop="storage">
        <el-input v-model="queryParams.storage" placeholder="请输入库位" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="库区" prop="area">
        <el-input v-model="queryParams.area" placeholder="请输入库区" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="托盘号" prop="tray">
        <el-input v-model="queryParams.tray" placeholder="请输入托盘号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="条码状态" prop="barcodeStatus">
        <el-select v-model="queryParams.barcodeStatus" placeholder="请选择条码状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="工艺流程id" prop="formulaId">
        <el-input v-model="queryParams.formulaId" placeholder="请输入工艺流程id" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="工艺流程名称" prop="formulaName">
        <el-input v-model="queryParams.formulaName" placeholder="请输入工艺流程名称" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="工艺子节点编号" prop="formulaItemId">
        <el-input v-model="queryParams.formulaItemId" placeholder="请输入工艺子节点编号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="工艺节点名称" prop="formulaItemName">
        <el-input v-model="queryParams.formulaItemName" placeholder="请输入工艺节点名称" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
<!--      <el-form-item label="ng点位" prop="ngSite">
        <el-input v-model="queryParams.ngSite" placeholder="请输入ng点位" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
<!--      <el-form-item label="复测记录标记" prop="retestMarkers">
        <el-input v-model="queryParams.retestMarkers" placeholder="请输入复测记录标记" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
<!--      <el-form-item label="通道号" prop="channelIndex">
        <el-input v-model="queryParams.channelIndex" placeholder="请输入通道号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
<!--      <el-form-item label="批次id" prop="batchId">
        <el-input v-model="queryParams.batchId" placeholder="请输入批次id" clearable @keyup.enter.native="handleQuery"/>
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
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="openForm(undefined)"
                   v-hasPermi="['wms:barcode:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wms:barcode:export']">导出</el-button>
      </el-col>
              <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

            <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
<!--            <el-table-column label="条码id" align="center" prop="id" />-->
      <el-table-column label="条码号" align="center" prop="barcode" />
      <el-table-column label="数据来源" align="center" prop="dataSource" />
      <el-table-column label="规格型号" align="center" prop="spec" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="库区" align="center" prop="area" />
      <el-table-column label="库位" align="center" prop="storage" />
      <el-table-column label="托盘号" align="center" prop="tray" />
      <el-table-column label="条码状态" align="center" prop="barcodeStatus" />
<!--      <el-table-column label="工艺流程id" align="center" prop="formulaId" />-->
      <el-table-column label="流程名称" align="center" prop="formulaName" />
<!--      <el-table-column label="工艺子节点编号" align="center" prop="formulaItemId" />-->
      <el-table-column label="节点名称" align="center" prop="formulaItemName" />
      <el-table-column label="ng点位" align="center" prop="ngSite" />
      <el-table-column label="复测标记" align="center" prop="retestMarkers" />
      <el-table-column label="通道号" align="center" prop="channelIndex" />
      <el-table-column label="批次" align="center" prop="batchId" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="openForm(scope.row.id)"
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
    <BarcodeForm ref="formRef" @success="getList" />
    </div>
</template>

<script>
import * as BarcodeApi from '@/api/wms/barcode';
import BarcodeForm from './BarcodeForm.vue';
export default {
  name: "Barcode",
  components: {
          BarcodeForm,
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
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 选中行
      currentRow: {},
      // 查询参数
      queryParams: {
                    pageNo: 1,
            pageSize: 10,
        barcode: null,
        dataSource: null,
        spec: null,
        type: null,
        area: null,
        tray: null,
        barcodeStatus: null,
        formulaId: null,
        formulaName: null,
        formulaItemId: null,
        formulaItemName: null,
        ngSite: null,
        retestMarkers: null,
        channelIndex: null,
        batchId: null,
        remark: null,
        createTime: [],
        storage: null,
      },
            };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    async getList() {
      try {
      this.loading = true;
              const res = await BarcodeApi.getBarcodePage(this.queryParams);
        this.list = res.data.list;
        this.total = res.data.total;
      } finally {
        this.loading = false;
      }
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
    /** 添加/修改操作 */
    openForm(id) {
      this.$refs["formRef"].open(id);
    },
    /** 删除按钮操作 */
    async handleDelete(row) {
      const id = row.id;
      await this.$modal.confirm('是否确认删除条码编号为"' + id + '"的数据项?')
      try {
       await BarcodeApi.deleteBarcode(id);
       await this.getList();
       this.$modal.msgSuccess("删除成功");
      } catch {}
    },
    /** 导出按钮操作 */
    async handleExport() {
      await this.$modal.confirm('是否确认导出所有条码数据项?');
      try {
        this.exportLoading = true;
        const res = await BarcodeApi.exportBarcodeExcel(this.queryParams);
        this.$download.excel(res.data, '条码.xls');
      } catch {
      } finally {
        this.exportLoading = false;
      }
    },
              }
};
</script>
