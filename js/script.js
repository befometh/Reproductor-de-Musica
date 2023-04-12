var isPlaying = false;
var canciones;
const pathSong = "./media/audio/";
const pathImg = "./media/img/";
const audio = document.getElementById("currentSong");
const currentImg = document.getElementById("imgSong");
const playPause = document.getElementById("playPause");
const nameSong = document.getElementById("nameSong");
var currentPos;
class song {
  /*
    Tenemos el constructor de la clase "song" (canción) que recibe 
    @cover = dirección de la imagen de presentación
    @title = texto del título
    @path= dirección de ubicación del audio
    @duration = (Arreglo) tiempo en [horas,minutos,segundos]
    */
  constructor(cover, title, path,duration) {
    
    this.cover = cover;
    this.title = title;
    this.path = path;
    this.duration = duration;
  }
}

/*
Función que se crea al abrir la página.
  Funciones:
  -Crea el array de canciones.
  -Asigna los elementos a la lista de reproducción
*/
function creador() {
  
  canciones = [
    dfault = new song(
      "default.jpg",
      "Pikaboi - Popcorn",
      "default.mp3",
      [0,3,8]
    ),    
    infinite = new song(
      "infinite.jpg",
      "Stratovarius - Black Diamond",
      "infinite.mp3",
      [0,4,38]
    ),
    werewolves = new song(
      "werewolves.jpg",
      "Powerwolf - Night of the Werewolves",
      "werewolves.mp3",
      [0,4,6]
    ),
    warriors = new song(
      "warriors.jpg",
      "Manowar - Warriors of the World United",
      "warriors.mp3",
      [0,4,53]
    )
]
  list = "";
  value = 0;
  for (let j of canciones) {
    list +=`<option value="${value}">${j.title}</option>`;
    value++;
  }
  document.getElementById("playlist").innerHTML = list;
}

/*
Funcion que se relaciona al boton Play / Pause
Funciones:
-Asigna la posición global @currentPos y guarda la posición de la lista en cuestión
-Asigna la ruta de la imagen, de la canción y cambia el nombre mostrado en la canción en reproducción
-Reproduce la canción y cambia la forma del ícono del botón play/pause, @isPlaying= verdadero si la canción está actualmente en reproducción
*/
function toPlayPause() {
    currentPos = document.getElementById("playlist").value;
    imgSong.src= `${pathImg}${canciones[currentPos].cover}`;
    audio.src = `${pathSong}${canciones[currentPos].path}`;
    nameSong.innerHTML = canciones[currentPos].title;
    getLength();
    
    if(isPlaying){
      playPause.src = "./media/icon/play.svg";
    }
    else{
      audio.play();
      playPause.src = "./media/icon/pause.svg";
    }
    isPlaying=!isPlaying;
}

//Entrega el tamaño que va a tener la barra de reproducción al HTML, calcula el tiempo total 
function getLength(){
  var thisTime = canciones[currentPos].duration
  totalBar = thisTime[2]+60*thisTime[1]+3600*thisTime[0];
  document.getElementById("timebar").max = Math.floor(totalBar);
}

//Entrega la posición actual a la barra de reproducción en el HTML
function getPos(sec){
  var time = Math.floor(sec);
  document.getElementById("timebar").value = time;
}

/*
Función que actualiza automáticamente mientras se reproduce la canción
@thisTime[0,0,0] = array que guarda la hora, minuto y segundo respectivamente y lo asigna a la etiqueta de tiempo
- Llama la función getPos(valor total en segundos)
*/
audio.addEventListener("timeupdate",()=>{
  var thisTime=[0,0,0];
  thisTime[0] = Math.floor(audio.currentTime);
  getPos(thisTime[0]);
  if(thisTime[0]>=60){
    thisTime[1]=Math.floor(thisTime[0]/60);
    if(thisTime[1]>=60){
      thisTime[2]=Math.floor(thisTime[1]/60);
      thisTime[1]-=thisTime[2]*60;
    }
    thisTime[0]-=thisTime[1]*60;
  }
  for(let i=0;i<thisTime.length;i++){
    if(thisTime[i]<10){
      thisTime[i]=`0${thisTime[i]}`
    }
  }
  document.getElementById("time").innerHTML = `Tiempo: ${thisTime[2]}:${thisTime[1]}:${thisTime[0]}`
}) 

// Asigna funcionamiento al botón rewind, atrasando 5 segundos
function rewind(){
  var ctime = audio.currentTime;
  ctime -= 5;
  audio.currentTime = ctime;
}

// Asigna funcionamiento al botón fforward, adelantando 5 segundos
function fforward(){
  var ctime = audio.currentTime;
  ctime += 5;
  audio.currentTime = ctime;
}

// Atrasa la canción en una posición, si sale del arreglo vuelve al final. Reproduce automáticamente
function skipBack(){
  var i= currentPos;
  i--;
  if(i==-1){
    i=canciones.length-1
  }
  document.getElementById("playlist").value = i;
  isPlaying=false;
  toPlayPause();
}

// Adelanta la canción en una posición, si sale del arreglo vuelve al comienzo. Reproduce automáticamente
function skipForward(){
  var i= currentPos;
  i++;
  if(i==canciones.length){
    i=0;
  }
  document.getElementById("playlist").value = i;
  isPlaying=false;
  toPlayPause();
}


