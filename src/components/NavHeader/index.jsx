import React from "react";
import { NavBar } from "antd-mobile"
import PropTypes from 'prop-types'
import s from './style.module.less'
import { withRouter } from 'react-router-dom'
class NavHeader extends React.Component {
  //默认行为
  defaultHandler = () => {
    this.props.history.go(-1)
  }
  render() {
    return <NavBar
      mode="light"
      icon={<i className="iconfont icon-back"></i>}
      onLeftClick={this.props.onLeftClick ? this.props.onLeftClick : this.defaultHandler}
      className={s.header}
      style={this.props.style} 
    >{this.props.title}</NavBar>
  }
}
NavHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
  style: PropTypes.object
}
// withRouter是高阶组件 传递组件参数 给他路由属性 在返回
export default withRouter(NavHeader)
