<template>
  <div class="wb100">
    <el-autocomplete
        ref="autocomplete"
        v-model="searchValue"
        :fetch-suggestions="querySearchAsync"
        :placeholder="placeholder"
        @select="handleSelect"
        :trigger-on-focus="true">
    </el-autocomplete>

  </div>
</template>

<script>

    import { getListBySearch } from  "@/chain/assets/api/store/store"

    import { formatArrayToMap, formatArrayToStringMap } from "@/chain/utils/format"

    export default {
      name: 'autoSearchCommodity',
        data() {
          return {
            restaurants: [],
            list: [],
            searchValue: this.initValue ? this.initValue : '',
            timeout: 0,
            cb: null,
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
            default: 'title',  //title fullname code
          },
          // searchkey: {
          //   type: String,
          //   default: 'autoSearchCommodity',
          // },
          // selectlist: {
          //   type: Array,
          //   default: [],
          // },
        },
        methods: {
          querySearchAsync(queryString, cb) {
            let restaurants = this.restaurants;
            let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            cb(results);
            this.cb = cb
          },
          createStateFilter(queryString) {
            return (state) => {
              if(typeof(state.value) === 'String' || typeof(state.value) === 'string'){
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
              }
            };
          },

          setInitValue(val){
            this.searchValue = val
          },

          loadData(){
            let _params = {}
            if(this.type == 'title') _params = {title: this.searchValue}
            if(this.type == 'fullname') _params = {fullname: this.searchValue}
            if(this.type == 'code') _params = {code: this.searchValue}
            getListBySearch(_params).then((res)=>{
              if(res.status == 0){
                let _list = res.data.list
                // for(let i=0; i<_list.length; i++){
                //   for(let j=0; j<this.selectlist.length; j++){
                //     let _t = _list.find(item2 => item2.id == this.selectlist[j].id)
                //     if(_t){
                //       _list.splice(i, 1)
                //     }
                //   }
                // }
                if(this.type == 'title') this.restaurants = formatArrayToMap(_list, 'id', 'title')
                if(this.type == 'fullname') this.restaurants = formatArrayToMap(_list, 'id', 'fullname')
                if(this.type == 'code') this.restaurants = formatArrayToMap(_list, 'id', 'code')
                this.list = _list
                this.$emit("changed", {
                  kw: this.searchValue,
                  list: res.data.list,
                })
                if(this.cb){
                  this.querySearchAsync(this.searchValue, this.cb)
                }
              }else{
                console.log(res.msg)
                this.$emit("changed", {
                  kw: '',
                  list: [],
                })
              }
            }).catch(error=>{
              console.log(error)
              this.$emit("changed", {
                kw: '',
                list: [],
              })
            })
          },

          handleSelect(item){
          //   let _t = this.list.find(item2 => item2.id == item.key)
          //   _t.searchkey = this.searchkey
          //   let $children = this.$parent.$children
          //   for(let i=0; i<$children.length; i++){
          //     if($children[i].searchkey){
          //       if($children[i].searchkey == this.searchkey){
          //         if($children[i].type == 'name'){
          //           $children[i].setInitValue(_t.title)
          //         }
          //         if($children[i].type == 'fullName'){
          //           $children[i].setInitValue(_t.fullname)
          //         }
          //         if($children[i].type == 'code'){
          //           $children[i].setInitValue(_t.code)
          //         }
          //       }
          //     }
          //   }
          //   this.$emit("selectd", {
          //     kw: this.searchValue,
          //     item: _t,
          //     rowId: this.searchkey.substring(10)
          //   })
          },

        },

        mounted() {
          if(!this.$base.isNull(this.initValue)){
            this.loadData()
          }

          if(this.type == 'title') this.placeholder = '请输入商品简称'
          if(this.type == 'fullname') this.placeholder = '请输入商品名称'
          if(this.type == 'code') this.placeholder = '请输入商品编码'

        },
        watch: {
          searchValue(curVal, oldVal) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              this.loadData()
            }, 1);
          },
          initValue:{
            handler(newValue, oldValue){
              this.searchValue = newValue
            },
            deep:true
          }
        }
    }
</script>
