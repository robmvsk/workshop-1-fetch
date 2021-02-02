/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking :)')

const API = "https://platzi-avo.vercel.app/api/avo";
const baseUrl = "https://platzi-avo.vercel.app";

//web API llamada fetch

//Pasos:
window
// 1.- Conectarnos al servidor
    .fetch(API)
// 2.- Proesar la respuesta, y convertirla en JSON
    .then(respuesta => respuesta.json())
// 3.- JSON --> Data --> Renderizar la infor del data al browser
    .then((reponseJson) => {
        console.log(reponseJson);
        const todosLosItems = []
        reponseJson.data.forEach(item => {
            console.log(item.name);
            //crear la imagen
            const image = document.createElement('img')
            //tomando en cuenta que la ruta de la imagen es relativa y no abosulta, se procede a:
            image.src = `${baseUrl}${item.image}`;  //URL de la imagen
            //crear el titulo
            const title = document.createElement('h2')
            title.textContent = item.name;
            //crear el precio
            const price = document.createElement('div')
            price.textContent = item.price;
            //contenedor de los 3 item
            const container = document.createElement('div')
            container.append(image, title, price)
            todosLosItems.push(container)
        });
        document.body.append(...todosLosItems)
    });

//vamos a crear nodos a partir de la informacion de responseJson y a renderizarlos dentro de nuestro html


//en lugar de promesas podiamos usar async/await
