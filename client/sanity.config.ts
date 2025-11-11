import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'ojus.fyi',
  projectId: '5x6lmona',
  dataset: 'production',
  basePath: '/manage',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
