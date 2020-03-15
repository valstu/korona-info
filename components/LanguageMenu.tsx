import { Box, Link } from '@chakra-ui/core';
import { supportedLanguages } from '../utils/translation';

const LanguageMenu: React.FC = () => (
  <Box p={[2, 4, 5]} width={['100%', '100%', 2 / 3, 2 / 3]} textAlign="right">
    {supportedLanguages.map(language => (
      <Link
        key={language.code}
        color="teal.500"
        href={'/?language=' + language.code}
      >
        {language.language}{' '}
      </Link>
    ))}
  </Box>
);

export default LanguageMenu;
