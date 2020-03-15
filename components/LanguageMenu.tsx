import { Box, Link } from '@chakra-ui/core';
import { supportedLanguages } from '../utils/translation';

const LanguageMenu: React.FC = () => (
  <Box p={[2, 4, 5]} width={['100%', '100%', '100%', '100%']} textAlign="right" mb={-50}>
    {supportedLanguages.map(language => (
      <Link
        key={language.code}
        color="teal.500"
        fontSize="0.9em"
        href={'/?language=' + language.code}
        ml={2}
      >
        {language.language}{' '}
      </Link>
    ))}
  </Box>
);

export default LanguageMenu;
