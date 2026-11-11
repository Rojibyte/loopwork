import {defineType, defineField} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'description', type: 'text', rows: 4}),
    defineField({name: 'deliverables', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'extraGroupTitle', type: 'string'}),
    defineField({name: 'extraGroupItems', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'order', type: 'number'}),
  ],
})
