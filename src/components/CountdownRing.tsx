import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useCountdown } from '../hooks/useCountdown';
import { COLORS } from '../constants/theme';

interface Props {
  period?: number;
}

const SIZE = 44;
const STROKE_WIDTH = 3;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CountdownRing({ period = 30 }: Props) {
  const { timeRemaining, progress, isUrgent, isWarning } = useCountdown(period);

  const strokeColor = isUrgent
    ? COLORS.danger
    : isWarning
    ? COLORS.warning
    : COLORS.success;

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ position: 'absolute' }}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={COLORS.border}
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>
      <Text
        style={{
          fontSize: 11,
          fontWeight: '700',
          color: strokeColor,
        }}>
        {timeRemaining}
      </Text>
    </View>
  );
}
