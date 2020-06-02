<template>
<div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
  <el-button type="primary" plain>上传Excel</el-button>
	<div class="row"><div class="col-xs-12">
		<form class="form-inline">
			<div class="form-group">
				<label for="file">Spreadsheet</label>
				<input type="file" class="form-control" id="file" :accept="SheetJSFT" @change="_change" />
			</div>
		</form>
	</div></div>
	<div class="row"><div class="col-xs-12">
		<button :disabled="data.length ? false : true" class="btn btn-success" @click="_export">Export</button>
	</div></div>
	<div class="row"><div class="col-xs-12">
		<div class="table-responsive">
			<table class="table table-striped">
				<thead><tr>
					<th v-for="c in cols" :key="c.key">{{c.name}}</th>
				</tr></thead>
				<tbody>
					<tr v-for="(r, key) in data" :key="key">
						<td v-for="c in cols" :key="c.key"> {{ r[c.key] }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div></div>
</div>
</template>

<script>
const _XLSX = require('xlsx')
const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX
const make_cols = refstr => Array(X.utils.decode_range(refstr).e.c + 1).fill(0).map((x, i) => ({name: X.utils.encode_col(i), key: i}))
/* see Browser download file example in docs */
function s2ab (s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}
// 文件下载
var saveAs = saveAs || (function (e) { 'use strict'; if (typeof e === 'undefined' || typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent)) { return } var t = e.document, n = function () { return e.URL || e.webkitURL || e }, r = t.createElementNS('http://www.w3.org/1999/xhtml', 'a'), o = 'download' in r, a = function (e) { var t = new MouseEvent('click'); e.dispatchEvent(t) }, i = /constructor/i.test(e.HTMLElement) || e.safari, f = /CriOS\/[\d]+/.test(navigator.userAgent), u = function (t) { (e.setImmediate || e.setTimeout)(function () { throw t }, 0) }, s = 'application/octet-stream', d = 1e3 * 40, c = function (e) { var t = function () { if (typeof e === 'string') { n().revokeObjectURL(e) } else { e.remove() } }; setTimeout(t, d) }, l = function (e, t, n) { t = [].concat(t); var r = t.length; while (r--) { var o = e['on' + t[r]]; if (typeof o === 'function') { try { o.call(e, n || e) } catch (a) { u(a) } } } }, p = function (e) { if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)) { return new Blob([String.fromCharCode(65279), e], {type: e.type}) } return e }, v = function (t, u, d) { if (!d) { t = p(t) } var v = this, w = t.type, m = w === s, y, h = function () { l(v, 'writestart progress write writeend'.split(' ')) }, S = function () { if ((f || m && i) && e.FileReader) { var r = new FileReader(); r.onloadend = function () { var t = f ? r.result : r.result.replace(/^data:[^;]*;/, 'data:attachment/file;'); var n = e.open(t, '_blank'); if (!n)e.location.href = t; t = undefined; v.readyState = v.DONE; h() }; r.readAsDataURL(t); v.readyState = v.INIT; return } if (!y) { y = n().createObjectURL(t) } if (m) { e.location.href = y } else { var o = e.open(y, '_blank'); if (!o) { e.location.href = y } }v.readyState = v.DONE; h(); c(y) }; v.readyState = v.INIT; if (o) { y = n().createObjectURL(t); setTimeout(function () { r.href = y; r.download = u; a(r); h(); c(y); v.readyState = v.DONE }); return }S() }, w = v.prototype, m = function (e, t, n) { return new v(e, t || e.name || 'download', n) }; if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) { return function (e, t, n) { t = t || e.name || 'download'; if (!n) { e = p(e) } return navigator.msSaveOrOpenBlob(e, t) } }w.abort = function () {}; w.readyState = w.INIT = 0; w.WRITING = 1; w.DONE = 2; w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null; return m }(typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || this.content)); if (typeof module !== 'undefined' && module.exports) { module.exports.saveAs = saveAs } else if (typeof define !== 'undefined' && define !== null && define.amd !== null) { define('FileSaver.js', function () { return saveAs }) }

const _SheetJSFT = [
  'xlsx', 'xlsb', 'xlsm', 'xls', 'xml', 'csv', 'txt', 'ods', 'fods', 'uos', 'sylk', 'dif', 'dbf', 'prn', 'qpw', '123', 'wb*', 'wq*', 'html', 'htm'
].map(function (x) { return '.' + x }).join(',')
export default {
  data () {
    return {
      data: ['SheetJS'.split(''), '1234567'.split('')],
      cols: [
				{name: 'A', key: 0},
				{name: 'B', key: 1},
				{name: 'C', key: 2},
				{name: 'D', key: 3},
				{name: 'E', key: 4},
				{name: 'F', key: 5},
				{name: 'G', key: 6}
      ],
      SheetJSFT: _SheetJSFT
    }
  },
  methods: {
    // 组止拖拽事件上传
    _suppress (evt) { evt.stopPropagation(); evt.preventDefault() },
    _drop (evt) {
      evt.stopPropagation(); evt.preventDefault()
      // 获取拖拽的文件元素
      const files = evt.dataTransfer.files
      if (files && files[0]) this._file(files[0])
    },
    _change (evt) {
      const files = evt.target.files
      if (files && files[0]) this._file(files[0])
    },
    _export (evt) {
			/* convert state to workbook */
      const ws = X.utils.aoa_to_sheet(this.data)
      const wb = X.utils.book_new()
      X.utils.book_append_sheet(wb, ws, 'SheetJS')
			/* generate X file */
      const wbout = X.write(wb, {type: 'binary', bookType: 'xlsx'})
			/* send to client */
      saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), 'sheetjs.xlsx')
    },
    _file (file) {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader()
      reader.onload = (e) => {
	  		/* Parse data */
        const bstr = e.target.result
        const wb = X.read(bstr, {type: 'binary'}) // 读取类型为文件类型的字节流
				/* Get first worksheet */
        const wsname = wb.SheetNames[0] // 获取第一个工作薄名称
        const ws = wb.Sheets[wsname] // 通过名称获取工作薄
        /* Convert array of arrays */
        const data = X.utils.sheet_to_json(ws, {header: 1}) // header: 参数为1时按行读取,0时第一行为键值读取
				/* Update state */
        this.data = data
        this.cols = make_cols(ws['!ref'])
      }
      reader.readAsBinaryString(file)
    }
  }
}
</script>