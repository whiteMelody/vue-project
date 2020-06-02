const _XLSX = require('xlsx')
const X = typeof XLSX !== 'undefined' ? XLSX : _XLSX
function s2ab (s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}
// 文件下载
var saveAs = saveAs || (function (e) { 'use strict'; if (typeof e === 'undefined' || typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent)) { return } var t = e.document, n = function () { return e.URL || e.webkitURL || e }, r = t.createElementNS('http://www.w3.org/1999/xhtml', 'a'), o = 'download' in r, a = function (e) { var t = new MouseEvent('click'); e.dispatchEvent(t) }, i = /constructor/i.test(e.HTMLElement) || e.safari, f = /CriOS\/[\d]+/.test(navigator.userAgent), u = function (t) { (e.setImmediate || e.setTimeout)(function () { throw t }, 0) }, s = 'application/octet-stream', d = 1e3 * 40, c = function (e) { var t = function () { if (typeof e === 'string') { n().revokeObjectURL(e) } else { e.remove() } }; setTimeout(t, d) }, l = function (e, t, n) { t = [].concat(t); var r = t.length; while (r--) { var o = e['on' + t[r]]; if (typeof o === 'function') { try { o.call(e, n || e) } catch (a) { u(a) } } } }, p = function (e) { if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)) { return new Blob([String.fromCharCode(65279), e], {type: e.type}) } return e }, v = function (t, u, d) { if (!d) { t = p(t) } var v = this, w = t.type, m = w === s, y, h = function () { l(v, 'writestart progress write writeend'.split(' ')) }, S = function () { if ((f || m && i) && e.FileReader) { var r = new FileReader(); r.onloadend = function () { var t = f ? r.result : r.result.replace(/^data:[^;]*;/, 'data:attachment/file;'); var n = e.open(t, '_blank'); if (!n)e.location.href = t; t = undefined; v.readyState = v.DONE; h() }; r.readAsDataURL(t); v.readyState = v.INIT; return } if (!y) { y = n().createObjectURL(t) } if (m) { e.location.href = y } else { var o = e.open(y, '_blank'); if (!o) { e.location.href = y } }v.readyState = v.DONE; h(); c(y) }; v.readyState = v.INIT; if (o) { y = n().createObjectURL(t); setTimeout(function () { r.href = y; r.download = u; a(r); h(); c(y); v.readyState = v.DONE }); return }S() }, w = v.prototype, m = function (e, t, n) { return new v(e, t || e.name || 'download', n) }; if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) { return function (e, t, n) { t = t || e.name || 'download'; if (!n) { e = p(e) } return navigator.msSaveOrOpenBlob(e, t) } }w.abort = function () {}; w.readyState = w.INIT = 0; w.WRITING = 1; w.DONE = 2; w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null; return m }(typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || this.content)); if (typeof module !== 'undefined' && module.exports) { module.exports.saveAs = saveAs } else if (typeof define !== 'undefined' && define !== null && define.amd !== null) { define('FileSaver.js', function () { return saveAs }) }

export const exportExcel = function (fileName, cols, data) {
  let exportData = []
  exportData[0] = cols
  exportData = exportData.concat(data)
  const ws = X.utils.aoa_to_sheet(exportData)
  const wb = X.utils.book_new()
  X.utils.book_append_sheet(wb, ws, 'SheetJS')
  const wbout = X.write(wb, {type: 'binary', bookType: 'xlsx'})
  saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), `${fileName}.xlsx`)
}
