const suffix = suffix => (value = '') =>
  `${value}${value === '' ? '' : ' - '}${suffix}`;

const suffixAppName = suffix('SikhiToTheMax');

export default {
  '/': {
    title: suffixAppName(),
    meta: () => `SikhiToTheMax, online Gurbani Searcher`,
  },
  '/404': {
    title: suffixAppName('Page not found'),
    meta: () => `Page not found.`,
  },
  '/terms-of-service': {
    title: suffixAppName('Terms Of Service'),
    meta: () => `Terms of Service of SikhiToTheMax.`,
  },
  '/about': {
    title: suffixAppName('About'),
    meta: () =>
      `SikhiToTheMax is backed by a non-profit organization named Khalis Foundation.`,
  },
  '/ang': {
    title: suffixAppName('Ang/Page Viewer'),
    meta: (ang, sourceName) => `Read page number ${ang} of ${sourceName} now`,
  },
  '/index': {
    title: suffixAppName('Index'),
    meta: () =>
      `Index page of Sri Guru Granth Sahib Jee and other Sikh Granths.`,
  },
  '/help': {
    title: suffixAppName('Help'),
    meta: () => `Need help in understanding how to use SikhiTheMax?`,
  },
  '/hukamnama': {
    title: suffixAppName('Hukamanama'),
    meta: () =>
      `Read daily Hukamnama from Sri Darbar Sahib, Harmandir Sahib (Golden Temple) Amritsar online now.`,
  },
  '/search': {
    title: suffixAppName('Search Results'),
    meta: () =>
      `Search Shabads and Gurbani by Sikh Gurus and Bhagats like Bhagat Kabeer Jee, Sheikh Fareed Jee.`,
  },
  '/shabad': {
    shabad: suffixAppName('Shabad'),
    meta: line => `Read shabad ${line} online right now.`,
  },
};
