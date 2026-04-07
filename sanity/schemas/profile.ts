import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Profile',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cv',
      title: 'CV (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload your latest CV in PDF format.',
    }),
  ],
})
