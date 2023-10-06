import { TimesBook } from '../times-book';

var https = require('https');
const hostAmazonApi = 'timesdigitalbooks-repository.s3.amazonaws.com'

/* export const BoookTimesApi = () => {
  var options = {
    host: hostTimesApi,
    path: '/api/books/getThumbnails',
    method: 'GET'
  };

  const getBook = (book: number) => {
    https.get(options, function (res: any) {
      res.setEncoding('utf8');
      res.on('data', function (chunk: any) {
        console.log('BODY: ' + chunk);
      });
    })
  };
} */

var stream = require('stream');
const fs = require('fs');


export function getBookImg(url: string) {
  const file = fs.createWriteStream('D:\imgAmzz.pdf');
  console.log(url)
  return new Promise<any>(resolve => {
    https.get('https://timesdigitalbooks-repository.s3.amazonaws.com/book/1/dynamic_book_1_pag%281%29.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWAAFXSIPVVBM5O5V%2F20231004%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231004T124722Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=53013780f33f5839753b0b0c6acc284c12a0174524e0c4849357269d5ddbd1d7', (res: any) => {
      console.log('status: ' + res.statusCode)
      if (res.statusCode < 200 || res.statusCode > 299) { 
        resolve(null);
      }
      var data: any[] = [];

     // res.setEncoding('utf8');
      res.pipe(file);
      res.on('data', (returnPage: any) => {
        data.push(returnPage);
      });
    
      res.on('end', function () {
        //var buffer = Buffer.concat(data[0]);
        file.close();
        resolve(Buffer.from(data[0], 'binary'));
      });
    })
  })
  /* return new Promise<any>(resolve => {
    https.get(options, (res: any) => {
      console.log('status: ' + res.statusCode)
      if (res.statusCode < 200 || res.statusCode > 299) { 
        resolve(null);
      }
      var data: any[] = [];

     // res.setEncoding('utf8');
      res.pipe(file);
      res.on('data', (returnPage: any) => {
        data.push(returnPage);
      });
    
      res.on('end', function () {
        //var buffer = Buffer.concat(data[0]);
        file.close();
        resolve(Buffer.from(data[0], 'binary'));
      });
    })
  }) */
}
