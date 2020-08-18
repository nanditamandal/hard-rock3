document.querySelector(".search-btn").addEventListener('click', (e)=>{
    e.preventDefault();
   const inputValue = document.querySelector("input").value;
   if(inputValue == "")
   {
       alert("please input the name");
       return;
   }
   else{
    console.log("click");
    display("block", "none");
   // document.querySelector(".single-lyrics").style.display = "none";
   // document.getElementById("result-div").style.display= "block";
  
    shortLyrics(inputValue);

   }
    
});


function shortLyrics(search){
    fetch(`https://api.lyrics.ovh/suggest/${search}`)
    .then(res =>res.json())
    .then(data =>{
        
        
        let value = "";
        let previousValue =[] ;
        let randomValue;
      
       
          console.log(data);
          randomValue = setRandomValue(15);
          for (var i=0; i<10; i++){

              while(previousValue.indexOf(randomValue) != -1){
                randomValue = setRandomValue(15);
              }
              previousValue.push(randomValue);
              console.log(randomValue);
              const dataArray = data.data[randomValue];
              const picture = dataArray.album.cover;
              const mp3Link = (dataArray.preview);
              //console.log(typeof(mp3Link));
              const mp3 = mp3Link.replace("http", "https");
               
                value +=`<div id = "search-div" class="single-result row align-items-center my-3 p-3">   <div class="col-md-9">
                   <h3 id="title"class="lyrics-name">${dataArray.title}</h3>
                    <p id="artist"class="author lead">Album by <span>${dataArray.artist.name}</span></p>
                    <p><img src ="${picture}" alt ="picture not "></p>
                    <audio id="audio" controls <source src="${mp3}" type="audio/ogg">  </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button id="lyrics-search"class="btn btn-success btn-lyrics" data-title="${dataArray.title}" data-artist="${dataArray.artist.name}" )">Get Lyrics</button>
                </div>
                </div>`;
    
          }

          document.getElementById('result-div').innerHTML = value;
          document.querySelector("input").value ="";

    })
    .catch( err => alert(err))
}
function setRandomValue(length){
    const randomValue = Math.floor(Math.random() * length);
    return randomValue;
}

document.getElementById("result-div").addEventListener('click',function(e){
    const clickedElement = e.target;
  
    if(clickedElement.tagName === "BUTTON")
    {
  
        const artist = clickedElement.getAttribute('data-artist');
        const title = clickedElement.getAttribute('data-title');
        getLyrics (artist, title);
    }

})
function getLyrics (artist, title){
 
    let result =document.querySelector('.lyric');
     fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
     .then(res =>res.json())
     .then(data =>{
        const audio =  document.getElementsByTagName('audio');;
         audioStop(audio);
       console.log(data);
        document.querySelector('.text-success').innerHTML = `${artist} - ${title}`;
         const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
         result.innerHTML = lyrics;
        //  document.querySelector(".single-lyrics").style.display = "block";
        //  document.getElementById("result-div").style.display= "none";
        display( "none", "block");
        
   
 
     })
     .catch( err => {document.querySelector('.text-success').innerHTML ="";
     display( "none", "block");
     result.innerHTML = "Lyrics not found ";
     alert("Lyrics not found ");
    
    } )
     
     
 }
 function audioStop(audio)
 {
    for(i=0; i<audio.length; i++) audio[i].pause();
    
 }
 function display(show, hide)
 {
     
    document.querySelector(".single-lyrics").style.display =hide;
    document.getElementById("result-div").style.display= show;
 }

           
            