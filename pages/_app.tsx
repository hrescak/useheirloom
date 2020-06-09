import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import theme from '../components/system/theme'
import { BaseStyles } from '../components/system/Base'


export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <BaseStyles/>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}