<template>
  <el-row style="width: 100%" type="flex" justify="space-between">
    <el-col>
      <span class="gongsimingzi">{{ treeData.name }}</span>
    </el-col>
    <el-col :span="6" class="rightBox">
      <el-row type="flex" justify="space-between">
        <span class="fuzeren">{{ treeData.manager }}</span>
        <el-dropdown @command="clickItem">
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加部门</el-dropdown-item>
            <el-dropdown-item v-if="!isRoot" command="edit"
              >编辑部门</el-dropdown-item
            >
            <el-dropdown-item v-if="!isRoot" command="del"
              >删除部门</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  name: 'TreeTool',
  props: {
    treeData: {
      type: Object,
      dafault: () => ({})
    },
    isRoot: {
      type: Boolean
    }
  },
  methods: {
    // 操作的点击事件
    async clickItem(type) {
      // 判断点击的删除按钮
      if (type === 'add') {
        // 添加逻辑
        this.$emit('handleAddDepts', this.treeData)
      } else if (type === 'edit') {
        console.log('编辑')
        this.$emit('handleEditDepts', this.treeData)
      } else {
        // 删除逻辑
        await this.$confirm('确认？删除')
        await delDepartments(this.treeData.id)
        // 删除成功
        this.$message.success('删除成功')
        this.$emit('getDepartmentsData')
        console.log('点击了确认')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 下拉菜单
.el-dropdown-link {
  font-size: 12px;
  // margin-right: 10px;
}
.gongsimingzi {
  font-size: 14px;
}
.fuzeren {
  font-size: 14px;
}
.rightBox {
  margin-right: 20px;
}
</style>
