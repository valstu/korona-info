
import { Fragment } from 'react';
import Head from 'next/head';
import { Heading, Box, Text, Link, List, ListItem, Icon, Image } from '@chakra-ui/core';

const Header: React.FC = () => (
  <Fragment>
    <Head>
      <link rel="apple-touch-icon" sizes="57x57" href="/images/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/images/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/images/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192"  href="/images/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      <link rel="manifest" href="/images/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/images/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <Box p={[2, 4, 5]} width={['100%', '100%', 2/3, 2/3]} textAlign="center">
      <Image src="/images/corona-virus-small.png" alt="Kuvituskuva koronaviruksesta" borderWidth="0px" width="120px" />
      <Heading as="h1" color="rgb(51, 68, 85)" m={[3, 3, 6]} mb={3} textAlign="center">Suomen koronavirus-tartuntatilanne</Heading>
      <Text mb={5} fontFamily="Space Mono" color="rgb(51, 68, 85, 0.8)">Sivun tiedot pohjautuvat Helsingin Sanomien julkaisemaan <Link color="teal.500" href="https://github.com/HS-Datadesk/koronavirus-avoindata" isExternal>avoimeen dataan</Link> Suomen koronavirus-tartunnoista. HS on kerännyt aineiston julkisista lähteistä: tiedotustilaisuuksista, mediasta ja haastatteluista. Dataa päivitetään aina kun uusia tietoja tulee. Voit lukea lisätietoja koronaviruksesta alla olevista linkeistä:</Text>
      <List styleType="none" mb={4} fontFamily="Space Mono" color="rgb(51, 68, 85, 0.8)">
        <ListItem mb={1}><Link color="teal.500" href="https://thl.fi/fi/web/infektiotaudit-ja-rokotukset/taudit-ja-torjunta/taudit-ja-taudinaiheuttajat-a-o/koronavirus-covid-19">Mikä on koronavirus?<Icon name="external-link" mx="5px" /></Link></ListItem>
        <ListItem><Link color="teal.500" href="https://www.ttl.fi/toimintaohje-tyontekijoille-wuhanin-koronaviruksen-tartunnan-ehkaisyyn/">Toimintaohjeet koronaviruksen tartunnan ehkäisyyn<Icon name="external-link" mx="5px" /></Link></ListItem>
      </List>
    </Box>
  </Fragment>
);

export default Header;