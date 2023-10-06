import express from 'express';
import bodyParser from 'body-parser';
import { processImgToPdf } from './process/convert-img-to-pdf';

export class Application {

  constructor(public app = express()) { }

  public init(): void {
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public start(): void {
    console.log('start app')
    processImgToPdf();
  }
}