import { useEffect, useRef } from 'react';
import axios from 'axios';
import { GET_VISUALIZATION, getApiUrlDataAnalys } from '../../common/consts';

export const LdaVisComponent = () => {
  const ref = useRef();
  const fetchVis = async () => {
    try {
      const response = await axios.get(getApiUrlDataAnalys(GET_VISUALIZATION));

      return response.data.template.replaceAll(
        'https://cdn.jsdelivr.net/gh/bmabey/pyLDAvis@3.4.0/pyLDAvis/js/ldavis.v3.0.0.js',
        '/test.js'
      );
    } catch (error) {
      console.error('Error creating reaction:', error);
    }
  };
  useEffect(() => {
    fetchVis().then((data) => {
      try {
        const fragment = document.createRange().createContextualFragment(` <div>${data}</div>`);
        if (ref.current && fragment != null) {
          ref.current.innerHTML = '';
          ref.current.appendChild(fragment);
        }
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  return <div ref={ref} />;
};
