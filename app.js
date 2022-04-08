// https://www.tvmaze.com/api

const form = document.querySelector('#searchForm');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const input = form.elements.query.value;
    const config = { params: { q: input } }
    const res = await axios.get(` https://api.tvmaze.com/search/shows?`, config);
    console.log(res.data)
    makeImages(res.data);
    form.elements.query.value = "";
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        deleteResults();
    });
    
});

const deleteResults = () => {
    const rowContainer = document.querySelector('#rowContainer');
    while(rowContainer.firstChild) {
        rowContainer.removeChild(rowContainer.firstChild)
    }
}

const makeImages = (shows) => {

    const imagesContainer = document.querySelector('#imagesContainer');
    const rowContainer = document.querySelector('#rowContainer');

    for(let result of shows){
        if(result.show.image) {
            const col = document.createElement('div')
            const img = document.createElement('img');

            col.classList.add("col", "imageResult");
            img.src = result.show.image.medium;

            col.append(img);
            rowContainer.append(col);
            imagesContainer.append(rowContainer);
        }
    }
}