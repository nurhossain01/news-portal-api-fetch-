const fetchCategories = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
}
const displayCategories = (categories) => {
  const container = document.getElementById('categories-container');
  categories.forEach(category => {
    const ul = document.createElement('ul');
    ul.classList.add('categories-news');
    ul.style.listStyle = 'none'
    ul.innerHTML += `
  <a href="#" onclick="handleNewsSearch('${category.category_id}', '${category?.category_name}')">${category?.category_name}</a>
  `;
    container.appendChild(ul);
  })
}
const handleNewsSearch = (id, category_name, ) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(data => displaySpaceficNew(data.data, category_name));
}
const displaySpaceficNew = (singleNews, category_name) => {
 const newsLength = document.getElementById('news-count');
 newsLength.innerText=singleNews.length;
 const categoryName = document.getElementById('category-name');
 categoryName.innerText = category_name;


  const newsContainer = document.getElementById('display-news');
  const alert = document.getElementById('no-news');
  if(singleNews.length === 0){
    alert.classList.remove('d-none')
   }
   else{
    alert.classList.add('d-none')
   }
  newsContainer.textContent= '';
  singleNews.forEach(news => {
    console.log(news)
     
    const div = document.createElement('div');
    div.innerHTML=`
    <div class="card mb-3" style="width: 100%;;">
       <div class="row g-0">
        <div class="col-md-4">
          <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text">${news.details.slice(0, 400)}</p>
            <div class="d-flex justify-items-center" style="margin-top: 50px">
            <img style="width: 50px; border-radius: 25px" src="${news.author.img}" alt="" />
            <div class="ps-2">
            <h5>${news.author.name}</h5>
            <h6>${news.author.published_date}</h6>
            </div>
            
            
          </div>
        </div>
      </div>
    </div> 
    `;
    newsContainer.appendChild(div)
  })
}
handleNewsSearch('01')