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
}

const StatBlock: React.FC<StatBlock> = ({ count }) => (
  <Stat m={0} p={0} textAlign="center">
    <StatNumber bg="white" pt={0} pb={3} fontSize={70} fontFamily="Space Mono" fontWeight="normal">{count}</StatNumber>
  </Stat>
);

export default StatBlock;