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
            slug: {
              type: 'string',
              example: 'kasa-application-de-location',
            },
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
            coverImage: {
              type: 'object',
              properties: {
                small: { type: 'string', example: '/images/kasa-cover-sm.png' },
                medium: { type: 'string', example: '/images/kasa-cover-md.png' },
                large: { type: 'string', example: '/images/kasa-cover-lg.png' },
              },
            },
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
                  desktop: {
                    type: 'object',
                    properties: {
                      small: { type: 'string', example: '/images/kasa-desktop-sm.png' },
                      medium: { type: 'string', example: '/images/kasa-desktop-md.png' },
                      large: { type: 'string', example: '/images/kasa-desktop-lg.png' },
                    },
                  },
                  mobile: {
                    type: 'object',
                    properties: {
                      small: { type: 'string', example: '/images/kasa-mobile-sm.png' },
                      medium: { type: 'string', example: '/images/kasa-mobile-md.png' },
                      large: { type: 'string', example: '/images/kasa-mobile-lg.png' },
                    },
                  },
                  alt: {
                    type: 'string',
                    example: 'Vue desktop et mobile de la page d’accueil',
                  },
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
        Doc: {
          type: 'object',
          required: ['kind', 'name', 'url', 'pathname', 'contentType', 'size'],
          properties: {
            kind: { type: 'string', example: 'cv' },
            name: { type: 'string', example: 'Donovan-Chartrain-CV.pdf' },
            url: { type: 'string', example: 'http://localhost:3000/uploads/docs/cv-123.pdf' },
            pathname: { type: 'string', example: '/uploads/docs/cv-123.pdf' },
            contentType: { type: 'string', example: 'application/pdf' },
            size: { type: 'number', example: 245678 },
            downloadCount: { type: 'number', example: 12 },
            lastDownloadedAt: { type: 'string', format: 'date-time' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '64fa123abc456def7890ghij' },
            email: { type: 'string', example: 'admin@example.com' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        SignupStatus: {
          type: 'object',
          properties: {
            signupEnabled: { type: 'boolean', example: true },
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
