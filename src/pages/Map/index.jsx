import React from "react";
import s from './style.module.less'
import NavHeader from '@/components/NavHeader'
export default class Map extends React.Component {
  componentDidMount() {
    //初始化地图实例
    const map = new BMapGL.Map(s.container);
    //设置中心点坐标
    const point = new BMapGL.Point(116.404, 39.915);
    // 初始化地图
    map.centerAndZoom(point, 15)
  }
  render() {
    return <div className={s.map}>
      {/* 导航标题组件 */}
      <NavHeader title="地图找房"></NavHeader>
      {/* 地图容器元素 */}
      <div id={s.container}></div>
    </div>
  }
}