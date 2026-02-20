const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Portfolio',
      version: '1.0.0',
      description: 'Documentation API complète pour le portfolio développeur',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // ================= Project =================
        Project: {
          type: 'object',
          required: [
            'title',
            'projectType',
            'shortDescription',
            'coverImage',
            'presentation',
          ],
          properties: {
            title: {
              type: 'string',
              example: 'Kasa - Application de location',
            },
            order: { type: 'integer', default: 0, example: 1 },
            projectType: {
              type: 'string',
              description: 'ID du ProjectType',
              example: '64fa123abc456def7890ghij',
            },
            technologies: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ID de la Technology',
                example: '64fa123abc456def7890ghik',
              },
            },
            languages: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ID du ProgrammingLanguage',
                example: '64fa123abc456def7890ghil',
              },
            },
            shortDescription: {
              type: 'string',
              example: 'Refonte front-end React d’un site de location.',
            },
            coverImage: { type: 'string', example: '/images/kasa-cover.png' },
            stack: {
              type: 'array',
              items: { type: 'string', example: 'React' },
            },
            presentation: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                  example: 'Refonte complète du front-end avec React.',
                },
                context: {
                  type: 'string',
                  example: 'Client Kasa, ancien site ASP.NET à moderniser.',
                },
                objectives: {
                  type: 'string',
                  example: 'Créer des composants réutilisables et responsive.',
                },
                skills: {
                  type: 'string',
                  example: 'React, Sass, Responsive Design, React Router.',
                },
                results: {
                  type: 'string',
                  example: 'Site fonctionnel, responsive et maintenable.',
                },
                improvements: {
                  type: 'string',
                  example:
                    'Ajouter une API pour les données dynamiques futures.',
                },
              },
            },
            gallery: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  desktopUrl: {
                    type: 'string',
                    example: '/images/kasa-desktop.png',
                  },
                  mobileUrl: {
                    type: 'string',
                    example: '/images/kasa-mobile.png',
                  },
                  alt: {
                    type: 'string',
                    example: 'Vue desktop et mobile de la page d’accueil',
                  },
                  order: { type: 'integer', example: 0 },
                },
              },
            },
            githubUrl: {
              type: 'string',
              example: 'https://github.com/donovan-dev-web/Projet-Kasa',
            },
            isLive: { type: 'boolean', example: true },
            liveUrl: { type: 'string', example: 'https://kasa-demo.com' },
          },
        },

        // ================= ProjectType =================
        ProjectType: {
          type: 'object',
          required: ['name', 'icon'],
          properties: {
            name: { type: 'string', example: 'Frontend' },
            icon: { type: 'string', example: '/icons/frontend.png' },
          },
        },

        // ================= Technology =================
        Technology: {
          type: 'object',
          required: ['name', 'icon'],
          properties: {
            name: { type: 'string', example: 'React' },
            icon: { type: 'string', example: '/icons/react.png' },
          },
        },

        // ================= ProgrammingLanguage =================
        ProgrammingLanguage: {
          type: 'object',
          required: ['name', 'icon'],
          properties: {
            name: { type: 'string', example: 'TypeScript' },
            icon: { type: 'string', example: '/icons/typescript.png' },
          },
        },

        // ================= Message =================
        Message: {
          type: 'object',
          required: ['name', 'email', 'content'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            phone: { type: 'string', example: '0612345678' },
            content: {
              type: 'string',
              example: 'Bonjour, je souhaite vous contacter pour...',
            },
            read: { type: 'boolean', example: false },
            dateSent: {
              type: 'string',
              format: 'date-time',
              example: '2026-02-19T10:20:30Z',
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // prend automatiquement les annotations Swagger des routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
