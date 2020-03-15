import { Flex,Button, ButtonGroup, Heading, Box, Text, Link, List, ListItem, Icon, Image } from '@chakra-ui/core';

const Copyright: React.FC = props => (
  <>
    <Text mb="20px" my={5} px={5} fontSize="1em">Fork me at GitHub: <Link href="https://github.com/valstu/korona-info" isExternal color="teal.500">https://github.com/valstu/korona-info</Link> / Twitter: <Link href="https://twitter.com/valtterikaresto" isExternal color="teal.500">@valtterikaresto</Link> </Text>
    <Box p={5} color="gray.500" m={0} fontSize="sm" mb={10} mt={0} textAlign="center" maxWidth="1040px">

          <Text mb={5} fontFamily="Space Mono" color="rgb(51, 68, 85, 0.8)">Sivun tiedot pohjautuvat Helsingin Sanomien julkaisemaan <Link color="teal.500" href="https://github.com/HS-Datadesk/koronavirus-avoindata" isExternal>avoimeen dataan</Link> Suomen koronavirus-tartunnoista. HS on kerännyt aineiston julkisista lähteistä: tiedotustilaisuuksista, mediasta ja haastatteluista. Dataa päivitetään aina kun uusia tietoja tulee. Voit lukea lisätietoja koronaviruksesta alla olevista linkeistä:</Text>
          <List styleType="none" mb={0} fontFamily="Space Mono" color="rgb(51, 68, 85, 0.8)">
            <ListItem mb={1}><Link color="teal.500" href="https://thl.fi/fi/web/infektiotaudit-ja-rokotukset/taudit-ja-torjunta/taudit-ja-taudinaiheuttajat-a-o/koronavirus-covid-19">Mikä on koronavirus?<Icon name="external-link" mx="5px" /></Link></ListItem>
            <ListItem><Link color="teal.500" href="https://www.ttl.fi/toimintaohje-tyontekijoille-wuhanin-koronaviruksen-tartunnan-ehkaisyyn/">Toimintaohjeet koronaviruksen tartunnan ehkäisyyn<Icon name="external-link" mx="5px" /></Link></ListItem>
          </List>
      <p><a title="CDC/ Alissa Eckert, MS; Dan Higgins, MAM / Public domain" href="https://commons.wikimedia.org/wiki/File:2019-nCoV-CDC-23312_without_background.png">Corona virus image is a work of the Centers for Disease Control and Prevention, part of the United States Department of Health and Human Services, taken or made as part of an employee's official duties. As a work of the U.S. federal government, the image is in the public domain.<br /> <strong>Author: CDC/ Alissa Eckert, MS; Dan Higgins, MAM (Public Domain)</strong></a></p>
      <br />
      <p><strong>MIT License</strong></p><br />
      <p>Copyright (c) 2020 Helsingin Sanomat</p>
      <br />

      <p>Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:</p>

      <p>The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.</p>
      <br />
      <p>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
      </p>
    </Box>
  </>
);

export default Copyright;