import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { CREDENTIALS, ORIGIN } from './config';
import { ErrorMiddleware } from './middlewares/error.middleware';
import AuthRoute from './routes/auth.route';
import UserRoute from './routes/users.route';
import AdminRoute from './routes/admin.route';
import SectorItemRoute from './routes/sectorItem';
import SectorItemServiceRoute from './routes/sectorItemService';
import SectorItemServiceDetailsRoute from './routes/sectorItemServiceDetails';
import SectionRoute from './routes/section';
import UploadRoute from './routes/upload.route';
import EmailRoute from './routes/email.route';

const app: express.Application = express();

function initializeMiddlewares() {
  app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  
  // Serve static files for uploaded images with CORS headers
  app.use('/uploads', (req, res, next) => {
    // Set CORS headers for static files
    const allowedOrigins = ORIGIN === '*' ? '*' : ORIGIN?.split(',') || ['*'];
    const origin = req.headers.origin;
    
    if (ORIGIN === '*' || (origin && allowedOrigins.includes(origin))) {
      res.header('Access-Control-Allow-Origin', origin || '*');
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    
    next();
  }, express.static(path.join(process.cwd(), 'uploads'), {
    setHeaders: (res, path) => {
      // Additional headers for image files
      if (path.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      }
    }
  }));
}

function initializeSwagger() {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'REST API',
        version: '1.0.0',
        description: 'Example docs',
      },
    },
    apis: ['swagger.yaml'],
  };

  const specs = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

function initializeErrorHandling() {
  app.use(ErrorMiddleware);
}

function initializeRoutes(){
  app.get('/', (req, res) => {
    return res.json('Turkmen Gala API is running!');
  })
  app.use('/api/auth', AuthRoute);
  app.use('/api/admin', AdminRoute);
  app.use('/api/users', UserRoute);
  app.use('/api/sector-items', SectorItemRoute);
  app.use('/api/sector-item-services', SectorItemServiceRoute);
  app.use('/api/sector-item-service-details', SectorItemServiceDetailsRoute);
  app.use('/api/sections', SectionRoute);
  app.use('/api/upload', UploadRoute);
  app.use('/api/email', EmailRoute);
}

export const initializeServer = () => {
  initializeMiddlewares();
  initializeRoutes();
  initializeSwagger();
  initializeErrorHandling();
}

export default app
