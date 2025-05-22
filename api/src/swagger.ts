import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Definición básica la API con componentes y esquemas
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Trav Hotel Admin API',
      version: '1.0.0',
      description: 'Documentación de la API de Trav Hotel',
    },
    servers: [
      { url: 'http://localhost:3000/api', description: 'Servidor local' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        Employee: {
          type: 'object',
          properties: {
            employeeId: { type: 'string', example: 'EMP001' },
            name: { type: 'string', example: 'María García' },
            image: { type: 'string', format: 'uri', example: 'https://randomuser.me/api/portraits/women/21.jpg' },
            jobDesk: { type: 'string', example: 'Front Desk Manager' },
            schedule: { type: 'array', items: { type: 'string', example: 'Mon' } },
            hireDate: { type: 'string', format: 'date', example: '2021-06-15' },
            contact: { type: 'string', example: '+34-600-123-456' },
            status: { type: 'string', enum: ['Active', 'Inactive'] }
          },
          required: ['employeeId','name','image','jobDesk','schedule','hireDate','contact','status']
        },
        Guest: {
          type: 'object',
          properties: {
            guest: { type: 'string', example: 'Cathyadi Purnomo' },
            reservationId: { type: 'string', example: 'U001' },
            orderDate: { type: 'string', format: 'date-time', example: '2025-11-01T09:21:00Z' },
            checkIn: { type: 'string', format: 'date-time', example: '2025-11-23T15:00:00Z' },
            checkOut: { type: 'string', format: 'date-time', example: '2025-11-25T11:00:00Z' },
            specialRequest: { type: 'string', example: 'Late check-in, please have a vegan meal ready.' },
            roomType: { type: 'string', example: 'Deluxe A - 02' },
            status: { type: 'string', enum: ['Checked In','Pending','Booked','Cancelled','Refunded'] },
            email: { type: 'string', format: 'email', example: 'cathyadi.purnomo@example.com' },
            phone: { type: 'string', example: '+1-202-555-0134' },
            image: { type: 'string', format: 'uri', example: 'https://randomuser.me/api/portraits/women/1.jpg' }
          },
          required: ['guest','reservationId','orderDate','checkIn','checkOut','roomType','status','email','phone']
        },
        Room: {
          type: 'object',
          properties: {
            roomId: { type: 'string', example: 'R001' },
            roomName: { type: 'string', example: 'Deluxe King Room' },
            bedType: { type: 'string', example: 'King Bed' },
            roomFloor: { type: 'string', example: 'A-1' },
            facilities: { type: 'array', items: { type: 'string', example: 'Wi-Fi' } },
            rate: { type: 'string', example: '$120/Night' },
            status: { type: 'string', enum: ['Available','Booked','Maintenance','Out of Service'] },
            image: { type: 'string', format: 'uri', example: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' }
          },
          required: ['roomId','roomName','bedType','roomFloor','facilities','rate','status']
        }
      }
    }
  },
  apis: ['./src/controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
}