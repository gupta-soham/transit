import { Express } from "express";
import basicAuth from "express-basic-auth";
import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transit API",
      version: "1.0.0",
      description: "This is the API documentation for the backend service.",
    },
    servers: [
      { url: "http://localhost:8000", description: "Local server" },
      { url: "https://transit-be.vercel.app", description: "Production server" },
    ],
  },
  apis: [path.resolve(__dirname, './routes/**/*.ts')],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  // Protect Swagger with Basic Auth in production
  if (process.env.NODE_ENV === "production") {
    app.use(
      "/api/docs",
      basicAuth({
        users: { admin: "securepassword123" },
        challenge: true,
      }),
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        customCss:
          '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
        customCssUrl: CSS_URL,
      })
    );
  } else {
    // Allow open access in development
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }
  console.log(`📄 Swagger UI available at: ${process.env.BETTER_AUTH_URL}/api/docs`);
}
