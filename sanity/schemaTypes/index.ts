import { type SchemaTypeDefinition } from 'sanity'
import event from './event'
import blog from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, blog],
}