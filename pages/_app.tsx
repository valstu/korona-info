import '../styles.css'
import React from 'react'
import App from 'next/app'
import { appWithTranslation } from '../i18n'

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps: { ...pageProps },
    };
  }
  
  render() {
    const { Component, pageProps } = this.props
    return (
      <Component {...pageProps} />
    )
  }
}

export default appWithTranslation(MyApp)