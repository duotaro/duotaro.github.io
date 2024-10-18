const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : ''

module.exports = {
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
  images: {
    domains: ['cdn-ak.f.st-hatena.com'], // ここにホスト名を追加
  },
  async redirects() {
    return [
      {
        source: '/blog/:categories',
        destination: '/blog/:categories/list',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: '/',
        permanent: true,
      },
    ]
  },
};