// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const prism = require('prism-react-renderer');
const editUrl = {
  editUrl: "https://github.com/conda-forge/conda-forge.github.io/tree/main/",
};

var copyright = `Copyright © ${new Date().getFullYear()} conda-forge · Built with Docusaurus`;
if (process.env.NETLIFY) {
  copyright += ` · Deployed on <a href="https://www.netlify.com/" target="_blank">Netlify</a>`;
}

const goatcounter = {
  // see stats at https://conda-forge.goatcounter.com/
  src: "/js/count.js",
  defer: true,
  "data-goatcounter": "https://conda-forge.goatcounter.com/count",
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "conda-forge | community-driven packaging for conda",
  url: "https://conda-forge.org/",
  baseUrl: "/",
  onBrokenLinks: process.env.GITHUB_ACTIONS ? "throw" : "warn",
  onBrokenMarkdownLinks: process.env.GITHUB_ACTIONS ? "throw" : "warn",
  onBrokenAnchors: process.env.GITHUB_ACTIONS ? "throw" : "warn",
  favicon: "img/favicon.ico",
  trailingSlash: true,
  staticDirectories: ['static', 'static-sphinx'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "conda-forge", // Usually your GitHub org/user name.
  projectName: "conda-forge.github.io", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  stylesheets: [
    //Add Font Awesome stylesheets
    "/fonts/font-awesome/fontawesome.css",
    "/fonts/font-awesome/solid.css",
    "/fonts/font-awesome/regular.css",
    "/fonts/font-awesome/brands.css",
  ],

  scripts: [
    // Only deploy stats on production site, not locally or on Netlify
    ...((process.env.GITHUB_ACTIONS) ? [goatcounter] : []),
  ],

  // Mermaid configuration
  markdown: {
    mermaid: true,
    format: "detect",
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: true,
          // ...editUrl,
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 10,
          ...editUrl,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    './plugins/csv-loader',
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: "community",
        path: "community",
        routeBasePath: "/community",
        breadcrumbs: false,
      }),
    ],
    [
      "content-blog",
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      {
        id: "news",
        path: "./news",
        routeBasePath: "news",
        showReadingTime: false,
        blogSidebarTitle: "Latest announcements",
        blogSidebarCount: 10, /* This can be set to 'ALL' if needed */
        postsPerPage: 10, /* This can be set to 'ALL' if needed */
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html", "htm"],
        createRedirects(existingPath) {
          var redirects = [];
          if (existingPath.startsWith('/blog/tags/')) {
            redirects.push(`/blog/blog/tag/${existingPath.slice(11)}`)
          }
          if (existingPath == '/blog/archive/') {
            redirects.push("/blog/2023/");
            redirects.push("/blog/2022/");
            redirects.push("/blog/2021/");
            redirects.push("/blog/2020/");
            redirects.push("/blog/2019/");
          }
          if (
            [
              "/docs/",
              "/docs/user/",
              "/docs/misc/",
              "/docs/maintainer/",
            ].includes(existingPath)
          ) {
            redirects.push(`${existingPath}00_intro.html`);
          }
          return redirects;
        },
        redirects: [
          {
            from: "/feedstock-outputs",
            to: "/packages/",
          },
          /* blog redirects */
          {
            from: "/blog/blog/",
            to: "/blog/",
          },
          {
            from: "/blog/posts/2019-12-06-cfep09/",
            to: "/blog/2019/12/06/cfep09/",
          },
          {
            from: "/blog/posts/2020-02-04-GSoC/",
            to: "/blog/2020/02/04/gsoc/",
          },
          {
            from: "/blog/posts/2020-03-05-grayskull/",
            to: "/blog/2020/03/05/grayskull/",
          },
          {
            from: "/blog/posts/2020-03-10-pypy/",
            to: "/blog/2020/03/10/pypy/",
          },
          {
            from: "/blog/posts/2020-07-02-op-risk/",
            to: "/blog/2020/07/02/op-risk/",
          },
          {
            from: "/blog/posts/2020-07-06-scipy-bof/",
            to: "/blog/2020/07/06/scipy-bof/",
          },
          {
            from: "/blog/posts/2020-07-11-R-4/",
            to: "/blog/2020/07/11/r-4/",
          },
          {
            from: "/blog/posts/2020-10-02-versions/",
            to: "/blog/2020/10/02/versions/",
          },
          {
            from: "/blog/posts/2020-10-29-macos-arm64/",
            to: "/blog/2020/10/29/macos-arm64/",
          },
          {
            from: "/blog/posts/2020-11-20-anaconda-tos/",
            to: "/blog/2020/11/20/anaconda-tos/",
          },
          {
            from: "/blog/posts/2020-12-26-year-in-review/",
            to: "/blog/2020/12/26/year-in-review/",
          },
          {
            // case sensitive only on Linux!
            from: ["/blog/posts/2021-02-02-outreachy/", ...((process.platform === "linux") ? ["/blog/posts/2021-02-02-Outreachy/"] : [])],
            to: "/blog/2021/02/02/outreachy/",
          },
          {
            from: "/blog/posts/2021-06-16-graykull-step-by-step/",
            to: "/blog/2021/06/16/graykull-step-by-step/",
          },
          {
            from: "/blog/posts/2021-09-24-travis-security/",
            to: "/blog/2021/09/24/travis-security/",
          },
          {
            from: "/blog/posts/2021-11-03-tensorflow-gpu/",
            to: "/blog/2021/11/03/tensorflow-gpu/",
          },
          {
            from: [
              "/blog/posts/2022-08-19-outreachy-wrap-up-blog-2022/",
              "/blog/2022/08/19/outreachy-wrap-up-blog-2022/",
            ],
            to: "/blog/2022/08/26/outreachy-wrap-up-blog-2022/",
          },
          {
            from: "/blog/posts/2023-03-12-circle-ci-security-breach/",
            to: "/blog/2023/03/12/circle-ci-security-breach/",
          },
          {
            from: "/blog/posts/2023-07-13-installer-security-fixes/",
            to: "/blog/2023/07/13/installer-security-fixes/",
          },
          /* user redirects */
          {
            from: "/docs/user/announcements.html",
            to: "/announcements/",
          },
          /* organization redirects */
          {
            from: ["/docs/orga/", "/docs/orga/00_intro.html"],
            to: "/community/",
          },
          {
            from: "/docs/orga/governance.html",
            to: "/community/governance/",
          },
          {
            from: "/docs/orga/subteams.html",
            to: "/community/subteams/",
          },
          {
            from: "/docs/orga/joining-the-team.html",
            to: "/community/join/",
          },
          {
            from: "/docs/orga/cfep-index.html",
            to: "/community/cfep/",
          },
          {
            from: "/docs/orga/getting-in-touch.html",
            to: "/community/get-in-touch/",
          },
          {
            from: ["/docs/contracting/", "/docs/contracting/00_intro.html"],
            to: "/community/contracting/",
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: "conda-forge anvil logo without text",
          src: "img/logo.png",
        },
        items: [
          {
            // https://docusaurus.io/docs/advanced/routing#escaping-from-spa-redirects
            to: "/docs/",
            label: "Docs",
            position: "left",
          },
          {
            to: "/community/",
            label: "Community",
            position: "left",
          },
          {
            to: "/news/",
            label: "News",
            position: "left",
          },
          {
            to: "/blog/",
            label: "Blog",
            position: "left",
          },
          {
            href: "https://conda-forge.org/status",
            label: "Status",
            position: "left",
          },
          {
            to: "/packages/",
            label: "Packages",
            position: "left",
          },
          {
            href: "https://opencollective.com/conda-forge",
            label: "Donate",
            position: "right",
          },
          {
            to: "https://github.com/conda-forge",
            title: "GitHub",
            position: "right",
            target: "_blank",
            className: "fab fa-lg fa-github",
          },
          {
            to: "https://twitter.com/condaforge",
            title: "Twitter",
            position: "right",
            target: "_blank",
            className: "fab fa-lg fa-twitter",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting started",
                to: "/docs/",
              },
              {
                label: "User docs",
                to: "/docs/user/",
              },
              {
                label: "Maintainer docs",
                to: "/docs/maintainer/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "About conda-forge",
                to: "/community/",
              },
              {
                label: "Governance",
                to: "/community/governance/",
              },
              {
                label: "Meeting minutes",
                to: "/docs/orga/minutes/",
              },
              {
                label: "Get in touch",
                to: "/community/get-in-touch/",
              },
            ],
          },
          {
            title: "Stay up-to-date",
            items: [
              {
                label: "News",
                to: "/news/archive/",
              },
              {
                label: "Blog",
                to: "/blog/archive/",
              },
              {
                label: "Status",
                href: "https://conda-forge.org/status",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/condaforge",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Dashboard",
                to: "/dashboard/",
              },
              {
                label: "Style guide",
                to: "/style-guide/",
              },
              {
                label: "GitHub",
                href: "https://github.com/conda-forge",
              },
              {
                label: "Element",
                href: "https://app.element.io/#/room/#conda-forge:matrix.org",
              },
              {
                label: "Discourse",
                href: "https://conda.discourse.group/c/pkg-building/conda-forge/25",
              },
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/conda-forge",
              },
            ],
          },
        ],
        copyright: copyright,
      },
      prism: {
        theme: prism.themes.github,
        darkTheme: prism.themes.dracula,
        additionalLanguages: ['bash', 'diff', 'json', 'batch', 'yaml', 'python', 'markdown', 'shell-session'],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      // search bar engine
      algolia: {
        appId: 'KB43FQOB7U',
        apiKey: '344261a16fe108b599568222ae1b2e64',
        indexName: 'conda-forge',
        insights: false,
        contextualSearch: true,
      },
    }),
};

module.exports = config;
