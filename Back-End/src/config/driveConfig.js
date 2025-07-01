import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import dotenv from 'dotenv';

dotenv.config();

const credential = new ClientSecretCredential(
  process.env.TENANT_ID,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

const graphClient = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const token = await credential.getToken(
        'https://graph.microsoft.com/.default'
      );
      return token.token;
    },
  },
});

export default graphClient;
