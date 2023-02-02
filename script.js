const activities = document.querySelector(".activities");
const key = document.querySelector(".key");
const type = document.querySelector(".type");
const part = document.querySelector(".part");
const price = document.querySelector(".price");
const link = document.querySelector(".link");
const activity = document.querySelector(".activity");
const add = document.querySelector(".add");
const get = document.querySelector(".get");
const input_type = document.querySelector(".input_type");
const input_part = document.querySelector(".input_part");
const input_price = document.querySelector(".input_price");
const filter = document.querySelector(".filter");

get.addEventListener("click", getData);
add.addEventListener("click", addData);
filter.addEventListener("click", filterData);

let arr = [];

async function getData() {
  const result = await fetch("https://www.boredapi.com/api/activity");
  const data = await result.json();
  activity.innerHTML = data.activity;
  type.innerHTML = data.type;
  part.innerHTML = data.participants;
  price.innerHTML = data.price;
  link.innerHTML = data.link === "" ? "none" : data.link;
  key.innerHTML = data.key;
}

function addData() {
  const currentData = {
    key: key.innerHTML,
    activity: activity.innerHTML,
    type: type.innerHTML,
    participants: part.innerHTML,
    price: price.innerHTML,
    link: link.innerHTML,
  };

  arr.push(currentData);
  clearData();
  showData(arr);
}

function showData(arr) {
  activities.innerHTML = "";
  arr.map((item) => {
    activities.innerHTML += `
    <div class="box">
      <div class="box_data">
        <div class="a_activity">Activity: ${item.activity}</div>
        <div class="a_type">Type: ${item.type}</div>
        <div class="a_participants">Participants: ${item.participants}</div>
        <div class="a_price">Price: ${item.price}</div>
        <div class="a_link">${
          item.link === "none" ? "" : "Link: " + item.link
        }</div>
      </div>
      <button class="delete" id=${item.key}>DELETE</button>
    </div>
    `;
  });
  const del = document.querySelectorAll(".delete");
  del.forEach((item) => item.addEventListener("click", deleteData));
}

function filterData() {
  let typeArr = arr.filter((item) =>
    input_type.value ? input_type.value === item.type : item
  );

  let partArr = typeArr.filter((item) =>
    input_part.value ? Number(input_part.value) == item.participants : item
  );

  let priceArr = partArr.filter((item) =>
    input_price.value ? Number(input_price.value) == item.price : item
  );

  showData(priceArr);
}

function deleteData(e) {
  arr = arr.filter((item) => item.key !== e.target.id);
  showData(arr);
}

function clearData() {
  activity.innerHTML = "";
  type.innerHTML = "";
  part.innerHTML = "";
  price.innerHTML = "";
  link.innerHTML = "";
  key.innerHTML = "";
}

getData();
