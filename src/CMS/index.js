import cx from 'classnames'
import $ from 'jquery'
import moment from 'moment'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import ResizeDetector from 'react-resize-detector'
import { withRouter } from 'react-router-dom'
import AppMain from '../Layout/AppMain'
import {
  updateAllLanguage,
  updateInformationDateUser,
} from '../reducers/Partial'
import {
  updateExpiredTime,
  updateMerchant,
  updateMerchantCode,
  updateMerchantId,
  updateMerchantType,
  updateUserId,
  updateUserInfo,
} from '../reducers/System'
import { getMerchant } from '../Services/MerchantService'
import Common from '../utils/common'
import Configuration from '../utils/configuration'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      closedSmallerSidebar: false,
    }
    let tempUrl = ''
    if (window.location.href.split('#').length > 1) {
      tempUrl = window.location.href.split('#')[1]
    }
    var self = this

    getMerchant().then((res) => {
      self.props.updateExpiredTime(moment().add(1, 'years').toDate())
      // self.props.updateExpiredTime(new Date(res.merchant.expiredTime));
    })

    if (Common.getCookie(Configuration.userCookie) != '') {
      $.ajax({
        url:
          Configuration.url_api +
          `/User/GetUserDataByToken?tokenId=${Common.getCookie(
            Configuration.userCookie
          )}`,
        type: 'get',
        contentType: 'application/json',
        processData: false,
        async: false,
        dataType: 'json',
        // data: JSON.stringify(dataSend),
        success: function (res) {
          if (res.Success) {
            self.props.updateInformationDateUser(JSON.parse(res.Message))
            self.props.updateUserInfo(JSON.parse(res.Message))
            //get languages
            let merchant
            if (window.location.href.includes('localhost')) {
              merchant = Common.queryDataMerchant(Configuration.merchantLocal) //local
            } else {
              merchant = Common.queryDataMerchant(
                window.location.hostname.split('.')[0]
              ) //sever
            }
            console.log(merchant)
            localStorage.setItem(
              Configuration.languageCode,
              merchant.languages.find((e) => e.id == merchant.languageId).code
            )
            self.props.updateAllLanguage(merchant.languages)
            const merchantId = JSON.parse(res.Message).MerchantId
            const userId = JSON.parse(res.Message).Id
            const merchantType = JSON.parse(res.Message).MerchantType
            const merchantCode = JSON.parse(res.Message).MerchantCode
            Common.setCookie('merchantId', merchantId)
            Common.setCookie('userId', userId)
            Common.setCookie('merchantType', merchantType)
            Common.setCookie('merchantCode', merchantCode)
            self.props.updateMerchant(merchant)
            self.props.updateMerchantCode(merchantCode)
            self.props.updateMerchantId(merchantId)
            self.props.updateMerchantType(merchantType)
            self.props.updateUserId(userId)

            if (Common.getCookie(Configuration.tokenLanguage) === '') {
              Common.setCookie(
                Configuration.tokenLanguage,
                Configuration.languageVi
              )
            }
          } else {
            if (!window.location.href.includes('login')) {
              window.location.href = '#/login?returnUrl=' + tempUrl
            }
          }
        },
      })
    } else {
      if (window.location.href.split('?').length < 2) {
        if (!window.location.href.includes('login')) {
          window.location.href = '#/login?returnUrl=' + tempUrl
        }
      }
    }
  }

  render() {
    let {
      colorScheme,
      enableFixedHeader,
      enableFixedSidebar,
      enableFixedFooter,
      enableClosedSidebar,
      closedSmallerSidebar,
      enableMobileMenu,
      enablePageTabsAlt,
    } = this.props

    return (
      <ResizeDetector
        handleWidth
        render={({ width }) => (
          <Fragment>
            <div
              className={cx(
                'app-container app-theme-' + colorScheme,
                { 'fixed-header': enableFixedHeader },
                {
                  'fixed-sidebar': enableFixedSidebar || width < 1250,
                },
                { 'fixed-footer': enableFixedFooter },
                {
                  'closed-sidebar': enableClosedSidebar || width < 1250,
                },
                {
                  'closed-sidebar-mobile': closedSmallerSidebar || width < 1250,
                },
                { 'sidebar-mobile-open': enableMobileMenu },
                { 'body-tabs-shadow-btn': enablePageTabsAlt }
              )}
            >
              <AppMain />
            </div>
          </Fragment>
        )}
      />
    )
  }
}

const mapStateToProp = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme,
  enableFixedHeader: state.ThemeOptions.enableFixedHeader,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableFixedFooter: state.ThemeOptions.enableFixedFooter,
  enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,
  // enablePageTabsAlt: state.Partial.enablePageTabsAlt,
  allLanguage: state.Partial.allLanguage,
})
const mapDispatchToProps = {
  updateInformationDateUser,
  updateAllLanguage,
  updateMerchantCode,
  updateUserInfo,
  updateMerchant,
  updateMerchantId,
  updateMerchantType,
  updateUserId,
  updateExpiredTime,
}
export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main))
