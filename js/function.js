function createCard(pet, tag) {
  const card = document.createElement("div");
  card.className = "card";
  const cardImg = document.createElement("div");
  cardImg.className = "pic";
  if (pet.image) {
    cardImg.style.backgroundImage = `url(${pet.image})`;
  } else {
    cardImg.classList.add("tmp");
  }
  const cardTitle = document.createElement("h2");
  cardTitle.innerText = pet.name;

  const cardLike = document.createElement("i");
  cardLike.className = "like fa-heart";
  cardLike.classList.add(pet.favorite ? "fa-solid" : "fa-regular");
  cardLike.addEventListener("click", e => {
    // поставить лайк (сердечко, id котика, явяляется ли любимчиком true/false)
    setLike(cardLike, pet.id, !pet.favorite); // (true => false; false => true)
  });

  //Просмотр котика
 const cardShow = document.createElement("ш");
  cardShow.className = "fa-solid fa-eye btn-eye";
  cardShow.addEventListener("click", e => {
    e.stopPropagation();
    showCard(pet.id);
  });

  const cardTrash = document.createElement("i");
  cardTrash.className = "fa-solid fa-trash card__trash";

  cardTrash.addEventListener("click", (e) => {
    e.stopPropagation();
    cardDelete(pet.id);
  });

  card.append(cardImg, cardTitle, cardTrash, cardLike, cardShow);
  tag.append(card);

}

function setLike(el, id, like) {
  el.classList.toggle("fa-solid");
  el.classList.toggle("fa-regular");

  fetch(path + "/update/" + id, {
    method: "put",
    // без headers на сервер прийдет undefined
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ favorite: like })
  })
    .then(res => res.blob())
    .then(data => {
      console.log(data);
      pets = pets.map(p => {
        if (p.id === id) {
          p.favorite = like;
        }
        return p;
      })
      localStorage.setItem("band-cats", JSON.stringify(pets));
    })
}

//Удаление котика. 
function cardDelete(id, el) {
  if (id) {
    fetch(`${path}/delete/${id}`, {
      method: "delete",
    }).then((res) => {
      if (res.status === 200) {
        el.remove();
      }
    });
  }
}
  //Просмотр котика.
 
 function showCard (id){
  fetch(path + `/show/${id}`)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
          mdBox2.classList.add("active");
          catModal.innerHTML= 
          `<h2> ${data.name}</h2>` +
          `<p>ID: ${data.id}</p>` +
          `<p>Возраст: ${data.age}</p>` +
          `<p>Рейтинг: ${data.rate}</p>` +
          `<p>Описание: ${data.description}</p>` +
          `<img class="modal__cat" src=${data.image} height="200px">`;
          console.log(data);
          if(data.rate == undefined){
            catModal.innerHTML=
            `<h2> ${data.name}</h2>` +
            `<p>ID: ${data.id}</p>` +
            `<p>Возраст: ${data.age}</p>` +          
            `<p>Рейтинг: Не указан.</p>` +
            `<p>Описание: ${data.description}</p>` +
            `<img class="modal__cat" src=${data.image} height="200px">`;
          }          
        })
    }


