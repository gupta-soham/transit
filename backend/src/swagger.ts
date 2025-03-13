import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transit API",
      version: "1.0.0",
      description: "This is the API documentation for the backend service.",
    },
    servers: [
      {
        url: "http://localhost:8000", // Adjust if necessary
      },
    ],
  },
  apis: ["./**/*.ts"], // Ensures all .ts files, including routes, are scanned
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
