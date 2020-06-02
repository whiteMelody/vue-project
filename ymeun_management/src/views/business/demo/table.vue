<!--table-->
<template>
  <div class="pal24 par24 pat20 pab20">
    <div class="pa20 bg-white">
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="h32px"
        @click="handleDialogFormOpen(false)"
      >新增</el-button>

      <div class="clear3"></div>

      <div class="wb100">
        <base-list
          ref="demoTable"
          :condition="condition"
          :datas.sync="demoList"
          :pageSearch="pageSearch"
          :isPaging="true"
        >
          <el-form
            :inline="true"
            :model="condition"
            class="search-form"
            slot="search"
            label-width="120px"
          >
            <el-form-item label="时间范围">
              <date-slot :dateTime.sync="dateTime"></date-slot>
            </el-form-item>
            <el-form-item label="选择顾问">
              <el-select v-model="condition.select" placeholder="选择顾问" readonly clearable>
                <el-option
                  v-for="item in $store.getters.counselorMap"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="输入顾问">
              <auto-search-counselor
                v-model.trim="condition['counselor_id']"
                placeholder="请输入顾问"
                @matchRecord="v=>{condition.counselor_id=v.key}"
                :initValue="counselorName"
                clearable
              ></auto-search-counselor>
            </el-form-item>
            <el-form-item label="输入顾客">
              <auto-search-client
                v-model.trim="condition['client_id']"
                placeholder="请输入顾客姓名"
                @matchRecord="v=>{condition.client_id=v.key}"
                :initValue="counselorName"
                clearable
              ></auto-search-client>
            </el-form-item>

            <el-form-item label="渠道">
              <el-select v-model="condition.select1" placeholder="选择渠道" readonly clearable>
                <el-option
                  v-for="item in $store.getters.channelListMap"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="二级渠道" v-if="condition.select1">
              <el-select v-model="condition.select2" placeholder="选择二级渠道" readonly clearable>
                <el-option
                  v-for="item in $store.getters.getChannelChild(condition.select1.id)"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="loadData" class="h32px"></el-button>
          </el-form>

          <el-table slot="list" :data="demoList" stripe border>
            <el-table-column prop="id" align="center" label="序号">
              <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>

            <el-table-column prop="name" align="center" label="名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="mobile" align="center" label="手机号">
              <template slot-scope="scope">{{ scope.row.mobile }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <p class="fc-blue" @click="handleDialogFormOpen(true,scope.row)">修改</p>
              </template>
            </el-table-column>
          </el-table>
        </base-list>
      </div>

      <div class="clear0"></div>

      <edit-form ref="virtualAccountForm" @load="loadData"></edit-form>
    </div>
  </div>
</template>


<script>
import { getConsumeList } from "@/assets/api/demo/demo";

//日期范围组件
import dateSlot from "@/components/date/dateSlot";

//自动查询顾客组件
import autoSearchClient from "@/components/autocomplete/autoSearchClient";

//新增&编辑弹窗
import editForm from "./editForm";

export default {
  components: { dateSlot, editForm, autoSearchClient },
  data() {
    return {
      counselorName: "张三疯", //顾问初始值
      dateTime: [
        this.$base.dateTimeToDate(new Date(), "startTime"),
        this.$base.dateTimeToDate(new Date(), "endTime")
      ],
      condition: {
        startTime: this.$base.dateTimeToDate(new Date(), "startTime"),
        endTime: this.$base.dateTimeToDate(new Date(), "endTime")
      }, // 查询条件
      demoList: [], // table数组
      pageSearch: getConsumeList // 分页查询api接口
    };
  },
  mounted() {},
  methods: {
    loadData() {
      this.$refs.demoTable.loadData();
    },

    //清空
    clearSelectOption() {
      this.condition = {};
    },

    // 打开开户form表单,如果是编辑,则给form赋值
    handleDialogFormOpen(isEdit, item) {
      if (isEdit) {
        this.$refs.virtualAccountForm.form = JSON.parse(JSON.stringify(item));
        this.$refs.virtualAccountForm.isEdit = true;
      }
      this.$refs.virtualAccountForm.dialogForm = true;
    }
  },

  watch: {
    dateTime(c, o) {
      this.condition.startTime = c[0];
      this.condition.endTime = c[1];
    }
  }
};
</script>

