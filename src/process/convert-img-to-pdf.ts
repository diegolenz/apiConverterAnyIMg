import { TimesBook, TimesBookPage, TimesBookPageData } from './../times-book';
import { BoookTimesApi, getPageByBookApi } from '../request/times-api';
import { getBookImg } from '../request/lib-api';
import Canvas, { loadImage } from 'canvas';
var fs = require('fs');
var stream = require('stream');
const canvasWithContext = createPDF();

export async function processImgToPdf() {

    const bookId = 6;
    let nextPageIdRequest = 1;
    let pageData: TimesBookPageData = await getPageByBookApi(bookId, nextPageIdRequest);
    console.log(pageData)
    let currentPage = pageData.current_page;
    const totalPage = pageData.total;
    while (currentPage <= totalPage) {
        for (const page of pageData.data) {
            try {
                console.log("add page" + currentPage);
                await addImgToPdf(canvasWithContext.ctx, page.content);
                currentPage++;
            } catch (e) {
                console.log('Erro ao adicionar pagina ' + currentPage, e)
                throw new Error('erro ao adicinar image no livro')
            }
        }
        nextPageIdRequest++;
        console.log("req page" + nextPageIdRequest);
        pageData = await getPageByBookApi(bookId, nextPageIdRequest);
    }
    donloadPDF(bookId, canvasWithContext.canvas);
}


function createPDF() {
    const canvas = Canvas.createCanvas(1250, 1700, 'pdf');
    const ctx = canvas.getContext('2d');
    return { canvas, ctx };
}

function addImgToPdf(ctx: any, url: any) {
    return new Promise((resolve, reject) => {
        const imgm = loadImage(url);
        imgm.then((image) => {
            ctx.drawImage(image, 0, 0);
            ctx.addPage();
            resolve(true);
        }).catch(err => {

            console.log('erro ao adicionar imagem no livro')
            throw new Error('erro ao adicinar image no livro')
        });
    })
}

function donloadPDF(bookId: number, canvas: any) {
    fs.writeFileSync('D:\\book'+bookId +'.pdf', canvas.toBuffer())
}
