import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import AppHeader from '../../Layout/AppHeader'
import AppSidebar from '../../Layout/AppSidebar'
import Configuration from '../../utils/configuration'
import CategoryForm from '../Categories/CategoryForm'
import CategoryList from '../Categories/CategoryList'
import ArticleForm from './ArticleForm'
import TableList from './ArticleList'
// import TableList from './ArticleList2'
import ReadPrivilege from './ReadPrivilege'

class Articles extends React.Component {
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
                      <TableList
                        {...props}
                        type={Configuration.articleType.ARTICLE}
                        categoryType={Configuration.categoryTypes.ARTICLE}
                      />
                    )}
                  />

                  <Route
                    exact
                    path={`${this.props.match.url}/create`}
                    render={(props) => (
                      <ArticleForm
                        {...props}
                        type={Configuration.articleType.ARTICLE}
                      />
                    )}
                  />
                  <Route
                    path={`${this.props.match.url}/edit/:id`}
                    render={(props) => (
                      <ArticleForm
                        {...props}
                        type={Configuration.articleType.ARTICLE}
                      />
                    )}
                  />

                  <Route
                    path={`${this.props.match.url}/categories/list`}
                    render={(props) => (
                      <CategoryList
                        {...props}
                        type={2}
                        urlName={`${this.props.match.url}/categories`}
                      />
                    )}
                  />
                  <Route
                    path={`${this.props.match.url}/categories/create`}
                    render={(props) => <CategoryForm {...props} type={2} />}
                  />
                  <Route
                    path={`${this.props.match.url}/categories/edit/:id`}
                    render={(props) => <CategoryForm {...props} type={2} />}
                  />

                  <Route
                    path={`${this.props.match.url}/read-privilege`}
                    component={ReadPrivilege}
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

export default Articles
