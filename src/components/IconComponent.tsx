import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
  name: string;
  size: number;
  color: string;
}

const Icon = ({ name, size, color }: IconProps) => {
  return (
    <MaterialCommunityIcons
      name={name}
      color={color}
      size={size}
    />
  );
};

export default Icon;
