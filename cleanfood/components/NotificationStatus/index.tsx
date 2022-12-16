import { notification } from 'antd'

export function openSuccess(notiMess: string, notiDuration = 2, notiPlacement?: string) {
    notification.success({
        message: notiMess || 'Success',
        placement: 'bottomRight',
        duration: notiDuration
    })
}

export function openError(notiMess: string, notiDuration = 2, notiPlacement?: string) {
    notification.error({
        message: notiMess || 'Error',
        placement: 'bottomRight',
        duration: notiDuration
    })
}

export function openWarning(notiMess: string, notiDuration = 2, notiPlacement?: string) {
    const key = `open${Date.now()}`
    notification.warning({
        message: notiMess || 'Warning',
        placement: 'bottomRight',
        duration: notiDuration,
        key: key
    })
}