
import { Heading, Box, Text, Link, List, ListItem, Icon } from '@chakra-ui/core';

const Header: React.FC = () => (
  <Box p={[2, 4, 5]} width={['100%', '100%', 2/3, 2/3]} textAlign="center">
    <Heading fontSize="70px" m={[3, 3, 3]} mb={1} textAlign="center">🦠</Heading>
    <Heading as="h1" color="rgb(51, 68, 85)" m={[3, 3, 6]} mb={3} textAlign="center">Suomen koronavirus-tartuntatilanne</Heading>
    <Text mb={5} fontFamily="Space Mono" color="rgb(51, 68, 85, 0.8)">Sivun tiedot pohjautuvat Helsingin Sanomien julkaisemaan <Link color="teal.500" href="https://github.com/HS-Datadesk/koronavirus-avoindata" isExternal>avoimeen dataan</Link> Suomen koronavirus-tartunnoista. HS on kerännyt aineiston julkisista lähteistä: tiedotustilaisuuksista, mediasta ja haastatteluista. Dataa päivitetään aina kun uusia tietoja tulee. Voit lukea lisätietoja koronaviruksesta alla olevista linkeistä:</Text>

    <List styleType="none" mb={4} fontFamily="Space Mono" color="rgb(51, 68, 85, 0.8)">
      <ListItem mb={1}><Link color="teal.500" href="https://thl.fi/fi/web/infektiotaudit-ja-rokotukset/taudit-ja-torjunta/taudit-ja-taudinaiheuttajat-a-o/koronavirus-covid-19">Mikä on koronavirus?<Icon name="external-link" mx="5px" /></Link></ListItem>
      <ListItem><Link color="teal.500" href="https://www.ttl.fi/toimintaohje-tyontekijoille-wuhanin-koronaviruksen-tartunnan-ehkaisyyn/">Toimintaohjeet koronaviruksen tartunnan ehkäisyyn<Icon name="external-link" mx="5px" /></Link></ListItem>
    </List>

  </Box>
);

export default Header;