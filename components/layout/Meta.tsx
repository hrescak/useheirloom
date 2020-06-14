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
        <link href="https://rsms.me/inter/inter.css" rel="stylesheet"/>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='keywords' content='recipe, recipe manager' />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000"/>
    </Head>
)

export default Meta