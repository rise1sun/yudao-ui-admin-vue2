<template>
  <div class="app-container">

    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="托盘号" prop="trayNo">
        <el-input v-model="queryParams.trayNo" placeholder="请输入托盘号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="静置区域" prop="area">
        <el-input v-model="queryParams.area" placeholder="请输入静置区域" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="静置库位" prop="storage">
        <el-input v-model="queryParams.storage" placeholder="请输入静置库位" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
<!--      <el-form-item label="静置时间" prop="restingTime">
        <el-date-picker v-model="queryParams.restingTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>-->
      <el-form-item label="任务号" prop="orderTask">
        <el-input v-model="queryParams.orderTask" placeholder="请输入任务订单号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="静置状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_RESTING_TASK_STATUS)"
                     :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
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
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
                   v-hasPermi="['wms:resting-task:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wms:resting-task:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 列表 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="托盘号" align="center" prop="trayNo" />
      <el-table-column label="静置区域" align="center" prop="area" />
      <el-table-column label="静置库位" align="center" prop="storage" />
      <el-table-column label="静置时间" align="center" prop="restingTime" />
      <el-table-column label="任务号" align="center" prop="orderTask" />
      <el-table-column label="静置状态" align="center" prop="status" >
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_RESTING_TASK_STATUS" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" >
        <template v-slot="scope">
          <span> {{parseTime(scope.row.createTime)}} </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['wms:resting-task:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wms:resting-task:delete']">删除</el-button>
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
        <el-form-item label="静置区域" prop="area">
          <el-input v-model="form.area" placeholder="请输入静置区域" />
        </el-form-item>
        <el-form-item label="静置库位" prop="storage">
          <el-input v-model="form.storage" placeholder="请输入静置库位" />
        </el-form-item>
        <el-form-item label="静置时间" prop="restingTime">
          <el-input v-model="form.restingTime" placeholder="请输入静置库位" />
        </el-form-item>
        <el-form-item label="任务号" prop="orderTask">
          <el-input v-model="form.orderTask" placeholder="请输入任务订单号" />
        </el-form-item>
        <el-form-item label="静置状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" clearable size="small">
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_RESTING_TASK_STATUS)"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
          </el-select>
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
import { createRestingTask, updateRestingTask, deleteRestingTask, getRestingTask, getRestingTaskPage, exportRestingTaskExcel } from "@/api/wms/restingTask";

export default {
  name: "RestingTask",
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
      // 静置任务信息列表
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
        area: null,
        storage: null,
        restingTime: null,
        orderTask: null,
        status: null,
        createTime: [],
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        status: [{ required: true, message: "静置状态不能为空", trigger: "blur" }],
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
      getRestingTaskPage(this.queryParams).then(response => {
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
        trayNo: undefined,
        area: undefined,
        storage: undefined,
        restingTime: undefined,
        orderTask: undefined,
        status: undefined,
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
      this.title = "添加静置任务信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      getRestingTask(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改静置任务信息";
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
          updateRestingTask(this.form).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
          return;
        }
        // 添加的提交
        createRestingTask(this.form).then(response => {
          this.$modal.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id;
      this.$modal.confirm('是否确认删除静置任务信息编号为"' + id + '"的数据项?').then(function() {
          return deleteRestingTask(id);
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
      this.$modal.confirm('是否确认导出所有静置任务信息数据项?').then(() => {
          this.exportLoading = true;
          return exportRestingTaskExcel(params);
        }).then(response => {
          this.$download.excel(response, '静置任务信息.xls');
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
