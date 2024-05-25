import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { GET_STATS, getApiUrl } from '../../common/consts';
import { showSystemError } from '../../common/utils/messages.utils';

export const StatsComponent = () => {
  const [data, setData] = useState('');

  const fetchStats = async () => {
    try {
      const response = await axios.get(getApiUrl(GET_STATS));

      setData(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      showSystemError();
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);

  return <div>{data}</div>;
};
