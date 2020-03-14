import '../styles.css'
import { createContext } from 'react';
import { useRouter } from 'next/router'

import { polyglot } from '../utils/translation'
export const UserContext = createContext<any>({language: 'fi'});



// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }:{Component:any, pageProps:any}) {
  

  const router = useRouter()
  const language = router.query.language || 'fi';
  const t = (key: string) => polyglot.t(language +'.' + key)

    return <UserContext.Provider value={{language, t}}> 
        <Component {...pageProps} />
        </UserContext.Provider>
}