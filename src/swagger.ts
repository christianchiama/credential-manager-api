export const swagger = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Credential Manager API',
    description: 'API for Credential Manager App',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host: 'localhost:8000',
  basePath: '/api/v1/',
  tags: [
    {
      name: 'Users',
      description: 'API for handler the users in the system',
    },
  ],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users in system',
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },
  },
  definitions: {
    User: {
      required: ['name', '_id', 'companies'],
      properties: {
        _id: {
          type: 'integer',
          uniqueItems: true,
        },
        isPublic: {
          type: 'boolean',
        },
        name: {
          type: 'string',
        },
        books: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              amount: {
                type: 'number',
              },
            },
          },
        },
        companies: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
}
