let search = document.querySelector('#search');
let btnSearch = document.querySelector('#buttonSearch');
let result = document.querySelector('.result');
let container = document.querySelector('.container');
let details = document.querySelector('.details');
let showSaved = document.querySelector('.showSaved');
let saved = document.querySelector('.saved');
let savedBoxs = document.querySelector('.saved .boxs');
let home = document.querySelector('.home');
let message = document.querySelector('.message');


let arr;
let arrId;
// let idMeals;
if(localStorage.getItem('item')){
    arr = (JSON.parse(localStorage.getItem('item')));
}
else{
    arr = [];
}

if(localStorage.getItem('itemid')){
    arrId = (JSON.parse(localStorage.getItem('itemid')));
}
else{
    arrId = [];
}


btnSearch.addEventListener('click',searchMeal);
result.addEventListener('click',mealDetails);
saved.addEventListener('click',mealDetails);

function searchMeal(){
    result.innerHTML = "";
   
    let val = search.value.trim();
    if(val){
        let api1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${val}`;
        fetch(api1)
        .then(response=>{
           return response.json();
        }).then(data=>{
            console.log(data);
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
                <i class="fa-regular fa-bookmark save " data-id=${val.idMeal}></i>
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


let checkvar = true, index = null;
function saveItem(e){
    if(e.target.classList.contains('save')){
        // console.log(ele.dataset.id,'kknjkjnkn');
       
        // idMeals.push(ele.dataset.id);
        console.log(arr)
        console.log(e.target.dataset.id);
        checkID(e.target.dataset.id);
        if(checkvar != false){
            arr.push(ele.innerHTML);
            arrId.push(e.target.dataset.id);
            console.log(arrId);
            message.innerHTML = "Recipe Saved";
            message.style.opacity = 1;
            setTimeout((e) => {
            message.style.opacity = 0;
                
            }, 1500);
        }else{
            arrId.splice(index,1);
            arr.splice(index,1);
            console.log(index);
            index = null;
            console.log(arrId);


            message.innerHTML = "Recipe Un Saved";
            message.style.opacity = 1;
            setTimeout((e) => {
            message.style.opacity = 0;
                
            }, 1500);

        }
        
        // console.log(arr)
        localStorage.setItem('item',JSON.stringify(arr));
        localStorage.setItem('itemid',JSON.stringify(arrId));
        // console.log(localStorage.getItem('item'))
    }
    
}
// localStorage.clear();
// check Id
function checkID(ele){
    arrId.forEach((element,i) => {
        if(element == ele){
            checkvar = false;
            index = i;
            return;
        }else{
            checkvar = true;
        }
    });
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

    
    container.style.display = 'none'
    home.style.display = 'block'
    savedBoxs.innerHTML = y;

}
home.addEventListener('click',()=>{
    container.style.display = 'block'
    home.style.display = 'none'
    saved.style.display = 'none'

})

