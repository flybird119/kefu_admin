import store from '../store'
import * as qiniu from 'qiniu-js'
var subscription;
export default function(file, observer){
    if(!file) return
    if(subscription) subscription.unsubscribe()
    const uploadToken = store.getters.uploadToken || {}
    // 七牛云
    if(uploadToken.mode == 1){
        const fileName = parseInt(Math.random() * 10000 * new Date().getTime()) + file.name.substr(file.name.lastIndexOf('.'))
        const observable = qiniu.upload(file, fileName, uploadToken.secret, {}, {})
        subscription = observable.subscribe(observer)
    }
    return subscription
} 