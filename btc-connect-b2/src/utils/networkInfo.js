

import React from 'react';
import PropTypes from 'prop-types';

const BtcNetworkInfo = ({ network }) => {
  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded-lg shadow-lg">
      <span className="text-lg font-bold">BTC network: {network}</span>
    </div>
  );
};

BtcNetworkInfo.propTypes = {
  network: PropTypes.string.isRequired,
};

export default BtcNetworkInfo;
