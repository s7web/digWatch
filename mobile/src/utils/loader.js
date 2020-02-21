import React from 'react';
import { ActivityIndicator } from 'react-native';

export const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            bottom: 12,
            left: 0,
            right: 0,
            textAlight: 'center',
          }}
          size="large"
          color="#757575"
        />
      )}
    </>
  );
};
