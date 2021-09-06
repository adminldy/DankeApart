import React from "react"
import { Route } from 'react-router-dom'
import News from "../News"
import Index from "../Index";
import Profile from "../Profile";
import HouseList from "../HouseList";
import { TabBar } from 'antd-mobile';
import './index.css'
export default class Home extends React.Component {
  state = {
    //默认选中的tabbar菜单项
    selectedTab: this.props.location.pathname,
    //用于控制TabBar的展示与隐藏, 这个值应该是false， 也就是不隐藏。
    // hidden: false,
    // 全屏
    // fullScreen: false,
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
      <Route path="/home/index" component={Index}></Route>
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
          <TabBar.Item
            title="首页"
            key="Life"
            icon={
              <i className="iconfont icon-ind" />
            }
            selectedIcon={
              <i className="iconfont icon-ind" />
            }
            selected={this.state.selectedTab === '/home/index'}
            onPress={() => {
              this.setState({
                selectedTab: '/home/index',
              });
              this.props.history.push('/home/index')
            }}
            data-seed="logId"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className="iconfont icon-findHouse" />
            }
            selectedIcon={
              <i className="iconfont icon-findHouse" />
            }
            title="找房"
            key="Koubei"
            selected={this.state.selectedTab === '/home/list'}
            onPress={() => {
              this.setState({
                selectedTab: '/home/list',
              });
              this.props.history.push('/home/list')
            }}
            data-seed="logId1"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className="iconfont icon-infom" />
            }
            selectedIcon={
              <i className="iconfont icon-infom" />
            }
            title="资讯"
            key="Friend" 
            selected={this.state.selectedTab === '/home/news'}
            onPress={() => {
              this.setState({
                selectedTab: '/home/news',
              });
              this.props.history.push('/home/news')
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className="iconfont icon-my" />
            }
            selectedIcon={
              <i className="iconfont icon-my" />
            }
            title="我的"
            key="my"
            selected={this.state.selectedTab === '/home/profile'}
            onPress={() => {
              this.setState({
                selectedTab: '/home/profile',
              });
              this.props.history.push('/home/profile')
            }}
          >
          </TabBar.Item>
        </TabBar>
    </div>
  }

}