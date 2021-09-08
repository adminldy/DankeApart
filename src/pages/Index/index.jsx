import React from "react";
//导入组件
import { Carousel, WingBlank, Flex } from 'antd-mobile';

//导入axios
import { get, post} from '../../api'
//引入cssmodules
import s from './style.module.less'
//导入导航菜单图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
export default class Index extends React.Component {
  state = {
    swipers: []
  }
  async getSwiper() {
    const res = await get('/home/swiper')
    console.log(res.body)
    this.setState(() => {
      return {
        swipers: res.body
      }
    })
  }
  componentDidMount() {
    // simulate img loading
    this.getSwiper()
  }
  //渲染轮播图结构
  renderSwipers() {
    return this.state.swipers.map(item => (
      <a
        key={item.id}
        href="http://www.baidu.com"
        style={{ display: 'inline-block', width: '100%', height: '212px' }}
      >
        <img
          src={`http://localhost:8080${item.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'));
            this.setState({ imgHeight: 'auto' });
          }}
        />
      </a>
    ))
  }
  render() {
    return (
      <div className={s.index}>
        <Carousel
          autoplay={true}
          autoplayInterval={3000}
          infinite
        >
          {this.renderSwipers()}
        </Carousel>
        {/* 导航菜单 */}
        <Flex className={s.nav}>
          <Flex.Item>
            <img src={Nav1} alt="" />
            <h2>整租</h2>
          </Flex.Item>
          <Flex.Item>
            <img src={Nav2} alt="" />
            <h2>合租</h2>
          </Flex.Item>
          <Flex.Item>
            <img src={Nav3} alt="" />
            <h2>地图导航</h2>
          </Flex.Item>
          <Flex.Item>
            <img src={Nav4} alt="" />
            <h2>去出租</h2>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}