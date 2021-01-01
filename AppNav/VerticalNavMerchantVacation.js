import React, { Component, Fragment } from 'react'
import MetisMenu from 'react-metismenu'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import text from '../../utils/text'
import {
  CustomerRelationshipManagement,
  EcommerceVacation,
  MainNav,
  Marketing,
  SettingVacation,
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
        </div>
        <div data-tut="tour-website">
          <h5
            style={{ cursor: 'pointer' }}
            className="app-sidebar__heading"
            id="website"
          >
            {'CRM'}
          </h5>
          <MetisMenu
            content={CustomerRelationshipManagement}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
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
            content={EcommerceVacation}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
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
            content={SettingVacation}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
        </div>
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
