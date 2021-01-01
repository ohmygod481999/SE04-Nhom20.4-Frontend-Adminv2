import React, { Component, Fragment } from 'react'
import MetisMenu from 'react-metismenu'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import text from '../../utils/text'
import {
  Admin,
  Booking,
  Ecommerce,
  Elearning,
  ElearningUserGuide,
  MainNav,
  Marketing,
  ReportElearning,
  SettingElearning,
  SupportElearning,
  Users,
  Web,
} from './NavItems'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.path = props.location.pathname.split('/')[1]
  }

  render() {
    return (
      <Fragment>
        <MetisMenu
          content={MainNav}
          activeLinkFromLocation
          className="vertical-nav-menu mt-2"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
        {/* <div data-tut="tour-quick-menu">
                    <h5 className="app-sidebar__heading" id="truy-cap-nhanh">
                        {text("FASTACCESS")}
                    </h5>
                    <UncontrolledCollapse toggler="#truy-cap-nhanh">
                        <MetisMenu
                            content={MainNav}
                            activeLinkFromLocation
                            className="vertical-nav-menu"
                            iconNamePrefix=""
                            classNameStateIcon="pe-7s-angle-down"
                        />
                    </UncontrolledCollapse>
                </div> */}

        <div>
          <h5
            style={{ cursor: 'pointer' }}
            id="dat-lich"
            className="app-sidebar__heading"
          >
            {`Đặt lịch`}
          </h5>
          <MetisMenu
            content={Booking}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
          {/* <UncontrolledCollapse
                        toggler="#dat-lich"
                        defaultOpen={["room-booking", "booking"].includes(
                            this.path
                        )}
                    >
                    </UncontrolledCollapse> */}
        </div>

        <div data-tut="tour-learn-materials">
          <h5
            style={{ cursor: 'pointer' }}
            className="app-sidebar__heading"
            id="hoc-lieu"
          >
            {text('RESOURCES')}
          </h5>
          <MetisMenu
            content={Elearning}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
          {/* <UncontrolledCollapse
                        toggler="#hoc-lieu"
                        defaultOpen={[
                            "course",
                            "books",
                            "slide",
                            "video-gallery",
                            "quiz-video",
                            "quiz",
                        ].includes(this.path)}
                    >
                    </UncontrolledCollapse> */}
        </div>
        <div data-tut="tour-website">
          <h5
            style={{ cursor: 'pointer' }}
            className="app-sidebar__heading"
            id="website"
          >
            {'Trang web'}
          </h5>
          <MetisMenu
            content={Web}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
          {/* <UncontrolledCollapse
                        toggler="#website"
                        defaultOpen={[
                            "landing-page",
                            "navigation",
                            "articles",
                            "Categories",
                            "gallery",
                        ].includes(this.path)}
                    >
                    </UncontrolledCollapse> */}
        </div>
        <div data-tut="tour-account">
          <h5
            style={{ cursor: 'pointer' }}
            className="app-sidebar__heading"
            id="account"
          >
            {text('USER')}
          </h5>
          <MetisMenu
            content={Users}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
          {/* <UncontrolledCollapse
                        toggler="#account"
                        defaultOpen={["user", "user-categories"].includes(
                            this.path
                        )}
                    >
                    </UncontrolledCollapse> */}
        </div>
        <div data-tut="tour-marketing">
          <h5
            style={{ cursor: 'pointer' }}
            className="app-sidebar__heading"
            id="marketing"
          >
            {'Marketing'}
          </h5>
          <MetisMenu
            content={Marketing}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
          {/* <UncontrolledCollapse
                        toggler="#marketing"
                        defaultOpen={[
                            "report",
                            "email",
                            "form-builder",
                            "events",
                        ].includes(this.path)}
                    >
                    </UncontrolledCollapse> */}
        </div>
        <div>
          <h5
            style={{ cursor: 'pointer' }}
            className="app-sidebar__heading"
            id="ecommerce"
          >
            {'Thương mại điện tử'}
          </h5>
          <MetisMenu
            content={Ecommerce}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
          {/* <UncontrolledCollapse
                        toggler="#ecommerce"
                        defaultOpen={[
                            "product",
                            "product-categories",
                            "evoucher",
                            "product-evoucher",
                            "promotion",
                            "order",
                            "report",
                        ].includes(this.path)}
                    >
                    </UncontrolledCollapse> */}
        </div>
        <div data-tut="tour-report">
          <h5
            style={{ cursor: 'pointer' }}
            className="app-sidebar__heading"
            id="report"
          >
            {'Báo cáo'}
          </h5>
          <MetisMenu
            content={ReportElearning}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
          {/* <UncontrolledCollapse
                        toggler="#report"
                        defaultOpen={["report"].includes(this.path)}
                    >
                    </UncontrolledCollapse> */}
        </div>
        <div data-tut="tour-setting">
          <h5
            style={{ cursor: 'pointer' }}
            className="app-sidebar__heading"
            id="setting"
          >
            {text('SETTING')}
          </h5>
          <MetisMenu
            content={SettingElearning}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
          {/* <UncontrolledCollapse
                        toggler="#setting"
                        defaultOpen={[
                            "settings",
                            "setting-notification",
                        ].includes(this.path)}
                    >
                    </UncontrolledCollapse> */}
        </div>

        <div data-tut="tour-guide">
          <h5
            style={{ cursor: 'pointer' }}
            className="app-sidebar__heading"
            id="guide"
          >
            {'Hướng dẫn sử dụng'}
          </h5>
          <MetisMenu
            content={ElearningUserGuide}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
          {/* <UncontrolledCollapse toggler="#guide">
                    </UncontrolledCollapse> */}
        </div>
        <h5
          style={{ cursor: 'pointer' }}
          className="app-sidebar__heading"
          id="support"
        >
          {'Trợ giúp'}
        </h5>
        <MetisMenu
          content={SupportElearning}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
        {/* <UncontrolledCollapse toggler="#support">
                </UncontrolledCollapse> */}

        {this.props.merchantCode === 'izzilearn' ? (
          <Fragment>
            <h5
              style={{ cursor: 'pointer' }}
              className="app-sidebar__heading"
              id="admin"
            >
              {'Quản trị'}
            </h5>
            <MetisMenu
              content={Admin}
              activeLinkFromLocation
              className="vertical-nav-menu"
              iconNamePrefix=""
              classNameStateIcon="pe-7s-angle-down"
            />
            {/* <UncontrolledCollapse
                            toggler="#admin"
                            defaultOpen={[
                                "merchant",
                                "product-mechant",
                            ].includes(this.path)}
                        >
                        </UncontrolledCollapse> */}
          </Fragment>
        ) : null}
      </Fragment>
    )
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path)
  }
}

const mapStateToProp = (state) => ({
  merchantCode: state.System.merchantCode,
})

export default withRouter(connect(mapStateToProp, null)(Nav))
