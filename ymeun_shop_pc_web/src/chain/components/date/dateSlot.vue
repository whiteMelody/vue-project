<template>
    <div>

        <el-date-picker
                v-model="selfDateTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="yyyy-MM-dd"
                :value-format="dateType"
                :clearable="false">
        </el-date-picker>
    </div>
</template>

<script>

    export default {
        name: 'date-slot',
        props: {
            dateTime: {
                type: Array,
                require: true
            },
            // yyyy-MM-dd或者yyyy-MM-dd HH:mm:ss两种
            dateType: {
                type: String,
                default: 'yyyy-MM-dd'
            },

        },
        data() {
            return {}
        },
        computed: {
            selfDateTime: {
                set(val) {
                    let _tmp = []
                    _tmp.push(val[0] + ' 00:00:00')
                    _tmp.push(val[1] + ' 23:59:59')
                    this.$emit('update:dateTime', _tmp)
                },
                get() {
                    let _tmp = []
                    _tmp.push(this.dateTime[0] + '00:00:00')
                    _tmp.push(this.dateTime[1] + '23:59:59')
                    return _tmp
                }
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 360px;
    }
    
</style>
