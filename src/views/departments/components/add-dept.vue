<template>
  <el-dialog :title="showTitle" :visible="isShowAddDept" @close="close">
    <el-form label-width="120px" :model="formData" :rules="rules" ref="form">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          placeholder="请选择"
          @focus="getSimpleEmp"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.username"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" />
      </el-form-item>
    </el-form>
    <!-- 取消、确认按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="close">取 消</el-button>
        <el-button type="primary" size="mini" @click="submit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  getDepartments,
  getEmployeeSimple,
  addDepartments,
  getDepartDetail,
  updateDepartments
} from '@/api/departments'
export default {
  name: 'AddDept',
  props: {
    isShowAddDept: {
      type: Boolean,
      default: false
    },
    currentNode: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const checkName = async (rule, value, callback) => {
      // 获取所有部门数据
      const { depts } = await getDepartments()
      let currentChildren = null
      if (this.formData.id) {
        // 编辑
        // 当前节点的兄弟节点 && 不包括自己
        currentChildren = depts.filter((item) => {
          // 怎么样把自己过滤掉
          return (
            item.pid === this.currentNode.pid && item.id !== this.currentNode.id
          )
        })
      } else {
        // 新增
        // 当前点击节点的儿子节点
        currentChildren = depts.filter((item) => {
          return item.pid === this.currentNode.id
        })
      }
      // console.log(this.currentNode)
      //   pid=当前部门的id

      // value值是否和筛选出来的数据结果里面的name值重复
      const isRepeat = currentChildren.some((item) => item.name === value)
      if (isRepeat) {
        console.log('有重复的')
        return Promise.reject('部门名称数据有重复')
      }
    }
    const checkCode = async (rule, value) => {
      // 获取所有部门数据
      const { depts } = await getDepartments()
      let isRepeat = null
      //   查询编码是否重复
      if (this.formData.id) {
        isRepeat = depts.some(
          (item) => item.code === value && item.id !== this.currentNode.id
        )
      } else {
        isRepeat = isRepeat.some((item) => item.code === value)
      }
      if (isRepeat) {
        return Promise.reject('部门编码数据有重复')
      }
    }
    return {
      // 数据对象
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 规则对象
      rules: {
        name: [
          {
            required: true,
            message: '部门姓名不能为空'
          },
          {
            min: 1,
            max: 50,
            message: '部门名称1-50'
          },
          {
            validator: checkName,
            trigger: 'blur' // 失去焦点的时候触发
          }
        ],
        code: [
          {
            required: true,
            message: '部门编码不能为空'
          },
          {
            min: 1,
            max: 50,
            message: '部门编码1-50'
          },
          {
            validator: checkCode,
            trigger: 'blur' // 失去焦点的时候触发
          }
        ],
        manager: [
          {
            required: true,
            message: '部门负责人不能为空'
          }
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空'
          },
          {
            min: 1,
            max: 300,
            message: '部门编码1-300'
          }
        ]
      },
      options: []
    }
  },
  created() {
    // this.getSimpleEmp()
  },
  methods: {
    async getSimpleEmp() {
      this.options = await getEmployeeSimple()
    },
    async getDetailById(id) {
      this.formData = await getDepartDetail(id)
    },
    async submit() {
      await this.$refs.form.validate()
      if (this.formData.id) {
        // 编辑场景
        await updateDepartments(this.formData)
        // this.$message.success(`${this.showTitle}成功`)
      } else {
        // 新增场景
        await addDepartments({
          ...this.formData,
          pid: this.currentNode.id
        })
        // this.$emit('update:isShowAddDept',false)
      }
      this.$message.success(`${this.showTitle}成功`)
      this.$emit('getDepartmentsData')
      this.close()
    },
    close() {
      this.$refs.form.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
      this.$emit('update:isShowAddDept', false)
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  }
}
</script>

<style lang="scss" scoped>
// 添加部分输入框
// .el-input{
//     width: 400px;
// }
</style>
