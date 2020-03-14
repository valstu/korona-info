import * as React from 'react'
import { Fragment } from 'react';
import Head from 'next/head';
import { Heading, Box, Text, Link, List, ListItem, Icon, Image } from '@chakra-ui/core';
import { withTranslation } from '../i18n';

import LanguageMenu from './LanguageMenu';

type Props = {
  t: (arg0: string) => React.ReactNode
}

const Header = ({ t }: Props) => {
  console.log(t('siteHeading'));
  return (
    <Fragment>
      <Head>
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/images/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/images/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/images/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/images/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/images/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/images/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/images/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/images/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="/images/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="/images/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/images/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/images/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/images/favicon-128.png" sizes="128x128" />
        <meta name="application-name" content="korona.kans.io"/>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/images/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/images/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/images/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/images/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/images/mstile-310x310.png" />
        <meta name="apple-mobile-web-app-title" content="korona.kans.io" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <LanguageMenu />
      <Box p={[2, 4, 5]} width={['100%', '100%', 2/3, 2/3]} textAlign="center">
        <Image src="/images/corona-virus-small.png" mb={0} title="CDC/ Alissa Eckert, MS; Dan Higgins, MAM / Public domain" alt="Kuvituskuva koronaviruksesta" borderWidth="0px" width="90px" />
        <Heading as="h1" color="rgb(51, 68, 85)" mb={[3, 3, 5]} mt={[3, 3, 2]} textAlign="center">{t('finland corona status')}</Heading>
  <Text mb={5} fontFamily="Space Mono" color="rgb(51, 68, 85, 0.8)">{t('based on')} <Link color="teal.500" href="https://github.com/HS-Datadesk/koronavirus-avoindata" isExternal>{t('based on link')}</Link> {t('based on info')}</Text>
        <List styleType="none" mb={4} fontFamily="Space Mono" color="rgb(51, 68, 85, 0.8)">
          <ListItem mb={1}><Link color="teal.500" href="https://thl.fi/fi/web/infektiotaudit-ja-rokotukset/taudit-ja-torjunta/taudit-ja-taudinaiheuttajat-a-o/koronavirus-covid-19">Mikä on koronavirus?<Icon name="external-link" mx="5px" /></Link></ListItem>
          <ListItem><Link color="teal.500" href="https://www.ttl.fi/toimintaohje-tyontekijoille-wuhanin-koronaviruksen-tartunnan-ehkaisyyn/">Toimintaohjeet koronaviruksen tartunnan ehkäisyyn<Icon name="external-link" mx="5px" /></Link></ListItem>
        </List>
      </Box>
    </Fragment>
  )
};

Header.getInitialProps = async () => ({ namespacesRequired: ['common'] })

export default withTranslation('common')(Header);