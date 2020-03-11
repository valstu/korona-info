import styled from '@emotion/styled';
import Layout from './Layout';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Box,
  Badge
} from "@chakra-ui/core";

import Block from './Block';

interface StatBlock {
  count: number;
  helpText?: string;
}

const StatBlock: React.FC<StatBlock> = ({ count, helpText }) => (
  <Stat m={0} p={0} textAlign="center" marginTop="-20px">
    <StatNumber bg="white" pt={0} pb={0} fontSize={70} mb={0} fontFamily="Space Mono" fontWeight="normal">{count}</StatNumber>
    <StatHelpText mb={3}>&nbsp;{helpText}&nbsp;</StatHelpText>
  </Stat>
);

export default StatBlock;