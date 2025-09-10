import { type SchemaTypeDefinition } from 'sanity'
import event from './event'
import blog from './blog'
import pastEvent from './pastEvent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, blog, pastEvent],
}