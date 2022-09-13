
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=[YOUR_API_KEY]
   
let popular_videos = document.getElementById("popular-videos")

async function showpopular() {

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=AIzaSyCrwp3vBIsFwdzpe3ZirxNViqzTahcvA54`)
    let data = await res.json()
    let videoid = data.items
    videoid.forEach((icon) => {
        getChanelicon(icon)
    })
    
    console.log(videoid)
   // appendVideos(videoid)


}

 

  function getChanelicon(icon) {
    fetch(`https://www.googleapis.com/youtube/v3/channels?` + new URLSearchParams ({
        key: "AIzaSyCrwp3vBIsFwdzpe3ZirxNViqzTahcvA54",
        part: "snippet",
        id: icon.snippet.channelId
    }))

    .then(res => res.json())
    
    .then (data => {
        icon.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        // console.log(icon.channelThumbnail)
         console.log(icon)
       appendVideos(icon)
    })
    .catch(function(err){
        console.log(err)
    })

 }

 showpopular()

function appendVideos({ channelThumbnail,id, snippet:{ title,channelTitle ,publishedAt}, statistics:{viewCount}}) {
  //  popular_videos.innerHTML = null
    //console.log(videos)
    // videos.forEach(function({ channelThumbnail,id, snippet:{ title,channelTitle }}){
        
        let maindiv = document.createElement("div")
        let Title = document.createElement("p")
        Title.textContent = title
        let ChannelName = document.createElement("p")
        ChannelName.style.color = "grey"
        ChannelName.style.marginBottom = "2px"
        ChannelName.textContent = channelTitle

        let publish = new Date(publishedAt)


        let views = document.createElement("p")
        views.style.color = "grey"
        views.style.marginTop = "2px"
        views.innerHTML = viewCount + " views " + ";" + publish.getMonth() + "/" + publish.getFullYear()

        let img = document.createElement("img")
        img.setAttribute("id" , "channelimg")

        img.src= channelThumbnail

        let text_div = document.createElement("div")
        text_div.append(Title,ChannelName,views)

        let img_text = document.createElement("div")
        img_text.style.display="flex"

        img_text.append(img,text_div)

        let div = document.createElement("div")
        div.innerHTML = `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      
        maindiv.append(div,img_text)
        popular_videos.append(maindiv)
    //})
}



if(localStorage.getItem("youtubeinput") === null) {
    localStorage.setItem("youtubeinput" , JSON.stringify([]))
}

function showResult() {
    let search = document.getElementById("search").value

    let store = JSON.parse(localStorage.getItem("youtubeinput"))
    if(search !== "") {
    store.push(search)
    }

    localStorage.setItem("youtubeinput" , JSON.stringify(store))
    setTimeout(()=> {
        window.location.href = "searchResult.html"
    },2000)



   
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


 let flag = true;

function dikhaobar() {

    if(flag == true) {
    let side_div = document.getElementById("side-div")

    side_div.style.display = "block"

    let videos = document.getElementById("popular-videos")

    videos.style.width="85%"
    videos.style.marginLeft = "15%"
    flag = false
    }else {
    
    let side_div = document.getElementById("side-div")
    side_div.style.display = "none"
    let videos = document.getElementById("popular-videos")


    videos.style.width="95%"
    videos.style.marginLeft = "5%"
    flag = true
    }
}
 


function showProfile() {

    let profile_div = document.getElementById("profile-div")
    profile_div.style.display = "block"

    
}

function hideprofile_div() {
    let profile_div = document.getElementById("profile-div")
    profile_div.style.display = "none"
}





function login(event) {
    event.preventDefault()

    let username = document.getElementById("user")
    let password = document.getElementById("pass")

    let user_data = {
            username:username.value,
            password:password.value,
    }

    let data_to_send  = JSON.stringify(user_data)

    fetch("https://masai-api-mocker.herokuapp.com/auth/login" , {

    method:"POST",
    body:data_to_send,
    headers: {
    "Content-Type" : "application/json"
    },
    })
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        console.log(res)
        fetchmyData(user_data.username, res.token)
    })
    .catch((err) => {
            console.log("err:", err)
    })
}

function fetchmyData(username, token) {

fetch(`https://masai-api-mocker.herokuapp.com/user/${username}` , {

    headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}` ,
    },
})

.then((res) => {

return res.json()

})
.then((res) => {
    successful()
    console.log(res)

})
.catch((err) => {

   console.log(err)
})

}

function successful() {

    let profile_btn = document.getElementById("profile-btn") 
    profile_btn.style.display = "none"

    let prof = document.getElementById("profile-pic")
    prof.style.display = "block"

 alert("LOGGED IN SUCCESSFULLY")
}
