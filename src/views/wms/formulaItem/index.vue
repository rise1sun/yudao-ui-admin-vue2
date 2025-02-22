<template>
  <div class="app-container">

    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="序号" prop="serialNumber">
        <el-input v-model="queryParams.serialNumber" placeholder="请输入序号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="工艺流程编码" prop="formulaId">
        <el-input v-model="queryParams.formulaId" placeholder="请输入工艺流程编码" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="配方名称    " prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入配方名称    " clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="工艺节点编码" prop="code">
        <el-input v-model="queryParams.code" placeholder="请输入工艺节点编码" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="配方静置时间" prop="setTime">
        <el-date-picker v-model="queryParams.setTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_FORMULA_ITEM_STATUS)"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="规则表id" prop="ruleId">
        <el-input v-model="queryParams.ruleId" placeholder="请输入规则表id" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item label="库区" prop="area">
        <el-input v-model="queryParams.area" placeholder="请输入库区" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="复测次数" prop="retestNumber">
        <el-input v-model="queryParams.retestNumber" placeholder="请输入复测次数" clearable @keyup.enter.native="handleQuery"/>
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
                   v-hasPermi="['wms:formula-item:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wms:formula-item:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 列表 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="序号" align="center" prop="serialNumber" />
      <el-table-column label="工艺流程编码" align="center" prop="formulaId" />
      <el-table-column label="配方名称    " align="center" prop="name" />
      <el-table-column label="工艺节点编码" align="center" prop="code" />
      <el-table-column label="配方静置时间" align="center" prop="setTime" />
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_FORMULA_ITEM_STATUS" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="规则表id" align="center" prop="ruleId" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="库区" align="center" prop="area" />
      <el-table-column label="复测次数" align="center" prop="retestNumber" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['wms:formula-item:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wms:formula-item:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>

    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="title" :visible.sync="open" width="500px" v-dialogDrag append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="序号" prop="serialNumber">
          <el-input v-model="form.serialNumber" placeholder="请输入序号" />
        </el-form-item>
        <el-form-item label="工艺流程编码" prop="formulaId">
          <el-input v-model="form.formulaId" placeholder="请输入工艺流程编码" />
        </el-form-item>
        <el-form-item label="配方名称    " prop="name">
          <el-input v-model="form.name" placeholder="请输入配方名称    " />
        </el-form-item>
        <el-form-item label="工艺节点编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入工艺节点编码" />
        </el-form-item>
        <el-form-item label="配方静置时间" prop="setTime">
          <el-date-picker clearable v-model="form.setTime" type="date" value-format="timestamp" placeholder="选择配方静置时间" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_FORMULA_ITEM_STATUS)"
                       :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="规则表id" prop="ruleId">
          <el-input v-model="form.ruleId" placeholder="请输入规则表id" />
        </el-form-item>
        <el-form-item label="库区" prop="area">
          <el-input v-model="form.area" placeholder="请输入库区" />
        </el-form-item>
        <el-form-item label="复测次数" prop="retestNumber">
          <el-input v-model="form.retestNumber" placeholder="请输入复测次数" />
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
import { createFormulaItem, updateFormulaItem, deleteFormulaItem, getFormulaItem, getFormulaItemPage, exportFormulaItemExcel } from "@/api/wms/formulaItem";

export default {
  name: "FormulaItem",
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
      // 工艺流程节点列表
      list: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        serialNumber: null,
        formulaId: null,
        name: null,
        code: null,
        setTime: [],
        status: null,
        ruleId: null,
        createTime: [],
        area: null,
        retestNumber: null,
        equipmentSwitch: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        status: [{ required: true, message: "状态不能为空", trigger: "change" }],
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
      getFormulaItemPage(this.queryParams).then(response => {
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
        serialNumber: undefined,
        formulaId: undefined,
        name: undefined,
        code: undefined,
        setTime: undefined,
        status: undefined,
        ruleId: undefined,
        area: undefined,
        retestNumber: undefined,
        equipmentSwitch:undefined,
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
      this.title = "添加工艺流程节点";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      getFormulaItem(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工艺流程节点";
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
          updateFormulaItem(this.form).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
          return;
        }
        // 添加的提交
        createFormulaItem(this.form).then(response => {
          this.$modal.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id;
      this.$modal.confirm('是否确认删除工艺流程节点编号为"' + id + '"的数据项?').then(function() {
          return deleteFormulaItem(id);
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
      this.$modal.confirm('是否确认导出所有工艺流程节点数据项?').then(() => {
          this.exportLoading = true;
          return exportFormulaItemExcel(params);
        }).then(response => {
          this.$download.excel(response, '工艺流程节点.xls');
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
