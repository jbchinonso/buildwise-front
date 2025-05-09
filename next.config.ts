import type { NextConfig } from "next";
const nextConfig: NextConfig = {
 
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeAttrs",
                  params: { attrs: "(stroke-opacity|stroke)" },
                },
                {
                  name: "addAttributesToSVGElement",
                  params: {
                    attributes: [{ stroke: "currentColor" }],
                  },
                },
                {
                  name: "convertStyleToAttrs",
                },
              ],
            },
            icon: true,
            ref: true,
          },
        },
      ],
    });

    return config;
  },
  output: "standalone",
};


module.exports = nextConfig;