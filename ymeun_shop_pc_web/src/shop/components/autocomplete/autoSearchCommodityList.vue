<template>
  <div class="wb100">
      <el-input @keyup.native="myKeyUp"
                @blur="visible = false"
                v-model="searchValue"
                :placeholder="placeholder"></el-input>
      <el-popover
              placement="bottom"
              width="600"
              trigger="manual"
              v-model="visible">
        <el-table :data="list" v-loading="loadList" @row-click="handleSelect">
          <el-table-column align="center" label="商品编码">
            <template slot-scope="scope">
              {{scope.row.code}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品名称">
            <template slot-scope="scope">
              {{scope.row.fullname}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品简称">
            <template slot-scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品规格">
            <template slot-scope="scope">
              {{scope.row.specifications.title}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品单位">
            <template slot-scope="scope">
              {{scope.row.unit.title}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="供应商">
            <template slot-scope="scope">
              {{scope.row.business.title}}
            </template>
          </el-table-column>
        </el-table>
      </el-popover>
  </div>
</template>

<script>

    import { getListBySearch } from  "@/shop/assets/api/store/store"

    export default {
      name: 'autoSearchCommodityList',
        data() {
          return {
            visible: false,
            timeout: 0,
            searchValue: this.initValue ? this.initValue : '',
            loadList: false,
            list: [],
            placeholder: '请输入关键字',
          };
        },
        props: {
          initValue: {
            type: String,
            default: '',
          },
          type: {
            type: String,
            default: 'name',  //name fullname code
          },
          searchkey: {
            type: String,
            default: 'autoSearchCommodity',
          },
          // selectlist: {
          //   type: Array,
          //   default: [],
          // },
        },
        methods: {
          myKeyUp() {
            clearTimeout(this.timeout)
            this.visible = true
            this.loadList = true
            this.timeout = setTimeout(() => {
              this.loadData()
            }, 500)
          },

          loadData() {
            let _params = {}
            if (this.type == 'name') _params = {title: this.searchValue}
            if (this.type == 'fullname') _params = {fullname: this.searchValue}
            if (this.type == 'code') _params = {code: this.searchValue}

            this.loadList = true
            getListBySearch(_params).then((res) => {
              this.loadList = false
              if (res.status == 0) {
                let _list = res.data.list
                // for (let i = 0; i < _list.length; i++) {
                //   let _flag = false
                //   for (let j = 0; j < this.selectlist.length; j++) {
                //     if(_list[i].id == this.selectlist[j].id){
                //       _flag = true
                //     }
                //   }
                //   if(_flag){
                //     _list.splice(i, 1)
                //   }
                // }

                console.log(_list)

                this.list = _list
              } else {
                console.log(res.msg)
              }
            }).catch(error => {
              this.loadList = false
              console.log(error)
            })
          },

          setInitValue(val) {
            this.searchValue = val
          },

          handleSelect(_t){
            _t.searchkey = this.searchkey
            let $children = this.$parent.$children
            for(let i=0; i<$children.length; i++){
              if($children[i].searchkey){
                if($children[i].searchkey == this.searchkey){
                  if($children[i].type == 'name'){
                    $children[i].setInitValue(_t.title)
                  }
                  if($children[i].type == 'fullname'){
                    $children[i].setInitValue(_t.fullname)
                  }
                  if($children[i].type == 'code'){
                    $children[i].setInitValue(_t.code)
                  }
                }
              }
            }
            this.$emit("selectd", {
              kw: this.searchValue,
              item: _t,
              rowId: this.searchkey.substring(10)
            })
          },

        },

        mounted() {
          if(!this.$base.isNull(this.initValue)){
            this.loadData()
          }

          if(this.type == 'name') this.placeholder = '请输入商品简称'
          if(this.type == 'fullname') this.placeholder = '请输入商品名称'
          if(this.type == 'code') this.placeholder = '请输入商品编码'

        },
        watch: {
          // searchValue(curVal, oldVal) {
          //   clearTimeout(this.timeout);
          //   this.timeout = setTimeout(() => {
          //     this.loadData()
          //   }, 200);
          // },
          initValue:{
            handler(newValue, oldValue){
              this.searchValue = newValue
            },
            deep:true
          }
        }
    }
</script>
