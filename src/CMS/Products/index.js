import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import AppHeader from '../../Layout/AppHeader'
// import ThemeOptions from '../../Layout/ThemeOptions'
import AppSidebar from '../../Layout/AppSidebar'
import Configuration from '../../utils/configuration'
import CategoryForm from '../Categories/CategoryForm'
import CategoryList from '../Categories/CategoryList'
// import ProductTableList from './list/ProductTableList';
// import ProductForm from './form/ProductForm_old';
import ProductForm from './form/ProductForm'
import ProductVacationForm from './form/ProductVacationForm'
import ProductTableList from './list/ProductList'
import ProductVacationList from './list/ProductVacationList'

// import CategoryFormCreate from './Create/CategoryFormCreate';

class Products extends React.Component {
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
                    component={ProductTableList}
                  />
                  <Route
                    path={`${this.props.match.url}/create`}
                    component={ProductForm}
                  />
                  <Route
                    path={`${this.props.match.url}/vacation/create`}
                    component={ProductVacationForm}
                  />
                  <Route
                    path={`${this.props.match.url}/vacation/list`}
                    component={ProductVacationList}
                  />
                  <Route
                    path={`${this.props.match.url}/vacation/edit/:id`}
                    component={ProductVacationForm}
                  />

                  <Route
                    path={`${this.props.match.url}/evoucher/list`}
                    component={ProductTableList}
                  />
                  <Route
                    path={`${this.props.match.url}/evoucher/create`}
                    component={ProductForm}
                  />

                  <Route
                    path={`${this.props.match.url}/edit/:id`}
                    component={ProductForm}
                  />

                  <Route
                    path={`${this.props.match.url}/categories/edit/:id`}
                    render={(props) => (
                      <CategoryForm
                        {...props}
                        type={Configuration.categoryTypes.PRODUCT}
                      />
                    )}
                  />
                  <Route
                    path={`${this.props.match.url}/categories/create`}
                    render={(props) => (
                      <CategoryForm
                        {...props}
                        type={Configuration.categoryTypes.PRODUCT}
                      />
                    )}
                  />
                  <Route
                    path={`${this.props.match.url}/categories/list`}
                    render={(props) => (
                      <CategoryList
                        {...props}
                        type={Configuration.categoryTypes.PRODUCT}
                        urlName={this.props.match.url}
                      />
                    )}
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

export default Products
