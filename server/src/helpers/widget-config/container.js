export const containerConfig = {
  name: 'Container',
  displayName: 'Container',
  description: 'Group components',
  defaultSize: {
    width: 5,
    height: 200,
  },
  component: 'Container',
  others: {
    showOnDesktop: { type: 'toggle', displayName: 'Show on desktop' },
    showOnMobile: { type: 'toggle', displayName: 'Show on mobile' },
  },
  properties: {
    loadingState: {
      type: 'toggle',
      displayName: 'Loading state',
      validation: {
        schema: { type: 'boolean' },
        defaultValue: false,
      },
    },
    showHeader: {
      type: 'toggle',
      displayName: 'Show header',
      validation: {
        schema: { type: 'boolean' },
        defaultValue: false,
      },
    },
  },
  events: {},
  styles: {
    backgroundColor: {
      type: 'color',
      displayName: 'Background',
      validation: {
        schema: { type: 'string' },
        defaultValue: '#fff',
      },
    },
    headerBackgroundColor: {
      type: 'color',
      displayName: 'Header',
      validation: {
        schema: { type: 'string' },
        defaultValue: '#fff',
      },
    },
    headerHeight: {
      type: 'numberInput',
      displayName: 'Header height',
      validation: {
        schema: { type: 'number' },
        defaultValue: 80,
      },
      accordian: 'field',
    },
    borderRadius: {
      type: 'code',
      displayName: 'Border radius',
      validation: {
        schema: {
          type: 'union',
          schemas: [{ type: 'string' }, { type: 'number' }],
        },
        defaultValue: 4,
      },
    },
    borderColor: {
      type: 'color',
      displayName: 'Border color',
      validation: {
        schema: { type: 'string' },
        defaultValue: '#fff',
      },
    },
    visibility: {
      type: 'toggle',
      displayName: 'Visibility',
      validation: {
        schema: { type: 'boolean' },
        defaultValue: true,
      },
    },
    disabledState: {
      type: 'toggle',
      displayName: 'Disable',
      validation: {
        schema: { type: 'boolean' },
      },
      defaultValue: false,
    },
  },
  exposedVariables: {},
  defaultChildren: [
    {
      componentName: 'Text',
      layout: {
        top: 20,
        left: 1,
        height: 40,
      },
      displayName: 'ContainerText',
      properties: ['text'],
      accessorKey: 'text',
      styles: ['fontWeight', 'textSize', 'textColor'],
      defaultValue: {
        text: 'Container title',
        fontWeight: 'bold',
        textSize: 16,
        textColor: '#000',
      },
    },
  ],
  definition: {
    others: {
      showOnDesktop: { value: '{{true}}' },
      showOnMobile: { value: '{{false}}' },
    },
    properties: {
      visible: { value: '{{true}}' },
      loadingState: { value: `{{false}}` },
      showHeader: {
        value: `{{false}}`
      },
    },
    events: [],
    styles: {
      backgroundColor: { value: '#fff' },
      headerBackgroundColor: { value: '#fff' },
      borderRadius: { value: '4' },
      borderColor: { value: '#fff' },
      visibility: { value: '{{true}}' },
      disabledState: { value: '{{false}}' },
      headerHeight: {
        value: `80`,
      },
    },
  },
};
