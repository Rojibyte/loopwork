import {defineType, defineField} from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'client'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'client', type: 'string'}),
    defineField({name: 'industry', type: 'string'}),
    defineField({name: 'summary', type: 'text', rows: 4}),
    defineField({name: 'metricValue', type: 'string'}),
    defineField({name: 'metricLabel', type: 'string'}),
    defineField({
      name: 'facts',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'fact',
          fields: [
            defineField({name: 'label', type: 'string'}),
            defineField({name: 'value', type: 'string'}),
          ],
        },
      ],
    }),
    defineField({name: 'isSample', type: 'boolean', initialValue: true}),
    defineField({name: 'order', type: 'number'}),
  ],
})
