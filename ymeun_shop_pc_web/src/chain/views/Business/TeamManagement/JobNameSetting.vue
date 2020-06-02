<template>
  <div class="wb100">
    <p class="lh40px h40px"><span class="fl f14px fc-gray4">岗位名称设置</span></p>
    <div class="clear-f2"></div>

    <div class="clear4"></div>

    <div class="wb100">
      <div class="w400px center">
        <el-form ref="form" :model="form" class="add-form" label-width="100px">
          <div class="wb100">
            <el-form-item label="店长" prop="店长">
              <el-input type="text" v-model.trim="form.shopkeeper" placeholder="请输入新名称" clearable></el-input>
            </el-form-item>
          </div>
          <div class="wb100">
            <el-form-item label="顾问" prop="顾问">
              <el-input type="text" v-model.trim="form.adviser" placeholder="请输入新名称" clearable></el-input>
            </el-form-item>
          </div>
          <div class="wb100">
            <el-form-item label="美容师" prop="美容师">
              <el-input type="text" v-model.trim="form.technician" placeholder="请输入新名称" clearable></el-input>
            </el-form-item>
          </div>
          <div class="wb100">
            <el-form-item label="前台" prop="前台">
              <el-input type="text" v-model.trim="form.reception" placeholder="请输入新名称" clearable></el-input>
            </el-form-item>
          </div>
          <!--            <div class="wb100">-->
          <!--              <el-form-item label="开发人员" prop="开发人员">-->
          <!--                <el-input type="text" v-model.trim="form.name" placeholder="请输入新名称" clearable></el-input>-->
          <!--              </el-form-item>-->
          <!--            </div>-->

          <div class="clear10"></div>

          <div class="wb100">
            <template v-if="disabled">
              <el-button type="primary" class="fr" disabled>保存中...</el-button>
            </template>
            <template v-else>
              <el-button type="primary" @click="save" class="fr">保存设置</el-button>
            </template>
          </div>
        </el-form>
      </div>

      <div class="clear0"></div>
    </div>
  </div>
</template>

<script>
import {getInfo, postEdit} from "@/chain/assets/api/TeamManagement/index";

export default {
  name: "JobNameSetting",
  components: {},
  data() {
    return {
      form: {
        // adviser: "",
        // reception: "",
        // shopkeeper: "",
        // technician: ""
      },
      disabled: false,
      Whether: false
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      getInfo()
        .then(res => {
          if (res.status == 0) {
            this.form = res.data;
            // this.form.adviser = res.data.adviser;
            // this.form.reception = res.data.reception;
            // this.form.shopkeeper = res.data.shopkeeper;
            // this.form.technician = res.data.technician;
            if (this.Whether) {
              this.$store.commit("SET_ROLENAME", res.data);
            }
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
        });
    },
    save() {
      this.disabled = true;
      postEdit(this.form)
        .then(res => {
          if (res.status == 0) {
            this.$message({
              showClose: true,
              message: "设置别名成功",
              type: "success"
            });
            this.disabled = false;
            this.Whether = true;
            this.list();
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
            this.disabled = false;
          }
        })
        .catch(error => {
          this.$message({
            showClose: true,
            message: error,
            type: "error"
          });
          this.disabled = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
</style>
