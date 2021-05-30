var channelInformation = document.querySelector('.channelInform');
channelInformation.addEventListener("click",(e)=>{
    var dashBoard = document.querySelector(".dashboard")
    dashBoard.innerHTML = "";
    dashBoard.innerHTML= `
        <form class="form-inline">
        <div class="form-group mb-2">
        <h4>Enter the channel Name</h4>
        </div>
        <div class="form-group mx-sm-3 mb-2">
        <label for="channelSearch" class="sr-only">channelSearch</label>
        <input type="text" class="form-control" id="channelSearch" placeholder="channelSearch">
        </div>
        <button type="submit" class="btn channelsearch btn-dark mb-2">Search</button>
    </form>
    `;
    getChannelDetails(dashBoard);
    

});


var uploading = document.querySelector('.playlist');
uploading.addEventListener("click",(e)=>{
    var dashBoard = document.querySelector(".dashboard");
    dashBoard.innerHTML = "";
    dashBoard.innerHTML= `
    <h1>To create a playlist click on the upload button</h1>
    <button class="btn btn-dark uploadbutton" >Upload</button>
`;
});
var search = document.querySelector('.searchVideo');
search.addEventListener("click",(e)=>{
    console.log("in the search")
    var vidname = document.querySelector(".vidname");
    var dashBoard = document.querySelector(".dashboard");
    var videoname = vidname.value;
    var baseUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDhIf5_HQYvNxsMTZo9ptc3iUlJdxx0cIQ&type=video&maxResults=8";
    var response =  fetch(baseUrl+"&q="+videoname);
    response.then((jsondata)=>{
        return jsondata.json();
    }).then((data)=>{
       // console.log(data,"data");
        var st=""
        data.items.forEach(element => {
            st+= `
            <div class=" videos col-sm col-md col-lg col-xl shadow-lg">
            <iframe width= "400px" height ="315px" src= "http://www.youtube.com/embed/${element.id.videoId}" allowfullscreen></iframe>
            <p class="pt-3"><b>Title : </b>${element.snippet.title}</p>
            <p><b>Channel Name : </b>${element.snippet.channelTitle}</p>
            <p><b>Uploaded on :</b>${element.snippet.publishedAt}</p>
            </div>   
            `
            console.log(element.snippet.channelId);
        });
        dashBoard.innerHTML=st;
    })
   // console.log(data.json());  <iframe class="videos" width="420" height ="315" src= "http://www.youtube.com/embed/${element.id.videoId}" frameborder="1" allowfullscreen> </iframe>

});

function getChannelDetails(dashBoard){
    document.querySelector(".channelsearch").addEventListener("click",(e)=>{

        var videoname = document.querySelector("#channelSearch").value;
        
        if(videoname.length>0){
                
            var baseUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDhIf5_HQYvNxsMTZo9ptc3iUlJdxx0cIQ&type=video&maxResults=1";
            var response =  fetch(baseUrl+"&q="+videoname);
            response.then((jsondata)=>{
                return jsondata.json();
            }).then((data)=>{
                console.log(data);
                data.items.forEach(element => {
                    var channelid=(element.snippet.channelId);
                    baseUrl="https://www.googleapis.com/youtube/v3/channels?part=statistics&key=AIzaSyDhIf5_HQYvNxsMTZo9ptc3iUlJdxx0cIQ";
                    fetch(baseUrl+"&id="+channelid).then((response)=>{
                        return response.json();
                    })
                    .then((jsondata)=>{
                        console.log(jsondata);
                        var innerhtml="";
                        innerhtml+= `
                        <div class=" videos col-sm col-md col-lg col-xl shadow-lg">
                        <iframe width= "400px" height ="315px" src= "http://www.youtube.com/embed/${jsondata.items.id}" allowfullscreen></iframe>
                        <p class="pt-3  "><b>No of subscribers : </b>${jsondata.items[0].statistics.subscriberCount}</p>
                        <p class=" " ><b>No of videos : </b>${jsondata.items[0].statistics.videoCount}</p>
                        <pclass=" " ><b>No of views of channel :</b>${jsondata.items[0].statistics.viewCount}</p>
                        </div>   
                        `
                        dashBoard.innerHTML=(innerhtml);
                    })
                });
            })
        }
        });
}