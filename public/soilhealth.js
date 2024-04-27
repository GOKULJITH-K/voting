// This example adds a map using web components.
function Center(){
 

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        
          const lat =  position.coords.latitude;
          const lng = position.coords.longitude;
          
        const map= document.getElementById("marker-click-event-example");
        const currentlocation= document.getElementById("current-location");
        map.setAttribute("center",` ${lat} , ${lng}`);
        currentlocation.setAttribute("position",`${lat},${lng}`);
        

        
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      },
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}


function initMap() {

    

    console.log("Maps JavaScript API loaded.");
    
    
    const advancedMarkers = document.querySelectorAll(
      "#marker-click-event-example gmp-advanced-marker",
    );
  
    for (const advancedMarker of advancedMarkers) {
      customElements.whenDefined(advancedMarker.localName).then(async () => {
        advancedMarker.addEventListener("gmp-click", async () => {
          const infoWindow = new google.maps.InfoWindow({
            //@ts-ignore
            content: advancedMarker.title,
            
          });
  
          infoWindow.open({
            //@ts-ignore
            anchor: advancedMarker,
          });
        });
      });
    }
    
  
  }
  
  
  window.initMap = initMap;