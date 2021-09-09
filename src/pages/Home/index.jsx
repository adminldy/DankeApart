import React from "react"
import { Route } from 'react-router-dom'
import News from "../News"
import Index from "../Index";
import Profile from "../Profile";
import HouseList from "../HouseList";
import { TabBar } from 'antd-mobile';
import './index.css'
const TabBarItems = [{
  title: "首页",
  icon: "icon-ind",
  path: "/home"
}, {
  title: "找房",
  path: "/home/list",
  icon: "icon-findHouse"
}, {
  title: "资讯",
  path: "/home/news",
  icon: "icon-infom"
}, {
  title: "我的",
  path: "/home/profile",
  icon: "icon-my"
}]
/*
  点击首页导航菜单,  导航菜单没有高亮
  原来我们实现该功能的时候， 只考虑了点击以及第一次加载home组件的情况 但是 没有考虑不重新加载 Home组件的路由切换

  解决方式： 添加componentUpdate 钩子函数
            在钩子函数中判断路由地址是否切换
            路由切换时， 让菜单高亮
*/
export default class Home extends React.Component {
  state = {
    //默认选中的tabbar菜单项
    selectedTab: this.props.location.pathname,
    //用于控制TabBar的展示与隐藏, 这个值应该是false， 也就是不隐藏。
    // hidden: false,
    // 全屏
    // fullScreen: false,
  }
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate')
    if(prevProps.location.pathname !== this.props.location.pathname) {
      //路由发生切换了
      this.setState({selectedTab: this.props.location.pathname})
    }
  }
  renderTabBarItem = () => {
    return TabBarItems.map(item => (<TabBar.Item
      title={item.title}
      key={item.title}
      icon={
        <i className={`iconfont ${item.icon}`} />
      }
      selectedIcon={
        <i className={`iconfont ${item.icon}`} />
      }
      selected={this.state.selectedTab === item.path}
      onPress={() => {
        this.setState({
          selectedTab: item.path,
        });
        this.props.history.push(item.path)
      }}
    >
    </TabBar.Item>))
  }
  // 渲染每个TabBar内容
  // renderContent(pageText) {
  //   return (
  //     <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
  //       <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
  //       <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
  //         onClick={(e) => {
  //           e.preventDefault();
  //           this.setState({
  //             hidden: !this.state.hidden,
  //           });
  //         }}
  //       >
  //         Click to show/hide tab-bar
  //       </a>
  //       <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
  //         onClick={(e) => {
  //           e.preventDefault();
  //           this.setState({
  //             fullScreen: !this.state.fullScreen,
  //           });
  //         }}
  //       >
  //         Click to switch fullscreen
  //       </a>
  //     </div>
  //   );
  // }

  render() {
    return <div className="home">
      {/* 以父路由path开头 */}
      <Route path="/home/news" component={News}></Route>
      <Route exact path="/home" component={Index}></Route>
      <Route path="/home/profile" component={Profile}></Route>
      <Route path="/home/list" component={HouseList}></Route>
      <TabBar
        //未选中颜色
        unselectedTintColor="#888888"
        //选中字体颜色
        tintColor="#3172F4"
        barTintColor="white"
        // hidden={this.state.hidden}
        noRenderContent={true}
      >
        {this.renderTabBarItem()}
      </TabBar>
    </div>
  }

}