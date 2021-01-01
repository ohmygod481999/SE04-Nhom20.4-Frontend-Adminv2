import cx from 'classnames'
import React, { Fragment } from 'react'
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]
class SearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSearch: false,
    }
  }

  render() {
    return (
      <Fragment>
        <div
          className={cx('search-wrapper', {
            active: this.state.activeSearch,
          })}
        >
          <div className="input-holder">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm dữ liệu trong hệ thống"
            />

            {/* <Select options={options} className="search-input" placeholder="Tìm kiếm dữ liệu trong hệ thống" /> */}
            <button
              onClick={() =>
                this.setState({ activeSearch: !this.state.activeSearch })
              }
              className="search-icon"
            >
              <span />
            </button>
          </div>
          <button
            onClick={() =>
              this.setState({ activeSearch: !this.state.activeSearch })
            }
            className="close"
          />
        </div>
      </Fragment>
    )
  }
}

export default SearchBox
