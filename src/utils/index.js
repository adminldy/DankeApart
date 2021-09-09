import { get } from "../api";
//获取的当前定位城市
export const getCurrentCity = () => {
  //字符串转对象
  const localCity = JSON.parse(localStorage.getItem('city'))
  if (!localCity) {
    //通过IP定位获取当前城市信息
    const curCity = new BMapGL.LocalCity();
    return new Promise((resolve, reject) => {
      //里面是异步操作
      curCity.get(async res => {
        try {
          // console.log('当前城市信息', res)
          const result = await get(`/area/info?name=${res.name}`)
          // result.body => {label , value}
          //本地存储
          localStorage.setItem('city', JSON.stringify(result.body))
          //返回该函数数据
          resolve(result.body)
        } catch (err) {
          reject(err)
        }
      })
    })
  }else {
    return Promise.resolve(localCity)
  }
}