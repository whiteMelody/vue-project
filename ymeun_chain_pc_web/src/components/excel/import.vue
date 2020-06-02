<template>
    <div>
        <el-button @click="handleClick" type="primary" plain>导入</el-button>
        <input type="file" class="el-upload__input" ref="upload" :accept="SheetJSFT" @change="changeFile"/>
    </div>
</template>

<script>
    const X = require('xlsx')

    import { getExcelTemplates } from '@/api/excel/index'

    export default {
      props: {
        cxcelCode: {
          type: String,
          required: true
        }
      },
      computed: {
        charTrans () {
          let map = new Map()
          this.mapping.forEach(item => {
            map.set(item.chineseTitle, item.englishTitle)
          })
          return map
        },
        verifyField () {
          let map = new Map()
          this.mapping.forEach(item => {
            map.set(item.englishTitle, item)
          })
          return map
        }
      },
      data () {
        return {
          SheetJSFT: ['xlsx', 'xls'].map(function (x) {
            return '.' + x
          }).join(','),
          data: [],
          mapping: [],
          errorInfos: []
        }
      },
      mounted () {
        this.loadExcelTemplate()
      },
      methods: {
        loadExcelTemplate () {
          getExcelTemplates({ search_EQ_code: this.cxcelCode }).then(reponse => {
            this.mapping = reponse.data.aaData[0].excelModelRules
          })
        },
        handleClick () {
          this.$refs.upload.click()
        },
        changeFile (evt) {
          const files = evt.target.files
          if (files && files[0]) this.analysisExcel(files[0])
          this.$refs.upload.value = ''
        },
        analysisExcel (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const bstr = e.target.result
            const wb = X.read(bstr, { type: 'binary' }) // 读取类型为文件类型的字节流
            const wsname = wb.SheetNames[0] // 获取第一个工作薄名称
            const ws = wb.Sheets[wsname] // 通过名称获取工作薄
            const data = X.utils.sheet_to_json(ws, { defval: '', header: 0 }) // header: 参数为1时按行读取,0时第一行为键值读取 defval:使用空字符串替代未填写数据
            this.data = data
            this.generateData()
          }
          reader.readAsBinaryString(file)
        },
        generateData () {
          let uploadData = []
          this.errorInfos = []
          let vue = this
          this.data.forEach((item, index) => {
            let waitPush = {}
            for (let key in item) {
              let code = vue.charTrans.get(key)
              waitPush[code] = vue.verify(item[key], vue.verifyField.get(code), index)
            }
            uploadData.push(waitPush)
          })
          if (this.errorInfos.length > 0) {
            let strError = ''
            this.errorInfos.forEach(errorInfo => {
              strError += `<strong>${errorInfo}</strong>`
            })
            this.$notify.error({
              title: '上传excel失败',
              dangerouslyUseHTMLString: true,
              message: strError,
              duration: 0
            })
          } else {
            this.$emit('getUploadData', uploadData)
          }
        },
        verify (val, filed, index) {
          if (filed === undefined) {
            this.$notify.error({
              title: '上传excel失败',
              message: '请选择对应模板上传',
              duration: 0
            })
          }
          if (filed.isMust) {
            if (!val) {
              this.errorInfos.push(`${filed.chineseTitle}为必填选项!第${index + 1}行未填写!`)
            } else {

            }
          }
          return val
                // if (rule.type) {
                //   if (rule.type === 'Int') {
                //     parseInt(val)
                //   } else if (rule.type === 'Float') {
                //     return parseFloat(val)
                //   } else {
                //     return val
                //   }
                // } else {
                // }
        }
      }
    }
</script>