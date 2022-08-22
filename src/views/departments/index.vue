<template>
  <div class="dashboard-container" v-loading="loading">
    <div class="app-container">
      <el-card>
        <TreeTool
          :is-root="true"
          :tree-data="company"
          @handleAddDepts="handleAddDepts"
        />
      </el-card>
      <el-tree default-expand-all :data="departs" :props="defaultProps">
        <template v-slot="{ data }">
          <TreeTool
            :is-root="false"
            :tree-data="data"
            @handleAddDepts="handleAddDepts"
            @getDepartmentsData="getDepartmentsData"
            @handleEditDepts="handleEditDepts"
          />
        </template>
      </el-tree>
    </div>
    <!-- 添加部门弹层组件 -->
    <AddDept
      :current-node="currentNode"
      :is-show-add-dept.sync="isShowAddDept"
      @getDepartmentsData="getDepartmentsData"
      ref="addDept"
    />
  </div>
</template>

<script>
import TreeTool from './components/tree-tools.vue'
import AddDept from '@/views/departments/components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { transListToTreeNew } from '@/utils/index'
export default {
  components: {
    TreeTool,
    AddDept
  },
  data() {
    return {
      // 属性
      isShowAddDept: false,
      // 子节点
      currentNode: {},
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      loading: false
    }
  },
  created() {
    this.getDepartmentsData()
  },
  methods: {
    // 点击了添加按钮
    handleAddDepts(node) {
      console.log('点击了添加部门按钮')
      this.isShowAddDept = true
      this.currentNode = node
    },
    async getDepartmentsData() {
      this.loading = true
      try {
        const res = await getDepartments()
        console.log(res)
        // 替换公司数据
        this.company = {
          name: res.companyName,
          manager: res.companyName || '管理员',
          id: ''
        }
        this.departs = transListToTreeNew(res.depts)
        this.loading = false
      } catch (e) {
        console.log(e)
        this.loading = false
      }
    },
    // 编辑触发方法
    handleEditDepts(node) {
      this.isShowAddDept = true
      this.currentNode = node
      // 调用获取详情的方法
      this.$refs.addDept.getDetailById(node.id)
    }
  }
}
</script>

<style lang="scss" scoped>
// 整体组件
.app-container {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 15%);
  height: 100px;
}
// 卡片变短
.el-card {
  width: 600px;
}
// 下拉菜单
.el-dropdown-link {
  cursor: pointer;
  color: #777777;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
