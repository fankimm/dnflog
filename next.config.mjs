/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
  ],
  rewrites: async () => {
    return [
      {
        source: '/df/:path*',
        destination: 'https://api.neople.co.kr/df/:path*',
      },
    ];
  },
};

export default nextConfig;
