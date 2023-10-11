import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';
import { Young_Serif, DM_Sans } from 'next/font/google'

const youngSerif = Young_Serif({
  weight: '400',
  subsets: ['latin']
})

const dmSans = DM_Sans({
  weight:['400', '600'],
  subsets: ['latin']
})



function MyApp({ Component, pageProps }) {
  return (
    <>
          <style jsx global>{`
        html {
          font-family: ${dmSans.style.fontFamily};
        }

        h1,h2,h3,h4 {
          font-family: ${youngSerif.style.fontFamily}
        }
      `}</style>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
