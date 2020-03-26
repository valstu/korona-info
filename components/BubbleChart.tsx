import { useState, useContext } from 'react';

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  ZAxis,
  Scatter
} from 'recharts';
import { Box, Button, ButtonGroup } from '@chakra-ui/core';

import _ from 'lodash';

import Block from '../components/Block';
import { UserContext } from '../pages/_app';
import { InfectionDevelopmentDataItem } from '../utils/chartDataHelper';
import { GroupedData } from '../pages';

const BubbleChart = ({ data }: { data: GroupedData }) => {
  const [chartScale, setChartScale] = useState<'cumulative' | 'daily'>('daily');
  const { t } = useContext(UserContext);
  return (
    <Box width={['100%']} p={3}>
      <Block
        title={t('accumulation by healthcare district')}
        footer={t('cases recovered and death in past 30 days')}
      >
        <ButtonGroup
          spacing={0}
          alignSelf="center"
          display="flex"
          justifyContent="center"
          marginTop="-15px"
        >
          <Button
            size="xs"
            fontFamily="Space Grotesk Regular"
            px={3}
            letterSpacing="1px"
            borderRadius="4px 0px 0px 4px"
            borderWidth="0px"
            isActive={chartScale === 'cumulative'}
            onClick={() => setChartScale('cumulative')}
          >
            {t('cumulative')}
          </Button>
          <Button
            size="xs"
            fontFamily="Space Grotesk Regular"
            px={3}
            letterSpacing="1px"
            borderRadius="0px 4px 4px 0px"
            borderWidth="0px"
            isActive={chartScale === 'daily'}
            onClick={() => setChartScale('daily')}
          >
            {t('daily')}
          </Button>
        </ButtonGroup>
        <Box p={5}>
          {_.map(data, (district, key) => {
            return (
              <ResponsiveContainer key={key} width={'60%'} height={42}>
                <ScatterChart
                  key={key}
                  margin={{
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                  }}
                >
                  <XAxis
                    type="category"
                    dataKey="date"
                    interval={0}
                    tick={false}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name={key}
                    height={10}
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: key, position: 'insideLeft' }}
                  />
                  <ZAxis
                    type="number"
                    dataKey={
                      chartScale === 'daily' ? 'infectionsDaily' : 'infections'
                    }
                    range={[0, 350]}
                    // @ts-ignore
                    domain={[0, chartScale === 'daily' ? 50 : 350]}
                  />
                  <Tooltip cursor={false} wrapperStyle={{ zIndex: 100 }} />
                  <Scatter
                    data={district.timeSeries.infectionDevelopmentData30Days.map(
                      (data: InfectionDevelopmentDataItem) => ({
                        ...data,
                        y: 0
                      })
                    )}
                    fill="#f3858d"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            );
          })}
        </Box>
      </Block>
    </Box>
  );
};

export default BubbleChart;
