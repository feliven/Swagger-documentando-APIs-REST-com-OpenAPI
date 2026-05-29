import { Router } from "express";
import bookController from "./books/book.controller";
import { verifyToken } from "./auth/verify.middleware";

const routes = Router();

/**
 * @swagger
 * "/books":
 *   post:
 *     summary: Create a book
 *     tags:
 *       - Books
 *     requestBody:
 *       "$ref": "#/components/requestBodies/BookDtoRequest"
 *     responses:
 *       "201":
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/Book"
 *             example:
 *               title: The Great Gatsby
 *               author: F. Scott Fitzgerald
 *               ISBN: "9780744066868"
 *               _id: 6a18c271e2dac6c70e173c32
 *               __v: 0
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ErrorMsg"
 *
 */
routes.post("/books", bookController.create);

/**
 * @swagger
 * "/books":
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 "$ref": "#/components/schemas/Book"
 *       "401":
 *         description: "Error: Unauthorized"
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ErrorMsg"
 *       "403":
 *         description: "Error: Forbidden"
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ErrorMsg"
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ErrorMsg"
 *
 */
routes.get("/books", verifyToken, bookController.find);

/**
 * @swagger
 * "/books/{title}":
 *   parameters:
 *     - name: title
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *   get:
 *     summary: Find a book by title
 *     tags:
 *       - Books
 *     responses:
 *       "200":
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/Book"
 *       "404":
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ErrorMsg"
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ErrorMsg"
 *
 */
routes.get("/books/:title", bookController.findByTitle);

/**
 * @swagger
 * "/books/{id}":
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *   put:
 *     summary: Update a book
 *     tags:
 *       - Books
 *     requestBody:
 *       "$ref": "#/components/requestBodies/BookDtoRequest"
 *     responses:
 *       "200":
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedBook:
 *                   "$ref": "#/components/schemas/Book"
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ErrorMsg"
 *       "404":
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ErrorMsg"
 *
 */
routes.put("/books/:id", bookController.update);

/***
 * @swagger
 *"/books/{id}":
 *  delete:
 *     summary: Delete a book
 *     tags:
 *       - Books
 *     responses:
 *       "204":
 *         description: Book deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedBook:
 *                   "$ref": "#/components/schemas/Book"
 *       "404":
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ErrorMsg"
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ErrorMsg"
 */
routes.delete("/books/:id", bookController.delete);

export { routes };
