<template>
  <div class="app-container">

    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="工艺流程编码" prop="code" label-width="100px">
        <el-input v-model="queryParams.code" placeholder="请输入工艺流程编码" clearable
                  @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工艺流程名称" prop="name" label-width="100px">
        <el-input v-model="queryParams.name" placeholder="请输入工艺流程名称" clearable
                  @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工艺状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_FORMULA_STATUS)"
                     :key="dict.value" :label="dict.label" :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss"
                        type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
        />
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
                   v-hasPermi="['wms:formula:create']"
        >新增工艺流程
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">
              <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                         v-hasPermi="['wms:formula:export']">导出</el-button>
            </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 列表 -->
    <el-table v-loading="loading" :data="list">
      <el-table-column label="主键" align="center" prop="id"/>
      <el-table-column label="工艺流程编码" align="center" prop="code"/>
      <el-table-column label="工艺流程名称" align="center" prop="name"/>
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_FORMULA_STATUS" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" prop="type">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_FORMULA_TYPE" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="超时时间（%）" align="center" prop="timeOut"/>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template v-slot="scope">
          <span> {{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <!--          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleItemQuery(scope.row)"
                               v-hasPermi="['wms:formula-item:query']">详细</el-button>-->
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['wms:formula:update']"
          >修改
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wms:formula:delete']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"
    />

    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="title" :visible.sync="open" width="1100px" v-dialogDrag append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="工艺编码" prop="code" label-width="80px">
          <el-input v-model="form.code" placeholder="请输入工艺流程编码"/>
        </el-form-item>
        <el-form-item label="工艺名称" prop="name" label-width="80px">
          <el-input v-model="form.name" placeholder="请输入工艺流程名称"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_FORMULA_STATUS)"
                       :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_FORMULA_TYPE)"
                       :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="超时时间" prop="timeOut" label-width="80px">
          <el-input v-model.number="form.timeOut" type="number" placeholder="请设置超时时间 单位：百分号%"/>
        </el-form-item>
        <el-form-item label="工艺节点">
          <el-select v-model="form.formulaItemIds" placeholder="请选择工艺节点" :disabled="isDisabled" clearable
                     size="small" multiple filterable
                     style="width: 880px" @change="changeFormFormulaItem"
          >
            <el-option v-for="item in formulaItemLists" :key="item.id" :label="item.name"
                       :value="item.id"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="display: none">{{ item.area }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>

            </el-option>
          </el-select>
          <el-row>
            <el-button type="primary" size="mini" @click="batchEditFormulaItem('status')">状态</el-button>
            <el-button type="primary" size="mini" @click="batchEditFormulaItem('restingTime')">静置时间</el-button>
            <el-button type="primary" size="mini" @click="batchEditFormulaItem('equipmentSwitch')">上位机交互
            </el-button>
            <el-button type="primary" size="mini" @click="batchEditFormulaItem('retestNumber')">最大复测次数</el-button>
          </el-row>
          <el-table v-loading="loading" ref="formulaItemTable" :data="form.formulaItemList">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="序号" align="center" width="50">
              <template v-slot="scope">
                {{ scope.row.serialNumber }}
              </template>
            </el-table-column>
            <el-table-column label="工艺节点名称" align="center" width="200">
              <template v-slot="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="100">
              <template v-slot="scope">
                <dict-tag :type="DICT_TYPE.WMS_FORMULA_ITEM_STATUS" :value="parseInt(scope.row.status)"/>
              </template>
            </el-table-column>

            <el-table-column label="静置时间(分钟)" align="center" width="140">
              <template v-slot="scope">
                {{ scope.row.restingTime }}
              </template>
            </el-table-column>
            <el-table-column label="最大复测次数" align="center" width="140">
              <template v-slot="scope">
                {{ scope.row.retestNumber }}
              </template>
            </el-table-column>
            <el-table-column label="是否与上位机交互" align="center" width="150">
              <template v-slot="scope">
                <dict-tag :type="DICT_TYPE.WMS_UPLINK_SWITCH" :value="scope.row.equipmentSwitch"/>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template v-slot="scope">
                <el-button size="mini" type="text" icon="el-icon-delete" v-if="isShow"
                           @click="removeFormId(scope.row.serialNumber)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
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
import {
  createFormula,
  deleteFormula,
  exportFormulaExcel,
  getFormula,
  getFormulaPage,
  updateFormula
} from '@/api/wms/formula'
import { getFormulaItemList } from '@/api/wms/formulaItem'
import { deepClone } from '@/utils'

export default {
  name: 'Formula',
  components: {},
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
      // 工艺流程列表
      list: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      //下拉框是否禁用
      isDisabled: false,

      isShow: true,
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        code: null,
        name: null,
        status: null,
        type: null,
        timeOut: null,
        createTime: []
      },
      // 表单参数
      form: {
        formulaItemIds: [], // 选中的formulaItem
        formulaItemList: []
      },
      //选中的formulaItem信息
      formulaItemLists: [], //formulaItem列表
      // 表单校验
      rules: {
        status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
        type: [{ required: true, message: '类型不能为空', trigger: 'change' }],
        code: [{ required: true, message: '工艺编码不能为空', trigger: 'change' }],
        name: [{ required: true, message: '工艺名称不能为空', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true
      // 执行查询
      getFormulaPage(this.queryParams).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.loading = false
      })
      // 获得工艺节点列表
      getFormulaItemList().then(response => {
        this.formulaItemLists = response.data
      })
    },
    batchEditFormulaItem(editType) {
      const selectFormulaItems = this.$refs.formulaItemTable.selection
      if (selectFormulaItems.length === 0) {
        this.$modal.msgError('请选择需要修改的工艺节点')
        return
      }
      let promptTitle = '请输入'
      let regularPattern = /^[\s\S]*.*[^\s][\s\S]*$/ // 判断非空，且非空格
      //状态
      if (editType === 'status') {
        promptTitle = '状态,请输入0或1(0正常，1停用)'
        regularPattern = /^[0-9]*$/ //数字
      }
      //静置时间
      if (editType === 'restingTime') {
        promptTitle = '静置时间(分钟)'
        regularPattern = /^[0-9]+(\.[0-9]{1,2})?$/ // 有一位或两位小数的正数
      }
      //上位机交互
      if (editType === 'equipmentSwitch') {
        promptTitle = '上位机交互，请输入0或1(0正常，1停用)'
        regularPattern = /^[0-9]*$/ //数字
      }
      //最大复测次数
      if (editType === 'retestNumber') {
        promptTitle = '最大复测次数'
        regularPattern = /^[0-9]*$/ //数字
      }

      this.$prompt(promptTitle, '提示', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        inputPattern: regularPattern,
        inputErrorMessage: promptTitle + '格式不正确'
      }).then(({ value }) => {
        if (editType === 'status') {
          selectFormulaItems.forEach((item) => {
            item.status = value
          })
        }
        if (editType === 'restingTime') {
          selectFormulaItems.forEach((item) => {
            item.restingTime = value
          })
        }
        if (editType === 'retestNumber') {
          selectFormulaItems.forEach((item) => {
            item.retestNumber = value
          })
        }
        if (editType === 'equipmentSwitch') {
          selectFormulaItems.forEach((item) => {
            item.equipmentSwitch = value
          })
        }
      }).catch()
    },
    //删除
    removeFormId(index) {
      this.form.formulaItemList.splice(index - 1, 1)
      this.form.formulaItemIds.splice(index - 1, 1)
      const formulaItemListCopy = this.form.formulaItemList
      this.form.formulaItemList = []
      formulaItemListCopy.forEach(formulaItem => {
        this.form.formulaItemList.push({
          serialNumber: formulaItemListCopy.indexOf(formulaItem) + 1,
          id: formulaItem.id,
          name: formulaItem.name,
          code: formulaItem.code,
          retestNumber: formulaItem.retestNumber,
          equipmentSwitch: formulaItem.equipmentSwitch,
          restingTime: formulaItem.restingTime,
          ruleId: formulaItem.ruleId,
          status: formulaItem.status
        })
      })
    },
    //下拉选取工艺节点
    changeFormFormulaItem(formulaItemIds) {
      if (formulaItemIds.length === 0) {
        this.form.formulaItemList = []
        return
      }
      formulaItemIds.forEach(formulaItemId => {
        // 获得对应的 formulaItem信息
        const formulaItem = this.formulaItemLists.find(item => item.id === formulaItemId)
        if (!formulaItem) {
          return
        }
        //跳过已存在的节点
        const formulaItem1 = this.form.formulaItemList.find(item => item.id === formulaItemId)
        if (formulaItem1) {
          return
        }
        this.form.formulaItemList.push({
          serialNumber: this.form.formulaItemList.length + 1,
          id: formulaItem.id,
          code: formulaItem.code,
          name: formulaItem.name,
          retestNumber: formulaItem.retestNumber,
          equipmentSwitch: formulaItem.equipmentSwitch,
          restingTime: formulaItem.restingTime,
          ruleId: formulaItem.ruleId,
          status: formulaItem.status,
          area: formulaItem.area
        })

      })
      // 处理【移除】
      this.form.formulaItemList.map((formulaItem1, serialNumber) => {
        if (!formulaItemIds.includes(formulaItem1.id)) {
          this.form.formulaItemList.splice(serialNumber, 1)
          //序号重新编排
          const formulaItemListCopy = this.form.formulaItemList
          this.form.formulaItemList = []

          formulaItemListCopy.forEach(formulaItem => {
            this.form.formulaItemList.push({
              serialNumber: formulaItemListCopy.indexOf(formulaItem) + 1,
              id: formulaItem.id,
              name: formulaItem.name,
              code: formulaItem.code,
              retestNumber: formulaItem.retestNumber,
              equipmentSwitch: formulaItem.equipmentSwitch,
              restingTime: formulaItem.restingTime,
              ruleId: formulaItem.ruleId,
              status: formulaItem.status,
              area: formulaItem.area
            })
          })
        }
      })

    },

    /** 取消按钮 */
    cancel() {
      this.open = false
      this.reset()
    },
    /** 表单重置 */
    reset() {
      this.form = {
        id: undefined,
        code: undefined,
        name: undefined,
        formulaItemList: [],
        status: undefined,
        timeOut: undefined,
        formulaItemIds: undefined,
        area: undefined

      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.isDisabled = false
      this.isShow = true
      this.open = true
      this.title = '添加工艺流程'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id
      getFormula(id).then(response => {
        this.form = response.data
        this.isDisabled = true
        this.isShow = false
        //this.form.formulaItemIds = response.data.formulaItemList.map(item => item.id);
        this.open = true
        this.title = '修改工艺流程'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        // 处理数据
        const data = deepClone(this.form)
        //校验超时时间
        const to = parseInt(data.timeOut)
        if (!(to === undefined || to === null || isNaN(to)) && (!Number.isInteger(to) || to < 1 || to > 10)) {
          this.$modal.msgError('请输入1到10的整数')
          return
        }

        // 修改的提交
        if (this.form.id != null) {
          updateFormula(this.form).then(response => {
            this.$modal.msgSuccess('修改成功')
            this.open = false
            this.getList()
          })
          return
        }
        // 添加的提交

        createFormula(data).then(response => {
          this.$modal.msgSuccess('新增成功')
          this.open = false
          this.getList()
        })
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id
      const type = row.type
      if (type === 1) {
        this.$modal.msgError('系统工艺无法删除')
        return
      }
      this.$modal.confirm('是否确认删除工艺流程编号为"' + id + '"的数据项?').then(function() {
        return deleteFormula(id)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      // 处理查询参数
      let params = { ...this.queryParams }
      params.pageNo = undefined
      params.pageSize = undefined
      this.$modal.confirm('是否确认导出所有工艺流程数据项?').then(() => {
        this.exportLoading = true
        return exportFormulaExcel(params)
      }).then(response => {
        this.$download.excel(response, '工艺流程.xls')
        this.exportLoading = false
      }).catch(() => {
      })
    }
  }
}
</script>
