import '../styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }:{Component:any, pageProps:any}) {
  return <Component {...pageProps} />
}