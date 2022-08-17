import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'hbdeas',
  e2e: {
    baseUrl: 'http://localhost:4200',
    experimentalSessionAndOrigin: true,
  },
});
