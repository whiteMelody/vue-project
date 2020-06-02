<template>
    <el-input type="text" v-model.trim="num" @blur="handleBlurNum"
              clearable></el-input>
</template>

<script>
    export default {
        model: {
            event: 'select'
        },
        name: "input-numbers",
        data() {
            return {
                num: ''
            }
        },
        methods: {
            handleBlurNum(event) {
                let val = event.target.value
                val = val.replace(/,/g, "")
                let emitVal = val.replace(/,/g, "")
                if (/^[1-9]\d*$/.test(val)) {
                    this.num = val.replace(/(?=(?!\b)(?:\d{3})+(?!\d))/g, ',');
                    this.$emit('select', emitVal)
                }
            }
        }
    }
</script>

<style scoped>

</style>
