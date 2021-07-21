import type { AWS } from '@serverless/typescript';

import addUser from '@functions/add-user';
import getUsers from '@functions/get-users';
import getProposals from '@functions/get-proposals';
import addProposal from '@functions/add-proposal';
import acceptProposal from '@functions/accept-proposal';

const serverlessConfiguration: AWS = {
  service: 'poke-trader',
  package: {
    individually: true,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { addUser, getUsers, addProposal, getProposals, acceptProposal },
};

module.exports = serverlessConfiguration;
