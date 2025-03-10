const search=document.getElementById('food');
const find=document.getElementById('search');
const random=document.getElementById('random');
const resultHeading=document.getElementById('result-heading');
const meals=document.getElementById('meals');
const singleMeal=document.getElementById('single-meals')

//search 
function SearchMeal(){

    singleMeal.innerHTML='';
    const term=search.value;
    if(term.trim())
    {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            
            resultHeading.innerHTML=`<h2> Search results for ${term}</h2>`;

            if(data.meals===null)
            {
                resultHeading.innerHTML=`<p>There are no such results</p>`;
                meals.innerHTML="";
            }
                else{
                    meals.innerHTML=data.meals.map(meal=>`
                        <div class="meal">
                        <img src="${meal.strMealThumb}" alt=""/>
                        <div class="meal-info" data-mealid="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                            </div>
                        </div>

                    `).join('');

                }



        });

        search.value='';
    }
    else{
        alert("plese enter  something");
    }



}

// to fetch meal by id
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res=>res.json())
    .then(data=>{
        const meal=data.meals[0];
        addtoDom(meal);
    });
}
//add meal to dom
function addtoDom(meal){
    const ingredients=[];
    for(let i=1;i<=20;i++)
    {
        if(meal[`strIngredient${i}`])
        {
            ingredients.push(`${meal[`strIngredient${i}`]}- ${meal[`strMeasure${i}`]}`);
        }
        else{
            break;
        }
    }
    singleMeal.innerHTML= `
    <div class="box">
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>

        <div class="main">
        <p> ${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map(ing=>`<li>${ing}</li>`).join('')}
        </ul>
    </div>
    `;
}
//display random meals
    function displayRandom(){
        resultHeading.innerHTML='';
        meals.innerHTML='';
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res=>res.json())
        .then(data=>{
            const meal=data.meals[0];
            addtoDom(meal);
        });
    }





//EventListeners
random.addEventListener('click',displayRandom);

find.addEventListener('click',SearchMeal);

meals.addEventListener('click',e=>{
    const mealInfo=e.composedPath().find(item=>{
        if(item.classList){
          
            return item.classList.contains('meal-info');
        }
        else{
            return false;
        }
    }) ;   

    console.log(mealInfo);
    if(mealInfo){
        const mealID=mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
});

search.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        SearchMeal();
    }
});
