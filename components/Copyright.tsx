import { Box, Text, Link } from '@chakra-ui/core';

const Copyright: React.FC = props => (
  <>
    <Text mb="20px" my={5} fontSize="1em">Contribute on GitHub: <Link href="https://github.com/valstu/korona-info" isExternal color="teal.500">https://github.com/valstu/korona-info</Link></Text>
    <Box p={5} color="gray.500" m={0} fontSize="sm" mb={10} mt={0} textAlign="center" maxWidth="1040px">
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