import styled from '@emotion/styled';
import {
  Box, Heading, BoxProps
} from "@chakra-ui/core";

export const StyledBox = styled(Box)`
  background: white;
  box-shadow: 0 6px 8px rgba(102,119,136,.03), 0 1px 2px rgba(102,119,136,.3);
  overflow: hidden;
`

interface BlockProps {
  title: string;
  footer?: string;
}

const Block:React.FC<BoxProps & BlockProps> = ({ children, footer, title, ...rest}) => (
  <StyledBox borderRadius={5} background="white" {...rest}>
    <Heading as="h3" pt={8} pb={2} fontWeight="bold" color="gray.600" fontSize="1.4em" textAlign="center">{title}</Heading>
    {children}
    {footer && <Box py={5} px={2} m={0} textAlign="center" background="#f8f9fa" borderTop="solid 1px rgba(102,119,136,.15)" fontFamily="Space Mono" fontSize="0.8em" color="gray.700">{footer} &nbsp;</Box>}
  </StyledBox>
);

export default Block;