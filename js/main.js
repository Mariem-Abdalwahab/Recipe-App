let search = document.querySelector('#search');
let btnSearch = document.querySelector('#buttonSearch');
let result = document.querySelector('.result');
let container = document.querySelector('.container');
let details = document.querySelector('.details');
let showSaved = document.querySelector('.showSaved');
let saved = document.querySelector('.saved');
let savedBoxs = document.querySelector('.saved .boxs');
let home = document.querySelector('.home');


let arr;
// let idMeals;
if(localStorage.getItem('item')){
    arr = (JSON.parse(localStorage.getItem('item')));
}
else{
    arr = [];
}
console.log(arr);

btnSearch.addEventListener('click',searchMeal);
result.addEventListener('click',mealDetails);
saved.addEventListener('click',mealDetails);

function searchMeal(){
    result.innerHTML = "";
    console.log('l')
    let val = search.value.trim();
    if(val){
        let api1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${val}`;
        fetch(api1)
        .then(response=>{
           return response.json();
        }).then(data=>{
            if(data.meals){
                let boxs = data.meals.map((meal)=>{
                    return `
                    <div class="col-4 mb-3">
                        <div class="card rounded overflow-hidden" >
                            <img src=${meal.strMealThumb} alt="food" class="img-fluid ">
                            <div class="card-body">
                                <h5 class="card-title text-capitalize">${meal.strMeal}</h5>
                                <a href="#" class="btn mealButton" id=${meal.idMeal} >Get Ricipe</a>
                            </div>
                        </div>
                    </div>
                    `
                }).join('');
                result.innerHTML = boxs;
                // console.log(data.meals)
            }
            else{
                let h = `<h4>Sorry, Not Found</h4>`
                result.innerHTML = h;
            }

        })
      
    
    }
    
}

let ele;
function mealDetails(e){
    e.preventDefault();
    if(e.target.classList.contains('mealButton')){
        console.log('f')
        let id = e.target.id;
        ele = e.target.parentElement.parentElement;

        // console.log(ele)
        let api2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(api2)
        .then(res=>{
           return res.json();
        })
        .then(data=>{
            console.log(data.meals[0])
            let val = data.meals[0];
            let recipe = `
            <div class="main">
              <div class="button d-flex justify-content-between">
                <i class="fa-regular fa-bookmark save"></i>
                <i class = "fas fa-times close"></i>
              </div>
              <h4 class="name">${val.strMeal}</h4>
              <span class="category">${val.strCategory}</span>
              <div class="deta">
                <span>instruction:</span>
                <p>${val.strInstructions}</p>
                <img src=${val.strMealThumb} alt="food">
                <a href=${val.strYoutube} target='_blank'>watch Video</a>
              </div>
            </div>
            `;
            details.style.display = 'block';
            details.innerHTML = recipe;
            console.log(details)
        })
        
    }
}

details.addEventListener('click',closeRecipe);
details.addEventListener('click',saveItem);



function closeRecipe(e){
    if(e.target.classList.contains('close')){
        details.style.display = 'none';
    }
}

       
function saveItem(e){
    if(e.target.classList.contains('save')){
        // console.log(ele.dataset.id,'kknjkjnkn');
       
        // idMeals.push(ele.dataset.id);
        console.log(arr)
        arr.push(ele.innerHTML);
        // console.log(arr)
        localStorage.setItem('item',JSON.stringify(arr));
        // console.log(localStorage.getItem('item'))
    }
    
}

showSaved.addEventListener('click',show);

function show(e){
    e.preventDefault();
    let y = arr.map(ele=>{
        return `
        <div class="col-4  mb-3">
                    <div class="card rounded overflow-hidden"  >
                        ${ele}
                    </div>
                </div>`;
    }).join('');
    saved.style.display = 'block'
    console.log(y);
    console.log(savedBoxs);
    
    container.style.display = 'none'
    home.style.display = 'block'
    savedBoxs.innerHTML = y;

}
home.addEventListener('click',()=>{
    container.style.display = 'block'
    home.style.display = 'none'
    saved.style.display = 'none'

})

// localStorage.clear();

// if(localStorage.getItem('item')){

// }
// else{
//     savedItem.style.display = 'none';
// }