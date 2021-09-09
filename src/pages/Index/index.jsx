import React from "react";
//导入组件
import { Carousel, WingBlank, Flex, Grid } from 'antd-mobile';

//导入axios
import { get, post } from '../../api'
//引入cssmodules
import s from './style.module.less'
//导入导航菜单图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
const navs = [{
  id: 1,
  img: Nav1,
  title: '整租',
  path: '/home/list'
}, {
  id: 2,
  img: Nav2,
  title: '合租',
  path: '/home/list'
}, {
  id: 3,
  img: Nav3,
  title: '地图导航',
  path: '/map'
}, {
  id: 4,
  img: Nav4,
  title: '去出租',
  path: '/rent'
}]
//获取地理位置信息
navigator.geolocation.getCurrentPosition(position => {
  console.log(position)
})
const baseUrl = 'http://localhost:8080'
export default class Index extends React.Component {
  state = {
    //轮播图数据
    swipers: [],
    //租房小组数据
    groups: [],
    //最新咨询数据
    news: [],
    //是否加载轮播图
    isSwiperLoaded: false,
  }
  async getSwiper() {
    const res = await get('/home/swiper')
    this.setState(() => {
      return {
        swipers: res.body,
        isSwiperLoaded: true
      }
    })
  }
  async getGroups() {
    const res = await get('/home/groups?area=AREA|88cff55c-aaa4-e2e0')
    this.setState({ groups: res.body })
  }
  async getNews() {
    const res = await get('/home/news?area=AREA|88cff55c-aaa4-e2e0')
    this.setState({ news: res.body })
  }
  componentDidMount() {
    // simulate img loading
    this.getSwiper()
    this.getGroups()
    this.getNews()
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
          src={`${baseUrl}${item.imgSrc}`}
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
  //渲染导航结构
  renderNavs() {
    return navs.map(item => <Flex.Item key={item.id} onClick={() => this.props.history.push(item.path)}>
      <img src={item.img} alt="" />
      <h2>{item.title}</h2>
    </Flex.Item>)
  }
  //渲染最新资讯
  renderNews() {
    return this.state.news.map(item => (
      <div key={item.id} className={s.newsItem}>
        <div className={s.imgWrap}>
          <img src={baseUrl + item.imgSrc} alt="" />
        </div>
        <Flex direction="column" justify='between' className={s.rightWrap}>
          <h4 className={s.title}>{item.title}</h4>
          <Flex className={s.bottom} justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
  render() {
    return (
      <div className={s.index}>
        <div className={s.swiper}>
          {
            /* 轮播图渲染完成在加载 */
            this.state.isSwiperLoaded ? <Carousel
              autoplay={true}
              autoplayInterval={3000}
              infinite
            >
              {this.renderSwipers()}
            </Carousel> : ''
          }
          {/* 搜索框 */}
          <Flex className={s.searchBox}>
            <Flex className={s.search}>
              <div className={s.location} onClick={() => this.props.history.push('/citylist')}>
                <span className={s.name}>上海</span>
                <i className="iconfont icon-arrow"></i>
              </div>
              <div className={s.form} onClick={() => this.props.history.push('/search')}>
                <i className="iconfont icon-seach"></i>
                <span className="text">请输入小区或地址</span>
              </div>
            </Flex>
            <i className="iconfont icon-map" onClick={() => this.props.history.push('/map')}></i>
          </Flex>
        </div>
        {/* 导航菜单 */}   
        <Flex className={s.nav}>
          {this.renderNavs()}
        </Flex>
        {/* 租房小组 */}
        <div className={s.rentGroup}>
          <div className={s.header}>
            <b>租房小组</b>
            <span>更多</span>
          </div>
          {/* Grid组件 */}
          <Grid data={this.state.groups} columnNum={2} renderItem={(item, index) => (
            <Flex justify="around" className={s.groupItem}>
              <div className={s.desc}>
                <p className={s.title}>{item.title}</p>
                <span className={s.info}>{item.desc}</span>
              </div>
              <img src={baseUrl + item.imgSrc} alt="" style={{ width: '50px', height: '50px' }} />
            </Flex>
          )} square={false} hasLine={false} />
        </div>
        {/* 最新资讯 */}
        <div className={s.news}>
          <div className={s.newsHeader}>
            <span>最新资讯</span>
          </div>
          {this.renderNews()}
        </div>
      </div>
    );
  }
}