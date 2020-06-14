import Head from 'next/head'

const Meta : React.FC<{title?:string}> = (props) => (
    <Head>
        <title>{props.title ? props.title : "Heirloom"}</title>
        <meta name="og:title" content={props.title ? props.title : "Heirloom"}/>
        <meta name="description" content="Heirloom is a small but mighty online recipe manager"/>
        <meta name="og:description" content="Heirloom is a small but mighty online recipe manager"/>
        <meta name="description" content="Heirloom is a small but mighty online recipe manager"/>
        <link rel="icon" href="/images/icons/favicon-48x48.png"/>
        <link rel="icon" type="image/png" href="/images/icons/favicon-16x16.png" sizes="16x16"/>
        <link rel="icon" type="image/png" href="/images/icons/favicon-32x32.png" sizes="32x32"/>
        <link rel="icon" type="image/png" href="/images/icons/favicon-96x96.png" sizes="96x96"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/images/icons/icon-128x128.png"/>
        <link rel="apple-touch-icon" sizes="192x192" href="/images/icons/icon-192x192.png"/>
        <link rel="apple-touch-icon" sizes="256x256" href="/images/icons/icon-256x256.png"/>
        <link rel="apple-touch-icon" sizes="384x384" href="/images/icons/icon-384x384.png"/>
        <link rel="apple-touch-icon" sizes="512x512" href="/images/icons/icon-512x512.png"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/> 
        <link rel="apple-touch-startup-image" href="images/splash/launch-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
        <link rel="apple-touch-startup-image" href="images/splash/launch-750x1294.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
        <link rel="apple-touch-startup-image" href="images/splash/launch-1242x2148.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
        <link rel="apple-touch-startup-image" href="images/splash/launch-1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
        <link rel="apple-touch-startup-image" href="images/splash/launch-1536x2048.png" media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"/>
        <link rel="apple-touch-startup-image" href="images/splash/launch-1668x2224.png" media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"/>
        <link rel="apple-touch-startup-image" href="images/splash/launch-2048x2732.png" media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"/>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1' />
        <meta name='keywords' content='recipe, recipe manager' />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff"/>
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet"/>
    </Head>
)

export default Meta