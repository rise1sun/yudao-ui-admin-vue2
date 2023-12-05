<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%" v-dialogDrag append-to-body>
      <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="100px">
                    <el-form-item label="条码号" prop="barcode">
                      <el-input v-model="formData.barcode" placeholder="请输入条码号" />
                    </el-form-item>
                    <el-form-item label="数据来源" prop="dataSource">
                      <el-select v-model="formData.dataSource" placeholder="请选择数据来源">
                        <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_BARCODE_SOURCE)"
                                   :key="dict.value" :label="dict.label" :value="dict.value"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="规格型号" prop="spec">
                      <el-input v-model="formData.spec" placeholder="请输入规格型号" />
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                      <el-select v-model="formData.type" placeholder="请输入类型">
                        <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_BARCODE_TYPE)"
                                   :key="dict.value" :label="dict.label" :value="dict.value" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="库区" prop="area">
                      <el-input v-model="formData.area" placeholder="请输入库区" />
                    </el-form-item>
                    <el-form-item label="托盘号" prop="tray">
                      <el-input v-model="formData.tray" placeholder="请输入托盘号" />
                    </el-form-item>
                    <el-form-item label="条码状态" prop="barcodeStatus">
                      <el-select v-model="formData.barcodeStatus" placeholder="请选择条码状态">
                        <el-option v-for="dict in this.getDictDatas(DICT_TYPE.WMS_BARCODE_STATUS)"
                                   :key="parseInt(dict.value)" :label="dict.label" :value="parseInt(dict.value)" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="流程id" prop="formulaId">
                      <el-input v-model="formData.formulaId" placeholder="请输入工艺流程id" />
                    </el-form-item>
                    <el-form-item label="流程名称" prop="formulaName">
                      <el-input v-model="formData.formulaName" placeholder="请输入工艺流程名称" />
                    </el-form-item>
                    <el-form-item label="节点编号" prop="formulaItemId">
                      <el-input v-model="formData.formulaItemId" placeholder="请输入工艺子节点编号" />
                    </el-form-item>
                    <el-form-item label="节点名称" prop="formulaItemName">
                      <el-input v-model="formData.formulaItemName" placeholder="请输入工艺节点名称" />
                    </el-form-item>
                    <el-form-item label="ng点位" prop="ngSite">
                      <el-input v-model="formData.ngSite" placeholder="请输入ng点位" />
                    </el-form-item>
                    <el-form-item label="复测标记" prop="retestMarkers">
                      <el-input v-model="formData.retestMarkers" placeholder="请输入复测标记" />
                    </el-form-item>
                    <el-form-item label="通道号" prop="channelIndex">
                      <el-input v-model="formData.channelIndex" placeholder="请输入通道号" />
                    </el-form-item>
                    <el-form-item label="批次" prop="batchId">
                      <el-input v-model="formData.batchId" placeholder="请输入批次" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                      <el-input v-model="formData.remark" placeholder="请输入备注" />
                    </el-form-item>
                    <el-form-item label="库位" prop="storage">
                      <el-input v-model="formData.storage" placeholder="请输入库位" />
                    </el-form-item>
      </el-form>
              <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" :disabled="formLoading">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as BarcodeApi from '@/api/wms/barcode';
      export default {
    name: "BarcodeForm",
    components: {
                    },
    data() {
      return {
        // 弹出层标题
        dialogTitle: "",
        // 是否显示弹出层
        dialogVisible: false,
        // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
        formLoading: false,
        // 表单参数
        formData: {
                            id: undefined,
                            barcode: undefined,
                            dataSource: undefined,
                            spec: undefined,
                            type: undefined,
                            area: undefined,
                            tray: undefined,
                            barcodeStatus: undefined,
                            formulaId: undefined,
                            formulaName: undefined,
                            formulaItemId: undefined,
                            formulaItemName: undefined,
                            ngSite: undefined,
                            retestMarkers: undefined,
                            channelIndex: undefined,
                            batchId: undefined,
                            remark: undefined,
                            storage: undefined,
        },
        // 表单校验
        formRules: {
                        barcode: [{ required: true, message: '条码号不能为空', trigger: 'blur' }],
                        barcodeStatus: [{ required: true, message: '条码状态不能为空', trigger: 'change' }],
        },
                        };
    },
    methods: {
      /** 打开弹窗 */
     async open(id) {
        this.dialogVisible = true;
        this.reset();
        // 修改时，设置数据
        if (id) {
          this.formLoading = true;
          try {
            const res = await BarcodeApi.getBarcode(id);
            this.formData = res.data;
            this.title = "修改条码";
          } finally {
            this.formLoading = false;
          }
        }
        this.title = "新增条码";
              },
      /** 提交按钮 */
      async submitForm() {
        // 校验主表
        await this.$refs["formRef"].validate();
                  this.formLoading = true;
        try {
          const data = this.formData;
                  // 修改的提交
          if (data.id) {
            await BarcodeApi.updateBarcode(data);
            this.$modal.msgSuccess("修改成功");
            this.dialogVisible = false;
            this.$emit('success');
            return;
          }
          // 添加的提交
          await BarcodeApi.createBarcode(data);
          this.$modal.msgSuccess("新增成功");
          this.dialogVisible = false;
          this.$emit('success');
        } finally {
          this.formLoading = false;
        }
      },
                      /** 表单重置 */
      reset() {
        this.formData = {
                            id: undefined,
                            barcode: undefined,
                            dataSource: undefined,
                            spec: undefined,
                            type: undefined,
                            area: undefined,
                            tray: undefined,
                            barcodeStatus: undefined,
                            formulaId: undefined,
                            formulaName: undefined,
                            formulaItemId: undefined,
                            formulaItemName: undefined,
                            ngSite: undefined,
                            retestMarkers: undefined,
                            channelIndex: undefined,
                            batchId: undefined,
                            remark: undefined,
                            storage: undefined,
        };
        this.resetForm("formRef");
      }
    }
  };
</script>
