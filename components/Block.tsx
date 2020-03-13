import styled from '@emotion/styled';
import {
  Box, Heading, BoxProps, Flex
} from "@chakra-ui/core";

export const StyledBox = styled(Box)`
  background: white;
  box-shadow: 0 6px 8px rgba(102,119,136,.03), 0 1px 2px rgba(102,119,136,.3);
  overflow: hidden;
  position: relative;
`

interface BlockProps {
  title: string;
  footer?: string;
  extraInfo?: string;
}

const Block:React.FC<BoxProps & BlockProps> = ({ children, footer, title, extraInfo, ...rest}) => (
  <StyledBox borderRadius={5} background="white" {...rest}>
    <Heading as="h3" pt={8} pb={0} px={2} minHeight={'90px'} fontWeight="bold" color="gray.600" fontSize="1.3em" textAlign="center">{title}</Heading>
    {children}
    {footer && <Flex py={5} px={2} m={0} minHeight={80} alignItems="center" justifyContent="center" textAlign="center" background="#f8f9fa" borderTop="solid 1px rgba(102,119,136,.15)" fontFamily="Space Mono" fontSize="0.8em" color="gray.700">{footer}</Flex>}
  </StyledBox>
);

export default Block;