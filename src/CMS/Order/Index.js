import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import AppHeader from '../../Layout/AppHeader'
import AppSidebar from '../../Layout/AppSidebar'
import List from './List'
import ListDebt from './ListDebt'

class Index extends React.Component {
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
                    component={List}
                  />
                  <Route
                    path={`${this.props.match.url}/listdebt`}
                    component={ListDebt}
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

export default Index
