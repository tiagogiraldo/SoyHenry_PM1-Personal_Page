class Activity{
    constructor({id, title, description, imgUrl}){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}



class Repository{
    constructor(){
        this.activities = [];  
        this.id = 0;
    }

    getAllActivities (){
        return this.activities;
    }

    createActivity(act){
        this.id ++
        const activity  = new Activity({...act, id: this.id})
        this.activities.push(activity)
    }

    deleteActivity(id){
        this.activities = this.activities.filter((activity)=>activity.id !==id)
    }
}


const repo =  new Repository();

function buildActivity(activity){
    const {id, title, description, imgUrl} = activity;
    
    const card = document.createElement("div");
    card.className = "card";
    card.id = id;

    const h3 = document.createElement("h3");
    h3.innerText = title;
    
    const p = document.createElement("p");
    p.innerText = description;
    
    const img = document.createElement("img");
    img.src = imgUrl;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Borrar";
    deleteButton.addEventListener("click", () => {
        repo.deleteActivity(id);
        buildActivities();
    });    
    
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(img);
    card.appendChild(deleteButton);


    return card;
}

function buildActivities(){
    const container = document.getElementById("container");
    container.innerHTML="" ;
    
    const activities = repo.getAllActivities()
    const activitiesHTML = activities.map( (act) => buildActivity(act));
    
    activitiesHTML.forEach(actHTML => container.appendChild(actHTML));
}

const buttonSubmit = document.querySelector("#add");

function handleClick (){

    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const imgUrl = document.getElementById("imgUrl");
    

    const valueTitle = title.value;
    const valueDescription = description.value;
    const valueImgUrl = imgUrl.value;

    if(!valueTitle || !valueDescription || !valueImgUrl){
        alert("Debes llenar todos los campos");
        return ;// corta la ejecución. ????
    }

    const activity = {
        title: valueTitle,
        description: valueDescription,
        imgUrl: valueImgUrl
    }

    repo.createActivity(activity);
    
    buildActivities();

    title.value = "";
    description.value = "";
    imgUrl.value = "";
}


const addform = document.getElementById("addForm");

addform.addEventListener("submit", function (event){
    event.preventDefault();
    handleClick();
})

/* const onClick = (event) => {
    console.log(event.srcElement.id);
  }
window.addEventListener('click', onClick); */
/* 

const onClick = (event) => {
    if (event.target.textContent === 'Borrar') {
      const idAct = document.getElementById("id")
        console.log(idAct);
    }
  }
  window.addEventListener('click', onClick); */