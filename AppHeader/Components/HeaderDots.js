import React, { Fragment } from 'react'
import Ionicon from 'react-ionicons'
import { Link } from 'react-router-dom'
import {
  Button,
  Col,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap'
// import {
//     AreaChart, Area,
//     ResponsiveContainer,
// } from 'recharts';
// import {
//     faArrowLeft,
//     faCog,
// } from '@fortawesome/free-solid-svg-icons';
// import CountUp from 'react-countup';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg4 from '../../../assets/utils/images/dropdown-header/abstract4.jpg'
import Language from '../../../CMS/CommonComponent/Language'
import Notification from '../../../CMS/Notification/Index'
// Dropdown Tabs Content
import ChatExample from './TabsContent/ChatExample'
import SysErrEx from './TabsContent/SystemExample'
import TimelineEx from './TabsContent/TimelineExample'

// import Language from './Language';

// const data = [
//     { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//     { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//     { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
//     { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//     { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//     { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
//     { name: 'Page C', uv: 2000, pv: 6800, amt: 2290 },
//     { name: 'Page D', uv: 4780, pv: 7908, amt: 2000 },
//     { name: 'Page E', uv: 2890, pv: 9800, amt: 2181 },
//     { name: 'Page F', uv: 1390, pv: 3800, amt: 1500 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
// ];

const tabsContent = [
  {
    title: 'Messages',
    content: <ChatExample />,
  },
  {
    title: 'Events',
    content: <TimelineEx />,
  },
  {
    title: 'System Errors',
    content: <SysErrEx />,
  },
]

function getTabs() {
  return tabsContent.map((tab, index) => ({
    title: tab.title,
    getContent: () => tab.content,
    key: index,
  }))
}

class HeaderDots extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      isOpen: false,
    }
  }

  render() {
    return (
      <Fragment>
        <div className="header-dots">
          <UncontrolledDropdown>
            <DropdownToggle
              className="p-0 mr-2"
              color="link"
              data-tut="tour-quick-monitor"
            >
              <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                <div className="icon-wrapper-bg bg-primary" />
                <Ionicon color="#3f6ad8" fontSize="23px" icon="md-grid" />
              </div>
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu-xl rm-pointers">
              <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner bg-plum-plate">
                  <div
                    className="menu-header-image"
                    style={{
                      backgroundImage: 'url(' + bg4 + ')',
                    }}
                  />
                  <div className="menu-header-content text-white">
                    <h5 className="menu-header-title">Bảng điều khiển</h5>
                    <h6 className="menu-header-subtitle">
                      Dễ dàng truy cập nhanh
                    </h6>
                  </div>
                </div>
              </div>
              <div className="grid-menu grid-menu-xl grid-menu-3col">
                <Row className="no-gutters">
                  <Col xl="4" sm="6">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      <Button
                        className="btn-icon-vertical btn-square btn-transition"
                        outline
                        color="link"
                      >
                        <i className="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3">
                          {' '}
                        </i>
                        Bảng điều khiển chính
                      </Button>
                    </Link>
                  </Col>
                  <Col xl="4" sm="6">
                    <Link to="/report/order" style={{ textDecoration: 'none' }}>
                      <Button
                        className="btn-icon-vertical btn-square btn-transition"
                        outline
                        color="link"
                      >
                        <i className="pe-7s-piggy icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3">
                          {' '}
                        </i>
                        Báo cáo đơn hàng
                      </Button>
                    </Link>
                  </Col>
                  <Col xl="4" sm="6">
                    <Link
                      to="/settings/config-merchant"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        className="btn-icon-vertical btn-square btn-transition"
                        outline
                        color="link"
                      >
                        <i className="pe-7s-config icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3">
                          {' '}
                        </i>
                        Cấu hình chung
                      </Button>
                    </Link>
                  </Col>
                  <Col xl="4" sm="6">
                    <Link
                      to="/articles/list"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        className="btn-icon-vertical btn-square btn-transition"
                        outline
                        color="link"
                      >
                        <i className="pe-7s-browser icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3">
                          {' '}
                        </i>
                        Bài viết
                      </Button>
                    </Link>
                  </Col>
                  <Col xl="4" sm="6">
                    <Link to="/product/list" style={{ textDecoration: 'none' }}>
                      <Button
                        className="btn-icon-vertical btn-square btn-transition"
                        outline
                        color="link"
                      >
                        <i className="pe-7s-cart icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3">
                          {' '}
                        </i>
                        Sản phẩm
                      </Button>
                    </Link>
                  </Col>
                  <Col xl="4" sm="6">
                    <Link to="/user/list" style={{ textDecoration: 'none' }}>
                      <Button
                        className="btn-icon-vertical btn-square btn-transition"
                        outline
                        color="link"
                      >
                        <i className="pe-7s-users icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3">
                          {' '}
                        </i>
                        Thành viên
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>

          <div data-tut="tour-notification">
            <Notification />
          </div>
          <div data-tut="tour-language">
            <Language />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default HeaderDots
