/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking :)')

/*
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

*/

//vamos agregar todos los elementos en un contenedor, el cual lo 
//pondremos en index.html
//y desde aqui lo llenaremos

const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector('#app');

//web API llamada Intl (Internacionalizacion), que sirve para dar:
// 1.- formato de fechas  window.Intl.DateTimeFormat
// 2.- formato a monedas  window.Intl.NumberFormat 
//     El primer parametro: es el locate: es el pais en donde se encuentra el usuario
//     El segundo parametro: opciones del formato {}

const formatPrice = (price) => {
    
    const newPrice = new window.Intl.NumberFormat("en-EN", {
        style: "currency",  //estilo tipo moneda
        currency: "GBP",    //y la moneda que va a utilizar es USD: Dolar / GBP: Libras esterlinas
    }).format(price)        //formatea con la inicializacion de la web API, llamada Intl (Internacionalizacion)

    return newPrice;
};

//web API llamada fetch

//en lugar de ponerlo en el body, lo vamos a poner dentro de un contenedor:
//Pasos:
//window
const obtenDatosAPI = async function getDataAguacates(baseUrl) {

// 1.- Conectarnos al servidor
    //.fetch(`${baseUrl}/api/avo`)
    const response = await fetch(`${baseUrl}/api/avo`)
// 2.- Proesar la respuesta, y convertirla en JSON
    //.then(respuesta => respuesta.json())
    const reponseJson = await response.json()
// 3.- JSON --> Data --> Renderizar la infor del data al browser
    //.then((reponseJson) => {
        //console.log(reponseJson);
        const todosLosItems = [];
        reponseJson.data.forEach(item => {
            //console.log(item.name);
            //crear la imagen
            const image = document.createElement('img')
            //tomando en cuenta que la ruta de la imagen es relativa y no abosulta, se procede a:
            image.src = `${baseUrl}${item.image}`;  //URL de la imagen
            image.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6';

            //crear el titulo
            const title = document.createElement('h2')
            title.textContent = item.name;
            //1.- usando estilos mediante el uso de las propiedades de estilo:
            //title.style = 'font-size: 2rem';  //16px = 1rem
            //title.style.fontSize = '3rem';
            //2.- la 2da forma de utilizar estilos es mediante el uso de clases:
            //title.className = 'muy-grande';
            //usandos las clases de tailwindcss:
            title.className = 'text-xl text-red-600';

            //crear el precio
            const price = document.createElement('div')
            price.textContent = formatPrice(item.price);  //decia: item.price
            price.className = 'text-lg text-blue-500';

            //contenedor de los 2 items: name y price
            const titleAndPrice = document.createElement('div')
            titleAndPrice.className = 'text-center md:text-left';

            titleAndPrice.append(title, price)

            //contenedor de la imagen y de titleAndPrice
            const cardUp = document.createElement('div')
            cardUp.className = 'md:flex rounded-lg';

            cardUp.append(image, titleAndPrice)  //se cambia el contenedor titleAndPrice en lugar de: title, price
            
            
            //conociendo mas..
            const subTitle = document.createElement('h3')
            subTitle.textContent = 'Conociendo más:'
            subTitle.className = 'text-base md:text-left text-yellow-500 font-bold';

            //description
            const description = document.createElement('div')
            description.textContent = item.attributes.description
            description.className = 'text-xs md:text-right text-blue-500';

            //contenedor de subtitle y description
            const cardDown = document.createElement('div')
            cardDown.className = "rounded-lg md:divide-y-8 divide-purple-200 md:divide-x-0";
            cardDown.append(subTitle, description)

            //contenedor Global: de cardUp y cardDown
            const card = document.createElement('div')
            card.className = "group hover:shadow-lg hover:border-transparent md:flex-wrap bg-yellow-50 rounded-lg p-6 hover:bg-yellow-100 border-solid border-2 border-green-200";

            card.append(cardUp, cardDown)  //se cambia el contenedor titleAndPrice en lugar de: title, price
            todosLosItems.push(card)
        });

        appNode.append(...todosLosItems)
    }
    //)
    ;

    obtenDatosAPI(baseUrl);