import React from 'react'

import { AvField } from 'availity-reactstrap-validation'
import cx from 'classnames'

export default class trTable extends React.Component {
  render() {
    return (
      <tr>
        <td>
          {' '}
          <AvField name={'orderImage_' + this.props.index} type="number" />
        </td>

        <td>
          <img
            src={this.props.pathImg}
            id="imgPreview"
            alt="placeholder image"
            height="150"
            width="100%"
            className="mt-3"
          />
        </td>

        <td>
          {' '}
          <div
            className="switch has-switch mb-2 mr-2"
            data-on-label="ON"
            data-off-label="OFF"
            onClick={this.handleClickSwitch}
          >
            <div
              className={cx('switch-animate', {
                'switch-on': this.state.btnSwitch.isToggleOn,
                'switch-off': !this.state.btnSwitch.isToggleOn,
              })}
            >
              <input type="checkbox" />
              <span className="switch-left bg-success">ON</span>
              <label>&nbsp;</label>
              <span className="switch-right bg-success">OFF</span>
            </div>
          </div>
        </td>
        <td>
          <button className="mb-2 mr-2 btn btn-info">Edit</button>
          <button className="mb-2 mr-2 btn btn-danger">Xóa</button>
        </td>
      </tr>
    )
  }
}
