// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/period/1h',
        permanent: true,
      },
    ]
  },
}

module.exports = withNx(nextConfig)
