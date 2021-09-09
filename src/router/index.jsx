import Home from "../pages/Home"
import CityList from "../pages/CityList"
import Map from '../pages/Map'
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/citylist',
    component: CityList
  },
  {
    path: '/map',
    component: Map
  }
]
export default routes