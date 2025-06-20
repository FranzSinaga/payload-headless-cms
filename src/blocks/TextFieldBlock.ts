import { Block } from 'payload'

export const TextFieldBlock: Block = {
  slug: 'text-field-block',
  imageAltText: 'Text Field Block',
  interfaceName: 'TextFieldBlock',
  fields: [
    {
      type: 'textarea',
      label: 'Text Field',
      name: 'textField',
    },
  ],
}
