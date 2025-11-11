import { defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'media',
      title: 'Image or GIF',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
})
