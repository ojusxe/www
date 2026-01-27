export default {
  name: 'musicTrack',
  title: 'Music Track',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/mp3,audio/mpeg,audio/wav',
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
