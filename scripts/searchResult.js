    


let videos = document.getElementById("videos")

async function GetResult(){
    let getvalue = JSON.parse(localStorage.getItem("youtubeinput"))
    let query = getvalue[getvalue.length-1]
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=AIzaSyCrwp3vBIsFwdzpe3ZirxNViqzTahcvA54&maxResults=10`)
    let data = await res.json()
    appendVideos(data.items)

    localStorage.setItem("youtubeinput" , JSON.stringify(getvalue))
}
GetResult()
function appendVideos(video_data) {

    videos.innerHTML = null

    video_data.forEach(function({ id:{ videoId }, snippet: { title ,description }}){

        let main = document.createElement("div")
        main.setAttribute("id" , "video-data")
        
        let div = document.createElement("div")

        div.innerHTML = `<iframe width="300" height="170" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        
        let textdiv = document.createElement("div")
        textdiv.style.marginLeft = "20px"

        let name = document.createElement("p")
        name.textContent = title

        let des = document.createElement("p")
        des.textContent = description

        textdiv.append(name,des)

        main.append(div,textdiv)
    
        videos.append(main)
    })
}

function showResult() {
    let search = document.getElementById("search").value

    let store = JSON.parse(localStorage.getItem("youtubeinput"))

    if(search !== "") {
    store.push(search)
    }

    localStorage.setItem("youtubeinput" , JSON.stringify(store))




    async function GetResult(){
    let getvalue = JSON.parse(localStorage.getItem("youtubeinput"))
    let query = getvalue[getvalue.length-1]
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=AIzaSyCrwp3vBIsFwdzpe3ZirxNViqzTahcvA54&maxResults=10`)
    let data = await res.json()
    appendVideos(data.items)

    localStorage.setItem("youtubeinput" , JSON.stringify(getvalue))
}
GetResult()
function appendVideos(video_data) {

    videos.innerHTML = null

    video_data.forEach(function({ id:{ videoId }, snippet: { title ,description }}){

        let main = document.createElement("div")
        main.setAttribute("id" , "video-data")
        
        let div = document.createElement("div")

        div.innerHTML = `<iframe width="300" height="170" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        
        let textdiv = document.createElement("div")
        textdiv.style.marginLeft = "20px"

        let name = document.createElement("p")
        name.textContent = title

        let des = document.createElement("p")
        des.textContent = description

        textdiv.append(name,des)

        main.append(div,textdiv)
    
        videos.append(main)
    })
}
}

function dikhaobar() {

    let side_div = document.getElementById("side-div")

    side_div.style.display = "block"

    let videos = document.getElementById("videos")

    videos.style.width="85%"
    videos.style.marginLeft = "15%"
}

let side_div = document.getElementById("side-div")
side_div.addEventListener("click", hidediv)

function hidediv() {
    side_div.style.display = "none"

    let videos = document.getElementById("videos")


    videos.style.width="95%"
    videos.style.marginLeft = "5%"
}



let recent =  document.getElementById("recentSearch")

function showrecent() {
    recent.style.display = "block"
   
   recent.innerHTML = null

   let store = JSON.parse(localStorage.getItem("youtubeinput"))
 
    let p1 = document.createElement("p")
    p1.textContent = store[store.length-1]
    let p2 = document.createElement("p")
    p2.textContent = store[store.length-2]
    let p3 = document.createElement("p")
    p3.textContent = store[store.length-3]
    let p4 = document.createElement("p")
    p4.textContent = store[store.length-4]
    let p5 = document.createElement("p")
    p5.textContent = store[store.length-5]

   recent.append(p1,p2,p3,p4,p5)

   localStorage.setItem("youtubeinput" , JSON.stringify(store))
}

//let recent =  document.getElementById("recentSearch")
   recent.addEventListener("click" , hiderecent)
 function hiderecent() {
     recent.style.display = "none"
 }
