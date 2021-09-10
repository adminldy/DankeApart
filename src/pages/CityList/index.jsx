import React, { createRef } from "react"
import { Toast } from "antd-mobile"
import { List, AutoSizer } from 'react-virtualized'
import s from './style.module.less'
import { get, post } from "@/api"
import { getCurrentCity } from "../../utils"
import NavHeader from '@/components/NavHeader'
const TITILE_HEIGHT = 36
const NAME_HEIGHT = 50
//有房源城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']
export default class CityList extends React.Component {
  state = {
    cityList: {},
    cityIndex: [],
    //指定右侧索引列表高亮
    activeIndex: 0,
    listComponent: createRef()
  }
  async componentDidMount() {
    await this.getCityList()
    //调用measureAllRows 提前计算 List中每一行高度， 实现scrollToRow的精确跳转
    // 调用这个方法的时候 需要保证List组件中已经有数据了 如果List组件数据为空 则会报错
    this.state.listComponent.current.measureAllRows()
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
  //改变城市
  changeCity({label, value}) {
    if(HOUSE_CITY.indexOf(label) !== -1) {
      localStorage.setItem('city', JSON.stringify({label, value}))
      this.props.history.go(-1)
    }else {
      Toast.info('该城市暂无房源数据', 1, null, false)
    }
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
    // 获取每一行字母索引
    const { cityIndex, cityList } = this.state
    const letter = cityIndex[index]
    return (
      <div key={key} style={style} className={s.city} >
        <div className={s.title}>{this.formatCityIndex(letter)}</div>
        <div className={s.name}>{cityList[letter].map(item => <p key={item.label} onClick={() => this.changeCity(item)}>{item.label}</p>)}</div>
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
  //创建动态计算一行高度的方法
  getRowHeight = ({index}) => {
    // 索引标题高度 + 城市数量 * 城市名称的高度
    const { cityList, cityIndex } = this.state 
    const itemHeight = TITILE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    return itemHeight
  }
  // 封装右侧索引列表方法
  renderCityIndex() {
    const { cityIndex, activeIndex } = this.state 
    return cityIndex.map((item,index) => <li className={s.cityIndexItem} key={item} onClick={() => {
      this.state.listComponent.current.scrollToRow(index)
    }}>
      <span className={activeIndex === index ? s.indexActive : ''}>{item === 'hot' ? '热': item.toUpperCase()}</span>
    </li>)
  }
  //用于获取list组件中渲染行信息
  onRowsRendered = ({ startIndex }) => {
    const { activeIndex } = this.state
    if(activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }
  render() {
    return <div className={s.cityList}>
      <NavHeader title="城市列表" style={{marginTop: '-45px'}}></NavHeader>
      {/* 城市列表 */}
      <AutoSizer>
        {({ width, height }) => <List
          ref={this.state.listComponent}
          width={width}
          height={height}
          rowCount={this.state.cityIndex.length}
          rowHeight={this.getRowHeight}
          rowRenderer={this.rowRenderer}
          onRowsRendered={this.onRowsRendered}
          scrollToAlignment="start"
        />
        }
      </AutoSizer>
      {/* 右侧索引列表 */}
      <ul className={s.cityIndex}>
        {this.renderCityIndex()}
      </ul>
    </div>
  }
}