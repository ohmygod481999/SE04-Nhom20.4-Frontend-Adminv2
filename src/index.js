import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import './assets/base.scss'
import Main from './CMS'
import configureStore from './config/configureStore'
import './index.css'
import * as serviceWorker from './serviceWorker'

const store = configureStore()
const rootElement = document.getElementById('root')

// store.subscribe(() => console.log(store.getState()));

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement
  )
}
renderApp(Main)
if (module.hot) {
  module.hot.accept('./CMS', () => {
    const NextApp = require('./CMS').default
    renderApp(NextApp)
  })
}
serviceWorker.unregister()
