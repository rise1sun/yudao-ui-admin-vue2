<template>
  <div class="app-container">

    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="托盘号" prop="trayNo">
        <el-input v-model="queryParams.trayNo" placeholder="请输入托盘号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="日志类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择日志类型" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_TRAY_LOG_TYPE)"
                     :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务类型" prop="serviceType">
        <el-select v-model="queryParams.serviceType" placeholder="请选择业务类型" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_SERVICE_TYPE) " :label="dict.label"
                     :key="dict.value" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="wcs调度号" prop="dispatchTaskNumber" label-width="88px">
        <el-input v-model="queryParams.dispatchTaskNumber" placeholder="请输入wcs调度任务号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
<!--      <el-form-item label="调用结果" prop="result">
        <el-input v-model="queryParams.result" placeholder="请输入0失败 1成功" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="调用方" prop="caller">
        <el-input v-model="queryParams.caller" placeholder="请输入接口调用方" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="被调用方" prop="callee">
        <el-input v-model="queryParams.callee" placeholder="请输入接口被调用方" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
<!--      <el-form-item label="方法名称" prop="methodName">
        <el-input v-model="queryParams.methodName" placeholder="请输入方法名称" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
<!--      <el-form-item label="请求参数" prop="requestParameters">
        <el-input v-model="queryParams.requestParameters" placeholder="请输入请求参数" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
<!--      <el-form-item label="返回结果" prop="responseResults">
        <el-input v-model="queryParams.responseResults" placeholder="请输入返回结果" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>-->
      <el-form-item label="起始库位" prop="startStorage">
        <el-input v-model="queryParams.startStorage" placeholder="请输入起始库位" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="结束库位" prop="endStorage">
        <el-input v-model="queryParams.endStorage" placeholder="请输入结束库位" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <!--     <el-form-item label="起始库区" prop="startArea">
             <el-input v-model="queryParams.startArea" placeholder="请输入起始库区" clearable @keyup.enter.native="handleQuery"/>
           </el-form-item>
           <el-form-item label="结束库位" prop="endStorage">
             <el-input v-model="queryParams.endStorage" placeholder="请输入结束库位" clearable @keyup.enter.native="handleQuery"/>
           </el-form-item>
           <el-form-item label="结束库区" prop="endArea">
             <el-input v-model="queryParams.endArea" placeholder="请输入结束库区" clearable @keyup.enter.native="handleQuery"/>
           </el-form-item>-->
<!--      <el-form-item label="异常信息" prop="errorInfo">
        <el-input v-model="queryParams.errorInfo" placeholder="请输入异常信息" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="当前条码信息" prop="barcodes">
        <el-input v-model="queryParams.barcodes" placeholder="请输入当前条码信息" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="条码数量" prop="barcodeNumber">
        <el-input v-model="queryParams.barcodeNumber" placeholder="请输入条码数量" clearable @keyup.enter.native="handleQuery"/>
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
<!--    <el-row :gutter="10" class="mb8">
&lt;!&ndash;      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
                   v-hasPermi="['wms:tray-log:create']">新增</el-button>
      </el-col>&ndash;&gt;
&lt;!&ndash;      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wms:tray-log:export']">导出</el-button>
      </el-col>&ndash;&gt;
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->

    <!-- 列表 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="托盘号" align="center" prop="trayNo" />
      <el-table-column label="日志类型" align="center" prop="type" >
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_TRAY_LOG_TYPE" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="业务类型" align="center" prop="serviceType" >
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_SERVICE_TYPE" :value="scope.row.serviceType"/>
        </template>
      </el-table-column>
      <el-table-column label="wcs调度号" align="center" prop="dispatchTaskNumber" />
<!--      <el-table-column label="调用结果" align="center" prop="result" />-->
<!--      <el-table-column label="调用方" align="center" prop="caller" />
      <el-table-column label="被调用方" align="center" prop="callee" />-->
<!--      <el-table-column label="方法名称" align="center" prop="methodName" />
      <el-table-column label="请求参数" align="center" prop="requestParameters" />
      <el-table-column label="返回结果" align="center" prop="responseResults" />-->
      <el-table-column label="起始库位" align="center" prop="startStorage" />
      <el-table-column label="起始库区" align="center" prop="startArea" />
      <el-table-column label="结束库位" align="center" prop="endStorage" />
      <el-table-column label="结束库区" align="center" prop="endArea" />
<!--      <el-table-column label="异常信息" align="center" prop="errorInfo" />-->
      <el-table-column label="电芯状态" align="center" prop="barcodeStatus" />
<!--      <el-table-column label="条码信息" align="center" prop="barcodes">
        <template slot-scope="scope">
          <div :title="scope.row.barcodes">{{ ellipsis(scope.row.barcodes) }}</div>
        </template>
      </el-table-column>-->
      <el-table-column label="条码信息" align="center" prop="barcodes">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.barcodes" placement="top-start">
            <div class="ellipsis">{{ ellipsis(scope.row.barcodes) }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="条码数量" align="center" prop="barcodeNumber" />
      <el-table-column label="创建时间" align="center" prop="createTime" >
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
<!--          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['wms:tray-log:update']">修改</el-button>-->
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wms:tray-log:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>

    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="title" :visible.sync="open" width="500px" v-dialogDrag append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="托盘号" prop="trayNo">
          <el-input v-model="form.trayNo" placeholder="请输入托盘号" />
        </el-form-item>
        <el-form-item label="日志类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择日志类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型" prop="serviceType">
          <el-select v-model="form.serviceType" placeholder="请选择业务类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="wcs调度任务号" prop="dispatchTaskNumber">
          <el-input v-model="form.dispatchTaskNumber" placeholder="请输入wcs调度任务号" />
        </el-form-item>
        <el-form-item label="0失败 1成功" prop="result">
          <el-input v-model="form.result" placeholder="请输入0失败 1成功" />
        </el-form-item>
        <el-form-item label="接口调用方" prop="caller">
          <el-input v-model="form.caller" placeholder="请输入接口调用方" />
        </el-form-item>
        <el-form-item label="接口被调用方" prop="callee">
          <el-input v-model="form.callee" placeholder="请输入接口被调用方" />
        </el-form-item>
        <el-form-item label="方法名称" prop="methodName">
          <el-input v-model="form.methodName" placeholder="请输入方法名称" />
        </el-form-item>
        <el-form-item label="请求参数" prop="requestParameters">
          <el-input v-model="form.requestParameters" placeholder="请输入请求参数" />
        </el-form-item>
        <el-form-item label="返回结果" prop="responseResults">
          <el-input v-model="form.responseResults" placeholder="请输入返回结果" />
        </el-form-item>
        <el-form-item label="起始库位" prop="startStorage">
          <el-input v-model="form.startStorage" placeholder="请输入起始库位" />
        </el-form-item>
        <el-form-item label="起始库区" prop="startArea">
          <el-input v-model="form.startArea" placeholder="请输入起始库区" />
        </el-form-item>
        <el-form-item label="结束库位" prop="endStorage">
          <el-input v-model="form.endStorage" placeholder="请输入结束库位" />
        </el-form-item>
        <el-form-item label="结束库区" prop="endArea">
          <el-input v-model="form.endArea" placeholder="请输入结束库区" />
        </el-form-item>
        <el-form-item label="异常信息" prop="errorInfo">
          <el-input v-model="form.errorInfo" placeholder="请输入异常信息" />
        </el-form-item>
        <el-form-item label="当前条码信息" prop="barcodes">
          <el-input v-model="form.barcodes" placeholder="请输入当前条码信息" />
        </el-form-item>
        <el-form-item label="条码数量" prop="barcodeNumber">
          <el-input v-model="form.barcodeNumber" placeholder="请输入条码数量" />
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
import { createTrayLog, updateTrayLog, deleteTrayLog, getTrayLog, getTrayLogPage, exportTrayLogExcel } from "@/api/wms/trayLog";

export default {
  name: "TrayLog",
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
      // wms托盘日志记录列表
      list: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        trayNo: null,
        type: null,
        serviceType: null,
        dispatchTaskNumber: null,
        result: null,
        caller: null,
        callee: null,
        methodName: null,
        requestParameters: null,
        responseResults: null,
        startStorage: null,
        startArea: null,
        endStorage: null,
        endArea: null,
        errorInfo: null,
        barcodes: null,
        barcodeNumber: null,
        createTime: [],
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        type: [{ required: true, message: "日志类型不能为空", trigger: "change" }],
        result: [{ required: true, message: "0失败 1成功不能为空", trigger: "blur" }],
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
      getTrayLogPage(this.queryParams).then(response => {
        this.list = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    ellipsis(text) {
      if (text.length > 10) {
        return text.substring(0, 10) + '...';
      }
      return text;
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
        trayNo: undefined,
        type: undefined,
        serviceType: undefined,
        dispatchTaskNumber: undefined,
        result: undefined,
        caller: undefined,
        callee: undefined,
        methodName: undefined,
        requestParameters: undefined,
        responseResults: undefined,
        startStorage: undefined,
        startArea: undefined,
        endStorage: undefined,
        endArea: undefined,
        errorInfo: undefined,
        barcodes: undefined,
        barcodeNumber: undefined,
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
      this.title = "添加wms托盘日志记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      getTrayLog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改wms托盘日志记录";
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
          updateTrayLog(this.form).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
          return;
        }
        // 添加的提交
        createTrayLog(this.form).then(response => {
          this.$modal.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id;
      this.$modal.confirm('是否确认删除wms托盘日志记录编号为"' + id + '"的数据项?').then(function() {
          return deleteTrayLog(id);
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
      this.$modal.confirm('是否确认导出所有wms托盘日志记录数据项?').then(() => {
          this.exportLoading = true;
          return exportTrayLogExcel(params);
        }).then(response => {
          this.$download.excel(response, 'wms托盘日志记录.xls');
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>

