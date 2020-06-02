import fetch from '@/api'

/**
 * 单文件上传
 * params:{file:文件}
 */

export function uploadFileSingle(params) {
    return fetch({
        method: 'post',
        url: `/attachments/uploadSigle`,
        params,
    })
}

/*
* 多文件上传
* params: [{file:文件}...]
* */
export function uploadFileMulti(params) {
    return fetch({
        method: 'post',
        url: `/attachments/uploadMulti`,
        params,
    })
}

// 文件下载
export function downloadFile(id) {
    return fetch({
        method: 'get',
        url: `/attachments/${id}/download`,
        responseType: 'blob'
    })
}
