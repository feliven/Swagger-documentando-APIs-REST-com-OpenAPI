import express, { Request, Response } from "express";
import { authService } from "./auth.service";
import { userService } from "../user/user.service";

const authRouter = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *     tags:
 *       - Auth
 */

authRouter.post("/register", async (req: Request, res: Response) => {
  const user = req.body;
  const result = await userService.createUser(user);
  res.status(201).send(result);
});

/**
 * @swagger
 *   "/auth/login":
 *   post:
 *     summary: Log in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Usuário logado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       "401":
 *         description: "Error: Unauthorized"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *     tags:
 *       - Auth
 */
authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    res.send(result);
  } catch (error: any) {
    res.status(401).send({ message: error.message });
  }
});

export default authRouter;
