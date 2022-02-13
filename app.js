const BASE_URL = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough=`;
const resultDiv = document.querySelector(".resultDivFlexP");
const resultUL = document.querySelector("#resultUL");
//GoogleMAP-API - displaying only white div(not working)
// let script = document.createElement('script');
// script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAJQH1DRMnCLXqgQF7GLqHF69oci3XX-Os&callback=initMap&libraries=&v=weekly';
// script.async = true;
// script.defer = true;
// document.head.appendChild(script);


const buttonList = document.querySelectorAll("button");//creating an array of buttons
// console.log(buttonList);//Testing
//for each button element- we are implementing button click event and getting the data
// filtered by borough name and agency name.
buttonList.forEach(element => {
    element.addEventListener('click', async () => {
        const numberInput = document.querySelector("input");
        // console.log(numberInput.value);
        let currentVal = numberInput.value;
        try{
        let response = await axios.get(`${BASE_URL}${element.id}&agency=NYPD`);
           console.log(response.data);
        // console.log(response.data.length);
                if(currentVal == ""){
                    currentVal = "10";
                    // console.log("IF-Part");//Testing
                    renderRestult(response.data, currentVal);
                    }
                else{
                    //  console.log("ELSE-Part");//Testing
                     renderRestult(response.data, currentVal);
                    }
    }
        catch(e){
            console.log(e);
        }
    
})
})

//this method displays the result- in alphabetical order: 
function renderRestult(array, n){
    // console.log("Result Render -Part");//Testing
    // console.log(n);//Testing
    let arrayDescriptor = [];
  for(let i = 0; i < n; i++){
    //   console.log("Result-Render For loop");//Testing
    let descriptor = array[i].descriptor;
    let description = array[i].resolution_description;
    let latitude = array[i].latitude;
    let longitude  = array[i].longitude;
    arrayDescriptor[i] ={descriptor,description,latitude,longitude};

  }
    /* Testing---
    console.log("Iam here")
    console.log(arrayDescriptor);
    console.log("array desctiptor obj");
    console.log(Object.keys(arrayDescriptor).length); */
    // console.log(arrayDescriptor);//Testing

    //Sorting the array by descriptor alphabetical order
    let sortedArrayDescriptor = arrayDescriptor.sort(function(a,b){
        if(a.descriptor > b.descriptor){
            return 1;
        }
        else{
            return -1;
        }
    });
    console.log(sortedArrayDescriptor);//Sorted Array in Alphabetical Order
    // console.log(sortedArrayDescriptor.length);//Testing
    function cnt(array){
    let newobj =[];
        for(let x = 0; x < array.length; x++){
        newobj.push(array[x].descriptor);
        }
    console.log(newobj);
    let count = {};
    for (const element of newobj) {
      if (count[element]) {
        count[element] += 1;
      } else {
        count[element] = 1;
      }
    }

 console.log(count);  
 //displays- count of each descriptor in the footer. 
 let myResult= JSON.stringify(count)
    const foot = document.querySelector("#footer");
    const footDiv = document.createElement('div');  
    footDiv.innerHTML = `<h5>${myResult}</h5>`;
    foot.appendChild(footDiv);
} 
cnt(sortedArrayDescriptor);


//Sending sorted array to display the in the page
 for(let j = 0; j < sortedArrayDescriptor.length;j++){
    //  console.log("inside j loop")//Testing
    //  console.log(arrayDescriptor[j].descriptor);//Testing
    let li = document.createElement('li');
        li.style.listStyleImage = "url('images/padlock-24_yello.png')";
    let descriptorH4 = document.createElement('h4');
        descriptorH4.className ="style";
        let descOP = document.createTextNode(sortedArrayDescriptor[j].descriptor);
        descriptorH4.appendChild(descOP);
        descriptorH4.style.marginTop = "20px";
        descriptorH4.style.marginRight = "150px";
        li.appendChild(descriptorH4);
        // console.log("I am description part: "+ arrayDescriptor[j].description);//Testing
    
    let police = document.createElement('button');
    
    police.className ="style"
    police.textContent = "What did the police do?";
    police.style.cursor ="pointer";
    police.style.marginTop = "20px";
    police.style.float= "right";
    let div = document.createElement('div');
    //GoogleMAP-API
    // let btnMap = document.createElement('button');
    // btnMap.textContent ="view on Map";
    // btnMap.addEventListener('click',initMap);
    
    police.addEventListener("click", ()=>{
        div.style.color = "rgb(245,245,245)";  
        // console.log("Iam in click event"); //Testing
        //if the display is none then it displays the resolution description
       if(div.style.display === "none") {
        //    console.log("display ===none");//Testing
            div.innerHTML = `${sortedArrayDescriptor[j].description}`; 
            li.appendChild(div); 
            //GoogleMAP API testing 
            // li.appendChild(btnMap);
            // btnMap.addEventListener("click",initMap);
            div.style.display = "block";// setting display value to block since the resolution descrription is displayed.
        }
        else{//if the display is not none then we are setting displays to none so the resolution description disappears on button click. 
            div.style.display = "none";
        }   
    })
//GoogleMAP API-code
//     div.id = "map";
//     div.style.height = "200px";
//     div.style.width = "40%";
//    function initMap(){
//         let lati = sortedArrayDescriptor[j].latitude;
//         let lngi = sortedArrayDescriptor[j].longitude;
//         // console.log(lati);
//         const coordinates ={lat: `${lati}`, lng:`${lngi}`}
//         // console.log(coordinates);
//         //options
//         let options = {
//             zoom : 12,
//             center: {lat: `${coordinates.lat}`, lng:`${coordinates.lng}`}
//         }
//         //new map
//         let map = new google.maps.Map(document.getElementById('map'),options);

//             let marker = new google.maps.Marker({
//             position: coordinates,
//             map:map
//             // icon:'images/marker.png'
//             });
//         }
    
    li.appendChild(police);
    resultUL.append(li);
    
   

    }
}


//Trail code---
// const brooklynButton = document.querySelector("#BROOKLYN");
// const manhattanButton = document.querySelector("#MANHATTAN");
// const queensButton = document.querySelector("#QUEENS");
// const statenIslandButton = document.querySelector("#STATEN ISLAND");
// const bronxButton = document.querySelector("#BRONX");//Testing
// console.log(bronxButton.id);//Testing

// function validation(){
//     if(currentValue == ''){
//         currentValue = "10";
//         return true;
//     }
//     else{
//         return true;
//     }
// }

// if(resultUL.style.display !== "none"){
//     resultUL.style.display = "none";    
// }
// else{
// resultUL.append(li);
// resultUL.style.display ="block";
//  }
// for(let j = 0; j < Object.keys(arrayDescriptor).length;j++){
