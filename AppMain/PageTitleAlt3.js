import cx from 'classnames'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import TitleComponent1 from './PageTitleAlt3Examples/Variation1'

class PageTitleAlt3 extends Component {
  randomize(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)]
  }

  render() {
    let {
      enablePageTitleIcon,
      enablePageTitleSubheading,
      heading,
      icon,
    } = this.props

    var arr = [<TitleComponent1 />]

    return (
      <Fragment>
        <div className="app-page-title app-page-title-simple">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              <div>
                <div className="page-title-head center-elem">
                  <span
                    className={cx('d-inline-block pr-2', {
                      'd-none': !enablePageTitleIcon,
                    })}
                  >
                    <i className={icon} />
                  </span>
                  <span className="d-inline-block">{heading}</span>
                </div>
                <div
                  className={cx('page-title-subheading opacity-10', {
                    'd-none': !enablePageTitleSubheading,
                  })}
                >
                  {/* <TitleComponent3 /> */}
                </div>
              </div>
            </div>
            <div className="page-title-actions">
              {this.props.actions ? this.props.actions : null}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
  enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PageTitleAlt3)
