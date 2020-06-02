import fetch from '@/assets/api'

/**
 * 历史咨询
 * @param params
 */
export function getHistoricalConsultation(params) {
    return fetch({
        method: 'post',
        url: `/process/consultation/HistoryZixunByCustomerId`,
        params,
    })
}