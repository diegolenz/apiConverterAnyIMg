import { TimesBook, TimesBookPage, TimesBookPageData, TimesBookPageResponse } from '../times-book';

var https = require('https');
const hostTimesApi = 'api.timesdigitalbooks.com'
const authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYjQ2MTIxMzhmZWM0ZGM1YmRlM2RjYTI4ODc2M2ZmYWE3MTYzMTFkNjllYWFlOWRlMzM1MmZiOTNlMGI0NWE5NzI1NzQ0NzAzYTgzMGI5ZjciLCJpYXQiOjE2OTY2MDk1MzYuNTQyODAxLCJuYmYiOjE2OTY2MDk1MzYuNTQyODA2LCJleHAiOjE2OTY2MjAzMzYuNTE4Mjc5LCJzdWIiOiI4NjUiLCJzY29wZXMiOlsiKiJdfQ.EWbEj9WYzHGU6SUjfznUj4PKF29Qk-_RWU0zRaWwBNNIPrGCDqwudCO51OsKDQR2Kx0H-pK89ctYPQgZio_5hJN0oYgR95IXWv4aZVOBLr1kl6r2m00bYgyTLMNK0EHJshT4e24tLx8t5U56Ehjd0ij1W72-rLkKPu0xvg7faX2-y3IWLw0puWg_guP7NWthDOt3WSbKlJ-rB08E_KpE21QxYEX1GFI_5JfdHHboRzComHuz3-Q6qB4H47w42dg6fxtC0_p1jtqzZmeR6DvxSa8Fbt3FOo45W0njGQtA9cvetKckkUPtwWWE0m4NM3q-Rv6XdfCSEkuJ1wke2aZQrBZEs-6wU4bH9ICiWaVqZ1k-wcz2hiFrMJVWx_50IJ1xz9DODz6jcOloOk40ssmTbU97Fh4v1ovoR49UpU7SOvXGjAbpnAcPeZ0QUKDUW_efiQgiIIhm9zKIIs41AerUujmvoc3Nw-Q84NhiTapWeo0WR0UOXPKZN5d1nOjgERUcVuqiIl_GtDgzwyyBuzqP195hL6RN2DBNK5tzrQZuAwx0aTOa46ztdkU6L_WZ5ryih3DpN-xKSde9QBZc89rG2_ZV2Ezsa-jgLA17w0lbrGbRXpft5E47IgNfoPF_037NLzATn9VZaH9APldITYmSY3aKGfN1lIReaQ3Q89WtytY'

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

export function BoookTimesApi(bookId: number) {

  var options = {
    host: hostTimesApi,
    path: '/api/books/getThumbnails/' + bookId,
    method: 'GET',
    headers: {
      Authorization: authorization }
  };

  return new Promise<TimesBook[]>(resolve => {
    https.get(options, (res: any) => {

      res.setEncoding('utf8');
      var str = '';
      res.on('data', (returnBook: any) => {
        str += returnBook;
      });

      res.on('end', function () {
        const book: TimesBook[] = JSON.parse(str);
        resolve(book);
      });
    })
  });
}


export function getPageByBookApi(bookId: number, page: number) {

  var options = {
    host: hostTimesApi,
    path: '/api/books/getDigitalBook/' + bookId + '?page='+ page,
    method: 'GET',
    headers: {
      Authorization: authorization }
  };

  return new Promise<TimesBookPageData>((resolve, reject) => {
    https.get(options, (res: any) => {
      if (res.statusCode < 200 || res.statusCode > 299) { 
        console.log('err: ' + res)
        reject(null);
      }

      res.setEncoding('utf8');
      var str = '';
      res.on('data', (returnBook: any) => {
        str += returnBook;
      });

      res.on('end', function () {
        const res: TimesBookPageResponse = JSON.parse(str);
        //const pages: TimesBookPage[] = res.pages.data;
        resolve(res.pages);
      });
    }).on('error', (e: any) => {
      console.error('erro ao buscar livro', e);
    }); 
  });
}

//https://api.timesdigitalbooks.com/api/books/getDigitalBook/1?page=21


export function PageTimesApi(path: string) {

  var options = {
    host: hostTimesApi,
    path: path,
    method: 'GET',
    headers: {
      Authorization: authorization }
  };

  return new Promise<TimesBook[]>(resolve => {
    https.get(options, (res: any) => {
      var data: any[] = [];

      res.setEncoding('utf8');
      res.on('data', (returnPage: any) => {
        data.push(returnPage);
      });

      res.on('end', function () {
        var buffer = Buffer.concat(data);
        console.log(buffer.toString('base64'));
        resolve(data);
      });
    }).on('error', (e: any) => {
      console.error('erro chamada para obter livro', e);
      throw new Error('erro chamada para obter livro');
    }); 
  });
}
