import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import AppHeader from '../../Layout/AppHeader'
// import ThemeOptions from '../../Layout/ThemeOptions'
import AppSidebar from '../../Layout/AppSidebar'
import CategoryForm from './CategoryForm'
import CategoryTableList from './CategoryList'

class Categories extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fragment>
        <AppHeader />
        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <Row>
                <Col md="12">
                  <Route
                    path={`${this.props.match.url}/list`}
                    render={(props) => (
                      <CategoryTableList
                        {...props}
                        type={2}
                        urlName={this.props.match.url}
                      />
                    )}
                  />
                  <Route
                    path={`${this.props.match.url}/create`}
                    render={(props) => <CategoryForm {...props} type={2} />}
                  />
                  <Route
                    path={`${this.props.match.url}/edit/:id`}
                    render={(props) => <CategoryForm {...props} type={2} />}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Categories
