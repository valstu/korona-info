import { Fragment, useContext } from 'react';
import Head from 'next/head';
import {
  Heading,
  Box,
  Text,
  Link,
  List,
  ListItem,
  Icon,
  Image,
  PseudoBox
} from '@chakra-ui/core';
import { UserContext } from '../pages/_app';

import LanguageMenu from './LanguageMenu';
const Header: React.FC = () => {
  const { t } = useContext(UserContext);
  return (
    <Fragment>
      <LanguageMenu />
      <Box
        p={[2, 4, 5]}
        width={['100%', '100%', 2 / 3, 2 / 3]}
        textAlign="center"
      >
        <img
          src="/images/corona-virus-small.png"
          style={{ marginBottom: 0, marginTop: 5, marginLeft: 'auto', marginRight: 'auto', width: 90, borderWidth: 0 }}
          title="CDC/ Alissa Eckert, MS; Dan Higgins, MAM / Public domain"
          alt="Kuvituskuva koronaviruksesta"
        />
        <Heading
          as="h1"
          color="rgb(51, 68, 85)"
          mb={[3, 3, 5]}
          mt={[3, 3, 2]}
          textAlign="center"
        >
          {t('finland corona status')}
        </Heading>
        <Text mb={5} fontFamily="Space Mono" color="rgb(51, 68, 85, 0.8)">
          {t('The data is based on')}{' '}
          <Link
            color="teal.500"
            href="https://github.com/HS-Datadesk/koronavirus-avoindata"
            isExternal
          >
            {t('open data')}
          </Link>{' '}
          {t('HS has gathered these data from')}
        </Text>
        <List
          styleType="none"
          mb={0}
          fontFamily="Space Mono"
          color="rgb(51, 68, 85, 0.8)"
        >
          <ListItem mb={1}>
            <Link
              color="teal.500"
              href="https://thl.fi/fi/web/infektiotaudit-ja-rokotukset/taudit-ja-torjunta/taudit-ja-taudinaiheuttajat-a-o/koronavirus-covid-19"
            >
              {t('What is corona virus')}?<Icon name="external-link" mx="5px" />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              color="teal.500"
              href="https://www.ttl.fi/toimintaohje-tyontekijoille-wuhanin-koronaviruksen-tartunnan-ehkaisyyn/"
            >
              {t('Corona virus prevention tips')}
              <Icon name="external-link" mx="5px" />
            </Link>
          </ListItem>
        </List>
      </Box>
    </Fragment>
  );
};

export default Header;
