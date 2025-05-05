import react from '@vitejs/plugin-react';
import { FastifyInstance } from 'fastify';
import { defineConfig, loadEnv, PluginOption } from 'vite';
import { RequestAdapter, VitePluginNode } from 'vite-plugin-node';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { compact } from 'lodash-es';

/**
 * @see https://github.com/axe-me/vite-plugin-node/issues/47#issuecomment-1170609237
 */
const fastifyAdapter: RequestAdapter<FastifyInstance> = async ({
  app,
  req,
  res,
  next,
}) => {
  if (req.url?.startsWith('/api/')) {
    await app.ready();
    app.routing(req, res);
  } else {
    next();
  }
};

function getSentryPlugin(mode: string) {
  if (!process.env.SENTRY_AUTH_TOKEN) {
    throw new Error('SENTRY_AUTH_TOKEN env token is missing');
  }

  return sentryVitePlugin({
    org: 'aviata',
    project: 'yeanot',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    url: process.env.SENTRY_URL,
    debug: true,
    release: {
      name: process.env.RELEASE,
      deploy: {
        env: mode,
      },
      setCommits: {
        auto: true,
      },
    },
    sourcemaps: {
      assets: ['./dist/*'],
      ignore: ['node_modules'],
      deleteFilesAfterUpload: ['./dist/app.js.map'],
    },
    telemetry: false,
  }) as PluginOption;
}

interface ModeConfig {
  base?: string;
  sourcemap: boolean;
  useSentryPlugin: boolean;
  NODE_ENV: 'production' | 'development';
}

function getStagingModeConfig(): ModeConfig {
  if (!process.env.S3_BUCKET) {
    throw new Error('S3_BUCKET env key is missing');
  }

  return {
    base: `https://${process.env.S3_BUCKET}/yeanot/staging/`,
    sourcemap: true,
    useSentryPlugin: false,
    NODE_ENV: 'production',
  };
}

function getProductionModeConfig(): ModeConfig {
  if (!process.env.RELEASE) {
    throw new Error('RELEASE env key is missing');
  }

  if (!process.env.S3_BUCKET) {
    throw new Error('S3_BUCKET env key is missing');
  }

  return {
    base: `https://${process.env.S3_BUCKET}/yeanot/releases/${process.env.RELEASE}/`,
    sourcemap: true,
    useSentryPlugin: true,
    NODE_ENV: 'production',
  };
}

function getDevModeConfig(): ModeConfig {
  return {
    sourcemap: false,
    useSentryPlugin: false,
    NODE_ENV: 'development',
  };
}

function getModeConfig(mode: string) {
  switch (mode) {
    case 'production':
      return getProductionModeConfig();
    case 'staging':
      return getStagingModeConfig();
    default:
      return getDevModeConfig();
  }
}

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';

  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  const modeConfig = getModeConfig(mode);

  return {
    base: modeConfig.base,
    build: {
      target: 'esnext',
      sourcemap: modeConfig.sourcemap,
      ssrEmitAssets: true,
      assetsInlineLimit: 0,
    },
    plugins: compact([
      tsconfigPaths(),
      // @ts-expect-error tsconfig moduleResolution affects react plugin type defs
      react(),
      VitePluginNode({
        adapter: fastifyAdapter,
        appPath: './src/app.tsx',
      }),
      modeConfig.useSentryPlugin && getSentryPlugin(mode),
    ]),
    define: {
      __DEV__: process.env.NODE_ENV === 'development',
    },
    ssr: {
      noExternal: isBuild ? ['hyphen'] : [],
    },
    test: {
      setupFiles: ['./vitest-setup.ts'],
      testTimeout: 30_000,
    },
  };
});
