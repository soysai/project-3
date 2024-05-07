var apiUrl = "https://api.le-systeme-solaire.net/rest/bodies/";


//---------------------------------------------refactored


fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    let celestialBodies = data.bodies;
    let planetBodies = data.bodies.filter(body => body.isPlanet);
    console.log("Celestial Body Names:");
    celestialBodies.forEach(body => {
      console.log(body.name);
    });
    
    
    // Shuffle the celestial bodies array
    shuffleArray(celestialBodies);

    let sectionIndex = 1;

    // Divide the celestial bodies into three equal parts
    let columnSize = Math.floor(celestialBodies.length / 3);
    let columnBodies = [];
    for (let i = 0; i < celestialBodies.length; i += columnSize) {
      columnBodies.push(celestialBodies.slice(i, i + columnSize));
    }

    let columns = [document.getElementById('column1'), document.getElementById('column2'), document.getElementById('column3')];

    // Function to populate each column with the chunked data
    columnBodies.forEach((column, columnIndex) => {
      column.forEach((body, index) => {
        let section = document.createElement('div');
        section.classList.add('section');
        section.textContent = ` ${sectionIndex++}`;

        for (let j = 1; j <= 4; j++) {
          let circle = document.createElement('div');
          circle.classList.add('circle');
          circle.textContent = j;
          section.appendChild(circle);
        }
        

        let randomCircle = Math.floor(Math.random() * 4);
        let selectedCircle = section.querySelectorAll('.circle')[randomCircle];
        selectedCircle.textContent = body.name;
        

        // to make sure that the Mars' circles are colored display when the Mars button is clicked 
        document.getElementById("mars-button").addEventListener('click', function(event) {


          // trial 

            // Remove any existing circles within the display-container div
          
            const displayContainer = document.querySelector('.display-container');
            displayContainer.innerHTML = '';
        
            // to create a circle element
            const circle = document.createElement('div');
            circle.classList.add('circle');
            // to set circle properties
            circle.style.width = '200px';
            circle.style.height = '200px';
            circle.style.backgroundColor = 'orangered';
            circle.style.alignContent = 'center';
            // to append the circle to the display-container div
            displayContainer.appendChild(circle);

          
          //to replace the text content with data from the object clicked
          document.querySelector(".planetname").textContent = "MARS";

          fetch("https://api.le-systeme-solaire.net/rest/bodies/mars")
          .then(response => response.json())
          .then(data => {
              const discoveryDate = data.discoveryDate;
              document.querySelector(".discoverdate").textContent = `${discoveryDate}`;
        
              const discoverer = data.discoveredBy;
              document.querySelector(".discoveredby").textContent = `${discoverer}`;



              // to display additional info 

              let englishName = data.englishName;
              let avgTemp = data.avgTemp;
              let axialTilt = data.axialTilt;
              let bodyType = data.bodyType;
              let gravity = data.gravity;
              let mass = data.massValue;
              let radius = data.meanRadius;
            
              
              // Construct the information string with HTML line breaks
              let infoHTML = `<p>English name: ${englishName}</p>`;
              infoHTML += `<p>Average Temperature: ${avgTemp}</p>`;
              infoHTML += `<p>Axial Tilt: ${axialTilt}</p>`;
              infoHTML += `<p>Body Type: ${bodyType}</p>`;
              infoHTML += `<p>Gravity: ${gravity}</p>`;
              infoHTML += `<p>Mass Value: ${mass}</p>`;
              infoHTML += `<p>Mean radius: ${radius}</p>`;
              
              // Set the HTML content of the display container
              document.querySelector(".moondisplay-container").innerHTML = infoHTML;

              

          });

          console.log("Mars button clicked!");
          celestialBodies.forEach(body => {
              console.log("Checking body:", body.name);
              console.log("Body aroundPlanet:", body.aroundPlanet);
              if (body.aroundPlanet && body.aroundPlanet.planet === "mars") {
                  console.log("Found moon of Mars:", body.name);
                  let circles = document.querySelectorAll('.circle');
                  circles.forEach(circle => {
                      if (circle.textContent === body.name) {
                          console.log("Applying moon style to:", circle.textContent);
                          applyMoonStyle(circle);
                      }
                  });
              }
          });
      });

      // to make sure the same thing happens with venus
      document.getElementById("venus-button").addEventListener('click', function(event) {


                    // Remove any existing circles within the display-container div
          
                    const displayContainer = document.querySelector('.display-container');
                    displayContainer.innerHTML = '';
                
                    // to create a circle element
                    const circle = document.createElement('div');
                    circle.classList.add('circle');
                    // to set circle properties
                    circle.style.width = '150px';
                    circle.style.height = '150px';
                    circle.style.backgroundColor = 'orangered';
                    circle.style.alignContent = 'center';
                    // to append the circle to the display-container div
                    displayContainer.appendChild(circle);

          //to replace the text content with data from the object clicked
          document.querySelector(".planetname").textContent = "VENUS";

          fetch("https://api.le-systeme-solaire.net/rest/bodies/venus")
          .then(response => response.json())
          .then(data => {
              const discoveryDate = data.discoveryDate;
              document.querySelector(".discoverdate").textContent = `${discoveryDate}`;
        
              const discoverer = data.discoveredBy;
              document.querySelector(".discoveredby").textContent = `${discoverer}`;

// --------------------additional info

              let englishName = data.englishName;
              let avgTemp = data.avgTemp;
              let axialTilt = data.axialTilt;
              let bodyType = data.bodyType;
              let gravity = data.gravity;
              let mass = data.massValue;
              let radius = data.meanRadius;
            
              
              // Construct the information string with HTML line breaks
              let infoHTML = `<p>English name: ${englishName}</p>`;
              infoHTML += `<p>Average Temperature: ${avgTemp}</p>`;
              infoHTML += `<p>Axial Tilt: ${axialTilt}</p>`;
              infoHTML += `<p>Body Type: ${bodyType}</p>`;
              infoHTML += `<p>Gravity: ${gravity}</p>`;
              infoHTML += `<p>Mass Value: ${mass}</p>`;
              infoHTML += `<p>Mean radius: ${radius}</p>`;
              
              // Set the HTML content of the display container
              document.querySelector(".moondisplay-container").innerHTML = infoHTML;
          })

        console.log("Venus button clicked!");
        console.log("Celestial Bodies:", celestialBodies);
        celestialBodies.forEach(body => {
            if (body.aroundPlanet && body.aroundPlanet.planet === "venus") {
                let circles = document.querySelectorAll('.circle');
                circles.forEach(circle => {
                    console.log("Checking circle:", circle.textContent);
                    if (circle.textContent === body.name) {
                        applyMoonStyle(circle);
                    }
                });
            }
        });
    });

    //same thing with saturne
    document.getElementById("saturn-button").addEventListener('click', function(event) {

            // Remove any existing circles within the display-container div
          
            const displayContainer = document.querySelector('.display-container');
            displayContainer.innerHTML = '';
        
            // to create a circle element
            const circle = document.createElement('div');
            circle.classList.add('circle');
            // to set circle properties
            circle.style.width = '250px';
            circle.style.height = '250px';
            circle.style.backgroundColor = 'orangered';
            circle.style.alignContent = 'center';
            // to append the circle to the display-container div
            displayContainer.appendChild(circle);


                //to replace the text content with data from the object clicked
                document.querySelector(".planetname").textContent = "SATURN";

                fetch("https://api.le-systeme-solaire.net/rest/bodies/saturne")
                .then(response => response.json())
                .then(data => {
                    const discoveryDate = data.discoveryDate;
                    document.querySelector(".discoverdate").textContent = `${discoveryDate}`;
              
                    const discoverer = data.discoveredBy;
                    document.querySelector(".discoveredby").textContent = `${discoverer}`;


              // to display additional info 

              let englishName = data.englishName;
              let avgTemp = data.avgTemp;
              let axialTilt = data.axialTilt;
              let bodyType = data.bodyType;
              let gravity = data.gravity;
              let mass = data.massValue;
              let radius = data.meanRadius;
            
              
              // Construct the information string with HTML line breaks
              let infoHTML = `<p>English name: ${englishName}</p>`;
              infoHTML += `<p>Average Temperature: ${avgTemp}</p>`;
              infoHTML += `<p>Axial Tilt: ${axialTilt}</p>`;
              infoHTML += `<p>Body Type: ${bodyType}</p>`;
              infoHTML += `<p>Gravity: ${gravity}</p>`;
              infoHTML += `<p>Mass Value: ${mass}</p>`;
              infoHTML += `<p>Mean radius: ${radius}</p>`;
              
              // Set the HTML content of the display container
              document.querySelector(".moondisplay-container").innerHTML = infoHTML;



                })


      console.log("Saturn button clicked!");
      console.log("Celestial Bodies:", celestialBodies);
      celestialBodies.forEach(body => {
          if (body.aroundPlanet && body.aroundPlanet.planet === "saturne") {
              console.log("Found moon of Saturn:", body.name);
              let circles = document.querySelectorAll('.circle');
              circles.forEach(circle => {
                  if (circle.textContent === body.name) {
                      applyMoonStyle(circle);
                  }
              });
          }
      });
  });


  // same thing with jupiter 
  document.getElementById("jupiter-button").addEventListener('click', function(event) {


                // Remove any existing circles within the display-container div
          
                const displayContainer = document.querySelector('.display-container');
                displayContainer.innerHTML = '';
            
                // to create a circle element
                const circle = document.createElement('div');
                circle.classList.add('circle');
                // to set circle properties
                circle.style.width = '300px';
                circle.style.height = '300px';
                circle.style.backgroundColor = 'orangered';
                circle.style.alignContent = 'center';
                // to append the circle to the display-container div
                displayContainer.appendChild(circle);


                //to replace the text content with data from the object clicked
                document.querySelector(".planetname").textContent = "JUPITER";

                fetch("https://api.le-systeme-solaire.net/rest/bodies/jupiter")
                .then(response => response.json())
                .then(data => {
                    const discoveryDate = data.discoveryDate;
                    document.querySelector(".discoverdate").textContent = `${discoveryDate}`;
              
                    const discoverer = data.discoveredBy;
                    document.querySelector(".discoveredby").textContent = `${discoverer}`;


              // to display additional info 

              let englishName = data.englishName;
              let avgTemp = data.avgTemp;
              let axialTilt = data.axialTilt;
              let bodyType = data.bodyType;
              let gravity = data.gravity;
              let mass = data.massValue;
              let radius = data.meanRadius;
            
              
              // Construct the information string with HTML line breaks
              let infoHTML = `<p>English name: ${englishName}</p>`;
              infoHTML += `<p>Average Temperature: ${avgTemp}</p>`;
              infoHTML += `<p>Axial Tilt: ${axialTilt}</p>`;
              infoHTML += `<p>Body Type: ${bodyType}</p>`;
              infoHTML += `<p>Gravity: ${gravity}</p>`;
              infoHTML += `<p>Mass Value: ${mass}</p>`;
              infoHTML += `<p>Mean radius: ${radius}</p>`;
              
              // Set the HTML content of the display container
              document.querySelector(".moondisplay-container").innerHTML = infoHTML;



                });


    console.log("Jupiter button clicked!");
    console.log("Celestial Bodies:", celestialBodies);
    celestialBodies.forEach(body => {
        if (body.aroundPlanet && body.aroundPlanet.planet === "jupiter") {
            console.log("Found moon of Jupiter:", body.name);
            let circles = document.querySelectorAll('.circle');
            circles.forEach(circle => {
                if (circle.textContent === body.name) {
                    applyMoonStyle(circle);
                }
            });
        }
    });
});


//repeat for mercury 
document.getElementById("mercury-button").addEventListener('click', function(event) {

              // Remove any existing circles within the display-container div
          
              const displayContainer = document.querySelector('.display-container');
              displayContainer.innerHTML = '';
          
              // to create a circle element
              const circle = document.createElement('div');
              circle.classList.add('circle');
              // to set circle properties
              circle.style.width = '100px';
              circle.style.height = '100px';
              circle.style.backgroundColor = 'orangered';
              circle.style.alignContent = 'center';
              // to append the circle to the display-container div
              displayContainer.appendChild(circle);


                  //to replace the text content with data from the object clicked
                  document.querySelector(".planetname").textContent = "MERCURY";

                  fetch("https://api.le-systeme-solaire.net/rest/bodies/mercury")
                  .then(response => response.json())
                  .then(data => {
                      const discoveryDate = data.discoveryDate;
                      document.querySelector(".discoverdate").textContent = `${discoveryDate}`;
                
                      const discoverer = data.discoveredBy;
                      document.querySelector(".discoveredby").textContent = `${discoverer}`;


              // to display additional info 

              let englishName = data.englishName;
              let avgTemp = data.avgTemp;
              let axialTilt = data.axialTilt;
              let bodyType = data.bodyType;
              let gravity = data.gravity;
              let mass = data.massValue;
              let radius = data.meanRadius;
            
              
              // Construct the information string with HTML line breaks
              let infoHTML = `<p>English name: ${englishName}</p>`;
              infoHTML += `<p>Average Temperature: ${avgTemp}</p>`;
              infoHTML += `<p>Axial Tilt: ${axialTilt}</p>`;
              infoHTML += `<p>Body Type: ${bodyType}</p>`;
              infoHTML += `<p>Gravity: ${gravity}</p>`;
              infoHTML += `<p>Mass Value: ${mass}</p>`;
              infoHTML += `<p>Mean radius: ${radius}</p>`;
              
              // Set the HTML content of the display container
              document.querySelector(".moondisplay-container").innerHTML = infoHTML;




                  });

  console.log("Mercury button clicked!");
  console.log("Celestial Bodies:", celestialBodies);
  celestialBodies.forEach(body => {
      if (body.aroundPlanet && body.aroundPlanet.planet === "mercure") {
          console.log("Found moon of Mercury:", body.name);
          let circles = document.querySelectorAll('.circle');
          circles.forEach(circle => {
              if (circle.textContent === body.name) {
                  applyMoonStyle(circle);
              }
          });
      }
  });
});

//repeat for earth
document.getElementById("earth-button").addEventListener('click', function(event) {


              // Remove any existing circles within the display-container div
          
              const displayContainer = document.querySelector('.display-container');
              displayContainer.innerHTML = '';
          
              // to create a circle element
              const circle = document.createElement('div');
              circle.classList.add('circle');
              // to set circle properties
              circle.style.width = '200px';
              circle.style.height = '200px';
              circle.style.backgroundColor = 'orangered';
              circle.style.alignContent = 'center';
              // to append the circle to the display-container div
              displayContainer.appendChild(circle);

                    //to replace the text content with data from the object clicked
                    document.querySelector(".planetname").textContent = "EARTH";

                    fetch("https://api.le-systeme-solaire.net/rest/bodies/terre")
                    .then(response => response.json())
                    .then(data => {
                        const discoveryDate = data.discoveryDate;
                        document.querySelector(".discoverdate").textContent = `${discoveryDate}`;
                  
                        const discoverer = data.discoveredBy;
                        document.querySelector(".discoveredby").textContent = `${discoverer}`;


              // to display additional info 

              let englishName = data.englishName;
              let avgTemp = data.avgTemp;
              let axialTilt = data.axialTilt;
              let bodyType = data.bodyType;
              let gravity = data.gravity;
              let mass = data.massValue;
              let radius = data.meanRadius;
            
              
              // Construct the information string with HTML line breaks
              let infoHTML = `<p>English name: ${englishName}</p>`;
              infoHTML += `<p>Average Temperature: ${avgTemp}</p>`;
              infoHTML += `<p>Axial Tilt: ${axialTilt}</p>`;
              infoHTML += `<p>Body Type: ${bodyType}</p>`;
              infoHTML += `<p>Gravity: ${gravity}</p>`;
              infoHTML += `<p>Mass Value: ${mass}</p>`;
              infoHTML += `<p>Mean radius: ${radius}</p>`;
              
              // Set the HTML content of the display container
              document.querySelector(".moondisplay-container").innerHTML = infoHTML;



                    });

  console.log("Earth button clicked!");
  console.log("Celestial Bodies:", celestialBodies);
  celestialBodies.forEach(body => {
      if (body.aroundPlanet && body.aroundPlanet.planet === "terre") {
          console.log("Found moon of Earth:", body.name);
          let circles = document.querySelectorAll('.circle');
          circles.forEach(circle => {
              if (circle.textContent === body.name) {
                  applyMoonStyle(circle);
              }
          });
      }
  });
});

//repeat for neptune
document.getElementById("neptune-button").addEventListener('click', function(event) {



              // Remove any existing circles within the display-container div
          
              const displayContainer = document.querySelector('.display-container');
              displayContainer.innerHTML = '';
          
              // to create a circle element
              const circle = document.createElement('div');
              circle.classList.add('circle');
              // to set circle properties
              circle.style.width = '250px';
              circle.style.height = '250px';
              circle.style.backgroundColor = 'orangered';
              circle.style.alignContent = 'center';
              // to append the circle to the display-container div
              displayContainer.appendChild(circle);

  // structured with the help of AI 


  fetch("https://api.le-systeme-solaire.net/rest/bodies/neptune")
  .then(response => response.json())
  .then(data => {
      const discoveryDate = data.discoveryDate;
      document.querySelector(".discoverdate").textContent = `${discoveryDate}`;

      const discoverer = data.discoveredBy;
      document.querySelector(".discoveredby").textContent = `${discoverer}`;



              // to display additional info 

              let englishName = data.englishName;
              let avgTemp = data.avgTemp;
              let axialTilt = data.axialTilt;
              let bodyType = data.bodyType;
              let gravity = data.gravity;
              let mass = data.massValue;
              let radius = data.meanRadius;
            
              
              // Construct the information string with HTML line breaks
              let infoHTML = `<p>English name: ${englishName}</p>`;
              infoHTML += `<p>Average Temperature: ${avgTemp}</p>`;
              infoHTML += `<p>Axial Tilt: ${axialTilt}</p>`;
              infoHTML += `<p>Body Type: ${bodyType}</p>`;
              infoHTML += `<p>Gravity: ${gravity}</p>`;
              infoHTML += `<p>Mass Value: ${mass}</p>`;
              infoHTML += `<p>Mean radius: ${radius}</p>`;
              
              // Set the HTML content of the display container
              document.querySelector(".moondisplay-container").innerHTML = infoHTML;


  })

  //

  console.log("Neptune button clicked!");
  console.log("Celestial Bodies:", celestialBodies);
  celestialBodies.forEach(body => {
      if (body.aroundPlanet && body.aroundPlanet.planet === "neptune") {
          console.log("Found moon of Neptune:", body.name);
          let circles = document.querySelectorAll('.circle');
          circles.forEach(circle => {
              if (circle.textContent === body.name) {
                  applyMoonStyle(circle);
              }
          });
      }
  });
});

//repeat for uranus
document.getElementById("uranus-button").addEventListener('click', function(event) {


              // Remove any existing circles within the display-container div
          
              const displayContainer = document.querySelector('.display-container');
              displayContainer.innerHTML = '';
          
              // to create a circle element
              const circle = document.createElement('div');
              circle.classList.add('circle');
              // to set circle properties
              circle.style.width = '250px';
              circle.style.height = '250px';
              circle.style.backgroundColor = 'orangered';
              circle.style.alignContent = 'center';
              // to append the circle to the display-container div
              displayContainer.appendChild(circle);


  // when planet is clicked, a new circle  is generated

                      //to replace the text content with data from the object clicked
                      document.querySelector(".planetname").textContent = "URANUS";

                      fetch("https://api.le-systeme-solaire.net/rest/bodies/uranus")
                      .then(response => response.json())
                      .then(data => {
                          const discoveryDate = data.discoveryDate;
                          document.querySelector(".discoverdate").textContent = `${discoveryDate}`;
                    
                          const discoverer = data.discoveredBy;
                          document.querySelector(".discoveredby").textContent = `${discoverer}`;



              // to display additional info 

              let englishName = data.englishName;
              let avgTemp = data.avgTemp;
              let axialTilt = data.axialTilt;
              let bodyType = data.bodyType;
              let gravity = data.gravity;
              let mass = data.massValue;
              let radius = data.meanRadius;
            
              
              // Construct the information string with HTML line breaks
              let infoHTML = `<p>English name: ${englishName}</p>`;
              infoHTML += `<p>Average Temperature: ${avgTemp}</p>`;
              infoHTML += `<p>Axial Tilt: ${axialTilt}</p>`;
              infoHTML += `<p>Body Type: ${bodyType}</p>`;
              infoHTML += `<p>Gravity: ${gravity}</p>`;
              infoHTML += `<p>Mass Value: ${mass}</p>`;
              infoHTML += `<p>Mean radius: ${radius}</p>`;
              
              // Set the HTML content of the display container
              document.querySelector(".moondisplay-container").innerHTML = infoHTML;



                      });
                      

  console.log("Uranus button clicked!");
  console.log("Celestial Bodies:", celestialBodies);
  celestialBodies.forEach(body => {
      if (body.aroundPlanet && body.aroundPlanet.planet === "uranus") {
          console.log("Found moon of Uranus:", body.name);
          let circles = document.querySelectorAll('.circle');
          circles.forEach(circle => {
              if (circle.textContent === body.name) {
                  applyMoonStyle(circle);
              }
          });
          
      }

      
  });
});

        // to fill into the circles that are planets
        if (planetBodies.includes(body)) {
            applySelectedStyle(selectedCircle);
          }


        columns[columnIndex].appendChild(section.cloneNode(true));
      });
    });

    console.log(planetBodies);
});


// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to apply selected style to circles representing planets
function applySelectedStyle(selectedCircle) {
    selectedCircle.style.backgroundColor = 'orangered';
    
  }

  function applyMoonStyle(selectedCircle) {
    selectedCircle.style.backgroundColor = 'blue';
  }





