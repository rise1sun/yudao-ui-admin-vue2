<template>
  <div class="app-container">

    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="托盘编号" prop="trayNo">
        <el-input v-model="queryParams.trayNo" placeholder="请输入托盘编号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="托盘状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择托盘状态" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_TRAY_STATUS)"
                     :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="托盘类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择托盘类型" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_TRAY_TYPE)"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="测试托盘" prop="isTestTray">
        <el-select v-model="queryParams.isTestTray" placeholder="请选择" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_TRAY_TEST)"
                     :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>-->
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
                   v-hasPermi="['wms:tray:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wms:tray:export']">导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" icon="el-icon-upload2" size="mini" @click="handleImport"
                   v-hasPermi="['wms:tray:import']">导入</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 列表 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="托盘id" align="center" prop="id" />
      <el-table-column label="托盘编号" align="center" prop="trayNo" />
      <el-table-column label="托盘类型" align="center" prop="type">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_TRAY_TYPE" :value="scope.row.type" />
        </template>
      </el-table-column>
      <el-table-column label="使用次数" align="center" prop="useNumber" />
      <el-table-column label="最大绑定数量" align="center" prop="maxBindNumber" />
      <el-table-column label="最大使用次数" align="center" prop="maxUseNumber" />
      <el-table-column label="托盘状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_TRAY_STATUS" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="是否是测试托盘" align="center" prop="isTestTray">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_TRAY_TEST" :value="scope.row.isTestTray" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['wms:tray:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wms:tray:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>

    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="title" :visible.sync="open" width="500px" v-dialogDrag append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="托盘编号" prop="trayNo">
          <el-input v-model="form.trayNo" placeholder="请输入托盘编号" />
        </el-form-item>
        <el-form-item label="托盘状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择托盘状态">

            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_TRAY_STATUS)"
                       :key="parseInt(dict.value)" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="托盘类型" prop="type">

          <el-select v-model="form.type" placeholder="请选择托盘类型">
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_TRAY_TYPE)"
                       :key="parseInt(dict.value)" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="测试托盘" prop="isTestTray">

          <el-select v-model="form.isTestTray" placeholder="请选择托盘类型" clearable>
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_TRAY_TEST) "
                       :key="parseInt(dict.value)" :label="dict.label" :value="parseInt(dict.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="最大绑定数量" prop="maxBindNumber">
          <el-input v-model="form.maxBindNumber" placeholder="请输入最大绑定数量" />
        </el-form-item>
        <el-form-item label="最大使用次数" prop="maxUseNumber">
          <el-input v-model="form.maxUseNumber" placeholder="请输入最大使用次数" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 托盘导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
                 :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
                 :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createTray, updateTray, deleteTray, getTray, getTrayPage, exportTrayExcel,importTemplate } from "@/api/wms/tray";
import { getBaseHeader } from '@/utils/request'

export default {
  name: "Tray",
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
      // 托盘列表
      list: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //托盘导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: getBaseHeader(),
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/admin-api/wms/tray/import'
      },
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        type: null,
        maxBindNumber: null,
        maxUseNumber: null,
        status: null,
        createTime: [],
        trayNo: null,
        isTestTray:null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        type: [{ required: true, message: "托盘类型不能为空", trigger: "change" }],
        maxBindNumber: [{ required: true, message: "最大绑定数量不能为空", trigger: "blur" }],
        maxUseNumber: [{ required: true, message: "最大使用次数不能为空", trigger: "blur" }],
        status: [{ required: true, message: "托盘状态不能为空", trigger: "change" }],
        trayNo: [{ required: true, message: "托盘编号不能为空", trigger: "blur" }],
        isTestTray: [{ required: true, message: "测试托盘不能为空", trigger: "blur" }],
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
      getTrayPage(this.queryParams).then(response => {
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
        type: undefined,
        maxBindNumber: undefined,
        maxUseNumber: undefined,
        status: undefined,
        trayNo: undefined,
        isTestTray:undefined,
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
      this.title = "添加托盘";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      getTray(id).then(response => {
        console.log("response.data"+response.data.isTestTray)
        this.form = response.data;
        this.open = true;
        this.title = "修改托盘";
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
          updateTray(this.form).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
          return;
        }
        // 添加的提交
        createTray(this.form).then(response => {
          this.$modal.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id;
      this.$modal.confirm('是否确认删除托盘编号为"' + id + '"的数据项?').then(function() {
          return deleteTray(id);
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
      this.$modal.confirm('是否确认导出所有托盘数据项?').then(() => {
          this.exportLoading = true;
          return exportTrayExcel(params);
        }).then(response => {
          this.$download.excel(response, '托盘.xls');
          this.exportLoading = false;
        }).catch(() => {});
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "托盘导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then(response => {
        this.$download.excel(response, '托盘导入模板.xls');
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      if (response.code !== 0) {
        this.$modal.msgError(response.msg)
        return;
      }
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      // 拼接提示语
      let data = response.data;
      let text = '创建成功数量：' + data.createTrayNo.length;
      for (const username of data.createTrayNo) {
        text += '<br />&nbsp;&nbsp;&nbsp;&nbsp;' + username;
      }
      text += '<br />更新成功数量：' + data.updateTrayNo.length;
      for (const username of data.updateTrayNo) {
        text += '<br />&nbsp;&nbsp;&nbsp;&nbsp;' + username;
      }
      text += '<br />更新失败数量：' + Object.keys(data.failureTaryNo).length;
      for (const username in data.failureTaryNo) {
        text += '<br />&nbsp;&nbsp;&nbsp;&nbsp;' + username + '：' + data.failureTaryNo[username];
      }
      this.$alert(text, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
</script>
