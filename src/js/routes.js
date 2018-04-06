/* eslint-disable react/prop-types */

import React from 'react';
import {
  toAngURL,
  getQueryParams,
  getParameterByName,
  throwError,
} from './util';
import { Redirect } from 'react-router-dom';
import RenderPromise from './components/RenderPromise';
import Layout from './components/Layout';
import RedirectExternal from './components/RedirectExternal';
import Home from './pages/Home';
import { DEFAULT_SEARCH_SOURCE, DEFAULT_SEARCH_TYPE } from './constants';
import SEO from '../../common/seo';

export function NotFound() {
  return (
    <Layout title={SEO['/404'].title}>
      <RenderPromise
        promise={() =>
          import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
        }
      >
        {({ pending, resolved: { default: NotFoundLayout } = {}, rejected }) =>
          pending ? null : NotFoundLayout ? (
            <NotFoundLayout />
          ) : (
            throwError(
              `We are having trouble in rendering this route.`,
              rejected
            )
          )
        }
      </RenderPromise>
    </Layout>
  );
}

export default [
  {
    path: '/',
    exact: true,
    render(props) {
      return (
        <Layout title={SEO['/'].title} isHome {...props}>
          <Home {...props} />
        </Layout>
      );
    },
  },
  {
    path: '/terms-of-service',
    render(props) {
      return (
        <Layout title="Terms Of Service" {...props}>
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "TermsOfService" */ './pages/TermsOfService')
            }
          >
            {({
              pending,
              resolved: { default: TermsOfService } = {},
              rejected,
            }) =>
              pending ? null : TermsOfService ? (
                <TermsOfService {...props} />
              ) : (
                throwError(
                  `We are having trouble in rendering this route.`,
                  rejected
                )
              )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/about',
    render(props) {
      return (
        <Layout title="About - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "About" */ './pages/About')
            }
          >
            {({ pending, resolved: { default: About } = {}, rejected }) =>
              pending ? null : About ? (
                <About {...props} />
              ) : (
                throwError(
                  `We are having trouble in rendering this route.`,
                  rejected
                )
              )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/ang',
    render(props) {
      const [ang, source, highlight] = ['ang', 'source', 'highlight'].map(v =>
        getParameterByName(v)
      );

      return (
        <Layout
          defaultQuery={ang}
          title="Ang/Page Viewer - SikhiToTheMax"
          {...props}
        >
          <RenderPromise
            promise={() => import(/* webpackChunkName: "Ang" */ './pages/Ang')}
          >
            {({ pending, resolved: { default: Ang } = {}, rejected }) =>
              pending ? null : Ang ? (
                <Ang
                  ang={parseInt(ang, 10)}
                  source={source}
                  highlight={
                    highlight === undefined
                      ? undefined
                      : parseInt(highlight, 10)
                  }
                  {...props}
                />
              ) : (
                throwError(
                  `We are having trouble in rendering this route.`,
                  rejected
                )
              )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/index',
    render(props) {
      return (
        <Layout title="Index - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "GranthIndex" */ './pages/GranthIndex')
            }
          >
            {({ pending, resolved: { default: Index } = {}, rejected }) =>
              pending ? null : Index ? (
                <Index {...props} />
              ) : (
                throwError(
                  `We are having trouble in rendering this route.`,
                  rejected
                )
              )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/help',
    render(props) {
      return (
        <Layout title="Help - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Help" */ './pages/Help')
            }
          >
            {({ pending, resolved: { default: Help } = {}, rejected }) =>
              pending ? null : Help ? (
                <Help {...props} />
              ) : (
                throwError(
                  `We are having trouble in rendering this route.`,
                  rejected
                )
              )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/hukamnama',
    render(props) {
      return (
        <Layout title="Hukamnama - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Hukamnama" */ './pages/Hukamnama')
            }
          >
            {({ pending, resolved: { default: Hukamnama } = {}, rejected }) =>
              pending ? null : Hukamnama ? (
                <Hukamnama {...props} />
              ) : (
                throwError(
                  `We are having trouble in rendering this route.`,
                  rejected
                )
              )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/search',
    render(props) {
      const { location: { search } } = props;
      const params = ['type', 'source', 'q', 'offset'];

      const [
        type = DEFAULT_SEARCH_TYPE,
        source = DEFAULT_SEARCH_SOURCE,
        q = '',
        offset = 0,
      ] = params.map(v => getParameterByName(v, search));

      if (parseInt(type, 10) === 5) {
        return <Redirect to={toAngURL({ ang: q, source })} />;
      }

      return (
        <Layout
          defaultQuery={q}
          title="Search Results - SikhiToTheMax"
          {...props}
        >
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Search" */ './pages/Search')
            }
          >
            {({ pending, resolved: { default: Search } = {}, rejected }) =>
              pending ? null : Search ? (
                <Search
                  q={q}
                  type={parseInt(type, 10)}
                  source={source}
                  offset={parseInt(offset)}
                  {...props}
                />
              ) : (
                throwError(
                  `We are having trouble in rendering this route.`,
                  rejected
                )
              )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/shabad',
    render(props) {
      const { location: { search } } = props;

      if (location.search === '') {
        return <Redirect to="/random" />;
      }

      const [random, id, q, type, highlight] = [
        'random',
        'id',
        'q',
        'type',
        'highlight',
      ].map(v => getParameterByName(v, search));

      const otherProps = {
        id,
        q,
        type,
        random: random !== undefined && random === '' ? true : false,
        highlight:
          highlight === undefined ? undefined : parseInt(highlight, 10),
      };

      return (
        <Layout defaultQuery={q} title="Shabad - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Shabad" */ './pages/Shabad')
            }
          >
            {({ pending, resolved: { default: Shabad } = {}, rejected }) =>
              pending ? null : Shabad ? (
                <Shabad {...otherProps} {...props} />
              ) : (
                throwError(
                  `We are having trouble in rendering this route.`,
                  rejected
                )
              )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/random',
    render() {
      return <Redirect to="/shabad?random" />;
    },
  },
  {
    path: '/search.asp',
    render() {
      return <Redirect to="/" />;
    },
  },
  {
    path: '/page.asp',
    render() {
      const query = getQueryParams();
      let url = '';

      if (query.SourceID && query.PageNo) {
        url = toAngURL({ ang: query.PageNo, source: query.SourceID });
      } else if (query.ShabadID) {
        url = `/shabad?id=${query.ShabadID}`;
      } else if (query.random) {
        url = '/shabad?random';
      }
      return <Redirect to={url} />;
    },
  },
  {
    path: '/rehat.asp',
    render() {
      return (
        <Layout>
          <RedirectExternal
            to="https://khalisfoundation.org/portfolio/maryada/"
            name="Maryada page"
          />
        </Layout>
      );
    },
  },
  {
    path: '/tabla.asp',
    render() {
      return (
        <Layout>
          <RedirectExternal to="https://tabla.pro" name="Tabla Page" />
        </Layout>
      );
    },
  },
];
