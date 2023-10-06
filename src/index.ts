import { Application } from './app';

class Index {
    static start(): void {
        const application = new Application();
        application.init();
        application.start();
    }
}

Index.start();
