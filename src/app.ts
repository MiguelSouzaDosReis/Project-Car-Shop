import express, { Router } from 'express';
import connectToDatabase from './connection';
import tryCatchError from './middleware/tryCath';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  startServer(PORT: string | number = 3001): void {
    try { 
      connectToDatabase();
      this.app.listen(
        PORT,
        () => console.log(`Server running here 👉 http://localhost:${PORT}`),
      );
    } catch (error) {
      console.log(error);
      this.handleError();
    }
  }

  addRouter(router: Router) {
    this.app.use(router);
  }

  private handleError() {
    this.app.use(tryCatchError);
  }

  getApp() {
    return this.app;
  }
}

export default App;
