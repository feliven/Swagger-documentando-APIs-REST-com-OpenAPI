import swaggerJsDoc from "swagger-jsdoc";

/**
 * @swagger
 * components:
 *  schemas:
 *    BookDto:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        author:
 *          type: string
 *        ISBN:
 *          type: string
 *    Book:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        author:
 *          type: string
 *        ISBN:
 *          type: string
 *        _id:
 *          type: string
 *        __v:
 *          type: integer
 *    ErrorMsg:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *  requestBodies:
 *    BookDtoRequest:
 *      content:
 *        application/json:
 *          schema:
 *            "$ref": "#/components/schemas/BookDto"
 *          example:
 *            title: The Great Gatsby
 *            author: F. Scott Fitzgerald
 *            ISBN: "9780744066868"
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *
 * @swagger
 *  tags:
 *    name: Books
 */
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book API",
      version: "1.0.0",
      description: "CRUD Book API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [`${__dirname}/auth/auth.routes.ts`, `${__dirname}/routes.ts`, `${__dirname}/swagger.ts`],
});

export default swaggerSpec;
