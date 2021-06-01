var channelInformation = document.querySelector('.channelInform');
channelInformation.addEventListener("click",(e)=>{
    var dashBoard = document.querySelector(".dashboard")
    dashBoard.innerHTML = "";
    dashBoard.innerHTML= `
        <form class="form-inline">
        <div class="form-group mb-2">
        <h4>Enter the channel ID</h4>
        </div>
        <div class="form-group mx-sm-3 mb-2">
        <label for="channelSearch" class="sr-only">channelSearch</label>
        <input type="text" class="form-control" id="channelSearch" placeholder="Enter the channel ID">
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
    e.preventDefault();
    var vidname = document.querySelector(".vidname");
    var dashBoard = document.querySelector(".dashboard");
    var videoname = vidname.value;
    var baseUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDhIf5_HQYvNxsMTZo9ptc3iUlJdxx0cIQ&type=video&maxResults=8";
    var response =  fetch(baseUrl+"&q="+videoname);
    response.then((jsondata)=>{
        return jsondata.json();
    }).then((data)=>{
        console.log(data,"data");
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
            
        });
        dashBoard.innerHTML=st;
      
    })
  

});



function getChannelDetails(dashBoard){
    document.querySelector(".channelsearch").addEventListener("click",(e)=>{

        var channelIdCode = document.querySelector("#channelSearch").value;
        
        if(channelIdCode.length>0){
                
            var baseUrl = "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&key=AIzaSyDhIf5_HQYvNxsMTZo9ptc3iUlJdxx0cIQ";
            var response =  fetch(baseUrl+"&id="+channelIdCode);
            response.then((jsondata)=>{
                return jsondata.json();
            }).then((data)=>{
    
                element=data.items[0];
                
                let innerhtml=`
                <div class=" videos col-sm col-md col-lg col-xl shadow-lg">
                <img width="420px" height="310px" src= "${element.snippet.thumbnails.high.url}"></img>
                <p class="pt-3"><b>Title : </b>${element.snippet.title}</p>
                <p><b>Channel discription : </b>${element.snippet.description}</p>
                <p><b>Channel subscribers : </b>${element.statistics.subscriberCount}</p>
                <p><b>Channel total videos : </b>${element.statistics.videoCount}</p>
                <p><b>Channel total views : </b>${element.statistics.viewCount}</p>
                <p><b>Channel Date of upload : </b>${element.snippet.publishedAt}</p>
                </div>   
                `;

                dashBoard.innerHTML=innerhtml;
            })

        }
    });

}