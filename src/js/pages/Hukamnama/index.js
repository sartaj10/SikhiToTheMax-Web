/* globals API_URL */
import React from 'react';
import { buildApiUrl } from 'shabados';
import PageLoader from '../PageLoader';
import Layout, { Stub } from './Layout';

export default class Hukamnama extends React.PureComponent {
  render() {
    const url = buildApiUrl({ hukam: true, API_URL });

    return (
      <PageLoader url={url}>
        {({ loading, data }) => (loading ? <Stub /> : <Layout data={data} />)}
      </PageLoader>
    );
  }
}
