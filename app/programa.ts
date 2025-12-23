import express, { Express, Request, Response } from 'express';

const app: Express = express();
const puerto: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send("El servidor esta funcionando");
});

app.get("/peliculas", (req: Request, res: Response) => {
  res.status(200).send();
});

app.post("/peliculas", (req: Request, res: Response) => {
  res.status(200).send();
});

const server = app
  .listen(puerto, (): void => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
  })
  .on("error", (error): void => {
    console.log("Error: ", error.message);
  });

export { app, server };
