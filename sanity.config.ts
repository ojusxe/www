// define the sanity studio

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5x6lmona'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'ojus.fyi',
  projectId,
  dataset,
  /* this is where the studio / CMS interface will be available, no need to go to separate sanity's studio URL */
  basePath: '/manage', 
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
