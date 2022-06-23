const Random = {
  uniform (min=0, max=1){
    return Math.floor(Math.random() * (max - min)) + min;
  },
  random (){
    return Math.random();
  },
  choise(arr=[]){
    return arr[Math.floor(Math.random() * arr.length)];
  }
}


const score = document.getElementById("score"),
      reset = document.getElementById("reset"),
      goal = document.getElementById("goal"),
      pushBtn = document.getElementById("push"),
      counter = document.getElementById("counter");

let goalValue = 100;

randomAdkar().then(v => {
  counter.dataset.text = v;
}).catch((rej) => {
  console.log(rej);
});

goal.innerText = `Goal: ${goalValue}`;
score.innerText = 0;

let t;

pushBtn.addEventListener("click", ()=>{
  clearTimeout(t);
  counter.classList.remove("active");
  score.innerText = parseInt(score.innerText) + 1;
  if (parseInt(score.innerText) == goalValue){
    goalValue += 100;
  }
  goal.innerText = `Goal: ${goalValue}`;
  
  randomAdkar().then(v => {
    counter.dataset.text = v;
  }).catch((rej)=>{
    console.log(rej);
  });
  setTimeout(()=>counter.classList.add("active"), 200);
  
  t = setTimeout(()=>{
    counter.classList.remove("active");
  }, 5300);
});

reset.addEventListener("click", ()=>{
  score.innerText = 0;
});

async function randomAdkar(){
  const req = await fetch("./adkar.json");
  const json = await req.json();
  
  return Random.choise(json);
}
