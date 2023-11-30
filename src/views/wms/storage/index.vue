<template>
  <div class="app-container">

    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="区域名称" prop="areaId">
          <el-select v-model="queryParams.areaId" placeholder="请选择区域" clearable @keyup.enter.native="handleQuery">
            <el-option
              v-for="area in areaList"
              :key="area.areaId"
              :label="area.areaName"
              :value="area.areaId"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="库位编号" prop="code">
        <el-input v-model="queryParams.code" placeholder="请输入库位编号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="库位名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入库位名称" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_STORAGE_STATUS)"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="有无货物" prop="hasGood">
        <el-select v-model="queryParams.hasGood" placeholder="请选择有无货物" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_STORAGE_HAS_GOODS)"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="有无消防通道" prop="hasFireChannel">
        <el-select v-model="queryParams.hasFireChannel" placeholder="请选择有无消防通道" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_STORAGE_HAS_FIRE_CHANNEL)"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>-->
      <el-form-item label="特殊库位" prop="specialStorage">
        <el-select v-model="queryParams.specialStorage" placeholder="请选择特殊库位" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_SPECIAL_STORAGE)"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="queryParams.remark" placeholder="请输入备注" clearable @keyup.enter.native="handleQuery"/>
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
                   v-hasPermi="['wms:storage:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wms:storage:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 列表 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="id" align="center" prop="id" />

      <el-table-column label="区域名称" align="center" prop="areaName" >
        <template slot-scope="scope">
          {{ getAreaName(scope.row.areaId) }}
        </template>
      </el-table-column>
      <el-table-column label="库位编号" align="center" prop="code" />
      <el-table-column label="库位名称" align="center" prop="name" />
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_STORAGE_STATUS" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="有无货物" align="center" prop="hasGood">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_STORAGE_HAS_GOODS" :value="scope.row.hasGood" />
        </template>
      </el-table-column>
<!--      <el-table-column label="有无消防通道" align="center" prop="hasFireChannel">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_STORAGE_HAS_FIRE_CHANNEL" :value="scope.row.hasFireChannel" />
        </template>
      </el-table-column>-->
      <el-table-column label="特殊库位" align="center" prop="specialStorage">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_SPECIAL_STORAGE" :value="scope.row.specialStorage" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="创建时间" align="center" prop="createTime">
      <template v-slot="scope">
        <span>{{ parseTime(scope.row.createTime)}}</span>
      </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['wms:storage:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wms:storage:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>

    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="title" :visible.sync="open" width="500px" v-dialogDrag append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="区域" prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择区域">
            <el-option
              v-for="area in areaList"
              :key="area.areaId"
              :label="area.areaName"
              :value="area.areaId"
            ></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="库位编号" prop="code">
          <el-input v-model="form.code" placeholder="请输入库位编号" />
        </el-form-item>
        <el-form-item label="库位名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入库位名称" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_STORAGE_STATUS)"
                       :key="parseInt(dict.value)" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="有无货物" prop="hasGood">
          <el-select v-model="form.hasGood" placeholder="请选择有无货物">
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_STORAGE_HAS_GOODS)"
                       :key="parseInt(dict.value)" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="有无消防通道" prop="hasFireChannel">
          <el-select v-model="form.hasFireChannel" placeholder="请选择有无消防通道">
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_STORAGE_HAS_FIRE_CHANNEL)"
                       :key="parseInt(dict.value)" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="特殊库位" prop="specialStorage">
          <el-select v-model="form.specialStorage" placeholder="请选择特殊库位">
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_SPECIAL_STORAGE)"
                       :key="parseInt(dict.value)" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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
import { createStorage, updateStorage, deleteStorage, getStorage, getStoragePage, exportStorageExcel,getAreaLists } from "@/api/wms/storage";

export default {
  name: "Storage",
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
      // 库位列表
      list: [],
      //区域列表
      areaList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        areaId: null,
        areaName: null,
        code: null,
        name: null,
        status: null,
        hasGood: null,
        hasFireChannel: null,
        specialStorage: null,
        remark: null,
        createTime: [],
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        code: [{ required: true, message: "库位编号不能为空", trigger: "blur" }],
        /* areaId: [{ required: true, message: "区域ID不能为空", trigger: "blur" }], */
        status: [{ required: true, message: "状态不能为空", trigger: "change" }],
        hasGood: [{ required: true, message: "有无货物不能为空", trigger: "change" }],
        hasFireChannel: [{ required: true, message: "有无消防通道不能为空", trigger: "change" }],
        specialStorage: [{ required: true, message: "特殊库位不能为空", trigger: "change" }],
      }
    };
  },
  created() {
    this.getList();
    this.fetchAreaList();
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      // 执行查询
      getStoragePage(this.queryParams).then(response => {
        this.list = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    //查询区域信息
    fetchAreaList(){
      getAreaLists().then(response => {
        this.areaList = response.data;
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
        areaId: undefined,
        areaName: undefined,
        area: undefined,
        code: undefined,
        name: undefined,
        status: undefined,
        hasGood: undefined,
        hasFireChannel: undefined,
        specialStorage: undefined,
        remark: undefined,
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
      this.title = "添加库位";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      getStorage(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改库位";
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
          updateStorage(this.form).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
          return;
        }
        // 添加的提交
        createStorage(this.form).then(response => {
          this.$modal.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id;
      this.$modal.confirm('是否确认删除库位编号为"' + id + '"的数据项?').then(function() {
          return deleteStorage(id);
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
      this.$modal.confirm('是否确认导出所有库位数据项?').then(() => {
          this.exportLoading = true;
          return exportStorageExcel(params);
        }).then(response => {
          this.$download.excel(response, '库位.xls');
          this.exportLoading = false;
        }).catch(() => {});
    },

    getAreaName(rowId){
      if (this.areaList.length == 0){
        this.fetchAreaList();
      }
      const area = this.areaList.find(item => item.areaId === rowId);
      return area ? area.areaName : '未知区域';
    }
  }
};
</script>
