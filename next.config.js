const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : ''

module.exports = {
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
  images: {
    domains: ['cdn-ak.f.st-hatena.com'], // ここにホスト名を追加
  }
};