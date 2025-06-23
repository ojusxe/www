import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import galleryItem from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'dreamspace',

  projectId: '5x6lmona',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [galleryItem],
  },
})
