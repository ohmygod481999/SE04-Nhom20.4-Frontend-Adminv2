import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import MetisMenu from 'react-metismenu'

import {
  MainNav,
  Theme,
  Media,
  Content,
  Config,
  FormBuilder,
  Booking,
  BookingClinic,
} from './NavItems'
// import { MainNav, CurdNav, Gallery, Repository, Content, Categories, Product, Setting, ThemeWeb, Users, Navigation, UserCategories, Email, LandingPage, ImageCategory, ProductCategories, Promotion } from './NavItems';
import text from '../../utils/text'
import { useSelector } from 'react-redux'

function NavMerchantTypeNormal(props) {
  const merchantId = useSelector((state) => state.System.merchantId)

  return (
    <Fragment>
      <h5 className="app-sidebar__heading">{text('FASTACCESS')}</h5>
      <MetisMenu
        content={MainNav}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading">{text('THEME')}</h5>
      <MetisMenu
        content={Theme}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />

      <h5 className="app-sidebar__heading">{text('CONTENT')}</h5>
      <MetisMenu
        content={Content}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading">{text('MEDIA')}</h5>
      <MetisMenu
        content={Media}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      {merchantId === '534b41b5-8495-4704-9bd4-e46630a47b31' ? ( // Nhi tam clinic
        <Fragment>
          <h5 className="app-sidebar__heading">{text('BOOKING')}</h5>
          <MetisMenu
            content={BookingClinic}
            activeLinkFromLocation
            className="vertical-nav-menu"
            iconNamePrefix=""
            classNameStateIcon="pe-7s-angle-down"
          />
        </Fragment>
      ) : null}
      <h5 className="app-sidebar__heading">{'Form'}</h5>
      <MetisMenu
        content={FormBuilder}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
      <h5 className="app-sidebar__heading">{text('SETTING')}</h5>
      <MetisMenu
        content={Config}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="pe-7s-angle-down"
      />
    </Fragment>
  )

  // isPathActive(path) {
  //     return this.props.location.pathname.startsWith(path);
  // }
}

export default withRouter(NavMerchantTypeNormal)
