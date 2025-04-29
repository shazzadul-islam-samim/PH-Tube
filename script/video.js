console.log('hello');

const loadCategories = () => {
    //console.log('load categories');

    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
       .then(res => res.json())
       .then(data => displayCategories(data.categories))
       .catch(error=> console.log(error));
}

const displayCategories = (categories) =>{
    // add data in HTML
    //console.log(data);
    const categoryContainer=document.getElementById("categories");

    categories.forEach((item) => {
        console.log(item);

        //create button
        const button= document.createElement("button");
        button.classList="btn";
        button.innerText=item.category;

        categoryContainer.append(button);
    });
}
loadCategories();