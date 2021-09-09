import React from "react"
import { NavBar } from "antd-mobile"
import { List, AutoSizer } from 'react-virtualized'
import s from './style.module.less'
import { get, post } from "@/api"
import { getCurrentCity } from "../../utils"

export default class CityList extends React.Component {
  state = {
    cityList: {},
    cityIndex: []
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
    this.setState({ cityList, cityIndex })
  }
  //渲染每一行数据的渲染函数
  //函数的返回值就表示最终渲染在页面的内容
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const { cityIndex } = this.state
    const letter = cityIndex[index]
    return (
      <div key={key} style={style} className={s.city} >
        <div className={s.title}>{this.formatCityIndex(letter)}</div>
        <div className={s.name}>上海</div>
      </div>
    );
  }
  //格式化字母
  formatCityIndex = (letter) => {
    switch (letter) {
      case '#':
        return '当前城市'
      case 'hot':
        return '热门城市'
      default:
        return letter.toUpperCase()
    }
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
      {/* 城市列表 */}
      <AutoSizer>
        {({ width, height }) => <List
          width={width}
          height={height}
          rowCount={this.state.cityIndex.length}
          rowHeight={50}
          rowRenderer={this.rowRenderer}
        />
        }
      </AutoSizer>
    </div>
  }
}