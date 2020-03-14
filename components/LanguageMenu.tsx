import { Box, Link } from '@chakra-ui/core';

const LanguageMenu = () => (
  <Box p={[2, 4, 5]} width={['100%', '100%', 2 / 3, 2 / 3]} textAlign="right">
      <Link
        color="teal.500"
        href="/fi"
      >
        Suomeksi
      </Link>
      <Link
        color="teal.500"
        href="/en"
      >
        In English
      </Link>
      <Link
        color="teal.500"
        href="/fa"
      >
        فارسی
      </Link>
  </Box>
);

export default LanguageMenu