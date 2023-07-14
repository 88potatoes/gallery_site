const IMAGES_FETCHED = 3; // can't change this freely because you need to make more div + img html elements

const search_url = "https://api.artic.edu/api/v1/artworks/search?q=";
const search_url_limit = "&limit=" + IMAGES_FETCHED + "&fields=image_id,artist_title";
const img_url_end = "/full/600,/0/default.jpg";

const imgElements = document.getElementById("image").children;
const artistName = document.getElementById("artist_name");

const artists = ["monet", "leonardo da vinci", "vermeer", "delacroix", "rembrandt", "jean-antoine watteau", "seurat", "van gogh", "edvard munch"];

let index = Math.floor(Math.random()*artists.length);

async function fetchImage() {
    const url = search_url + artists[index] + search_url_limit;
    
    const search_results = await (await fetch(url)).json();
        
    // console.log(search_results);
    artistName.innerText = search_results.data[0].artist_title;

    for (let i = 0; i < IMAGES_FETCHED; i++) {
        const url = search_results.config.iiif_url + "/" + search_results.data[i].image_id + img_url_end;
        imgElements[i].children[0].setAttribute("src", url);
    }
}

fetchImage();