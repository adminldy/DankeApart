import React from "react"
import { NavBar } from "antd-mobile"
import s from './style.module.less'
import { get, post } from "@/api"
import { getCurrentCity } from "../../utils"
export default class CityList extends React.Component {
  state = {
    cityList: []
  }
  componentDidMount() {
    this.getCityList()
  }
  async getCityList() {
    let res = await get('/area/city?level=1')
    let { cityList, cityIndex } = this.formatCityList(res.body)
    const hotres = await get('/area/hot')
    cityList['hot'] = hotres.body
    cityIndex.unshift('hot')
    let curCity = await getCurrentCity()
    cityList['#'] = [curCity]
    cityIndex.unshift('#')
  }
  //格式化城市列表
  formatCityList = (list) => {
    const cityList = {}
    list.forEach(item => {
      let s = item.short.slice(0, 1)
      if (cityList[s]) {
        cityList[s].push(item)
      } else {
        cityList[s] = [item]
      }
    })
    const cityIndex = Object.keys(cityList).sort()
    return {
      cityList,
      cityIndex
    }
  }
  render() {
    return <div className={s.cityList}>
      <NavBar
        mode="light"
        icon={<i className="iconfont icon-back"></i>}
        onLeftClick={() => this.props.history.go(-1)}
      >NavBar</NavBar>
    </div>
  }
}