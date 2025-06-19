import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'etta-projects',
  labels: {
    plural: 'Projects',
    singular: 'Project',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'active',
      label: 'Active',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'projectName',
      label: 'Project Name',
      type: 'text',
      required: true,
    },
    {
      name: 'projectType',
      type: 'select',
      options: ['Website', 'Mobile'],
      required: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tags',
      type: 'select',
      options: [
        'Taiga',
        'Postman',
        'MySQL',
        'Google Sheet',
        'TEMAN',
        'Jira',
        'Confluence',
        'Swagger',
        'DBeaver',
        'Spreadsheet',
        'Microsoft Office',
      ],
      // enumName: 'etta_projects_tags',
      hasMany: true,
    },
    {
      name: 'detail',
      type: 'richText',
      label: 'Details Projects',
    },
  ],
  admin: {
    useAsTitle: 'projectName',
    pagination: {
      defaultLimit: 10,
      limits: [10, 20, 50],
    },
    defaultColumns: ['projectName', 'projectType', 'role', 'active', 'filename'],
    group: 'Margaretta Collections',
  },
  upload: {
    mimeTypes: ['image/*'],
    filesRequiredOnCreate: false,
    displayPreview: true,
    staticDir: './media/etta-projects',
  },
}
