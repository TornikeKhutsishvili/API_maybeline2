var main = document.querySelector(".main")
var sel = document.querySelector("select")
var inp = document.querySelector("input")
let pages = document.querySelector(".pages")
let leftpage = document.querySelector(".leftpage")
let rightpage = document.querySelector(".rightpage")
let middlepage = document.querySelector(".middlepage")
var copyarr = []
var copyarr2 = []
let btns = []
let itemPerPage = 10
let pagecount = 0
let xhr = new XMLHttpRequest()
xhr.open("GET","https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")

xhr.onloadstart = function() {
    console.log("request sent")
}
xhr.send()
xhr.onloadend = function(){
    let x = JSON.parse(xhr.responseText)
    pagecount = Math.ceil(x.length / itemPerPage)
    console.log(x.length , itemPerPage)
    // for(let i = 1; i <= pagecount; i++){
    //     let sp = document.createElement("span")
    //     sp.innerText = i
    //     pages.appendChild(sp)
    //     sp.classList.add("pclick")
    // }
    if(pagecount > 2){
       leftpage.innerText = 1
       middlepage.innerText = 2
       rightpage.innerText =3
    }

    let pclick = document.querySelectorAll(".pclick")
    console.log(pclick)
    displayItems(x,0,itemPerPage)
    for(let i of pclick){
        i.addEventListener("click",function(){
            if(this.innerText != "1"){
                console.log(this.innerText)
            if(this.innerText != "5"){
            let y = this.innerText
            main.innerHTML = ""
            middlepage.innerText = this.innerText
            rightpage.innerText = parseInt(y)+1
            leftpage.innerText = y-1
            let start = (i.innerText-1)*itemPerPage
            let end = i.innerText*itemPerPage
            displayItems(x,start,end)
            }
            else{
                main.innerHTML = ""
                displayItems(x,x.length-(x.length%itemPerPage),x.length)
            }
        }
            else{
                main.innerHTML =""
                displayItems(x,0,itemPerPage)
            }
        })
    
    }

    let left = document.querySelector(".left")
    let right = document.querySelector(".right")

    left.addEventListener("click",function(){
        main.innerHTML = ""
        displayItems(x,0,itemPerPage)
    })
    right.addEventListener("click",function(){
        let lastPageCount = x.length % itemPerPage
        main.innerHTML = ""
        displayItems(x,x.length-lastPageCount,x.length)
    })
    
    //displayItems(x,0,20)
    btns = document.querySelectorAll(".show")
for(let i of btns){
    i.addEventListener("click",function(){
        let p = this.parentNode.children[1]
        let b = this.parentNode.children[2]
         if(p.style.height != "auto"){
           p.style.height = "auto"
           b.innerText = "show less"
         }
         else{
           p.style.height = "170px"
           b.innerText = "show more"
         }
    })
 }
}

sel.addEventListener("change",function(){
    if(sel.value == "asscending"){
          copyarr.sort(function(a,b){
            return a.price - b.price
        })
        main.innerHTML = ""
        displayItems(copyarr)
    }
    else if(sel.value == "descending"){
        copyarr.sort(function(b,a){
            return a.price - b.price
        })
        main.innerHTML = ""
        displayItems(copyarr)

    }
})

function displayItems(arr,start,end){
    for(let i = start ; i < end ; i++){
        let tmp = `
                <div class="card" style="width: 18rem;">
        <img src="${arr[i].image_link}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${arr[i].name}</h5>
            <p class="card-text">${arr[i].description}</p>
            <button class="show">show more</button>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${arr[i].product_type}</li>
            <li class="list-group-item">${arr[i].price}$</li>
        </ul>
        <div class="card-body">
            <a href="${arr[i].product_link}" class="card-link">info</a>
            <a href="${arr[i].website_link}" class="card-link">Website</a>
        </div>
        </div>
        `
        main.innerHTML += tmp
    }  
}

inp.addEventListener("keyup",function(){
    let filterarr = copyarr2.filter(i=> i.name.toLowerCase().includes(inp.value))
    main.innerHTML = ""
    displayItems(filterarr)
})




