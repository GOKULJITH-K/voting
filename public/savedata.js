function initMap() {
    const myLatlng = { lat: 11.8309  , lng:  75.4372 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 18,
      center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to Mark the plot",
      position: myLatlng,
    });
  
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
    
        // Get latitude and longitude separately
        const latitude = mapsMouseEvent.latLng.lat();
        const longitude = mapsMouseEvent.latLng.lng();
    
        // Format latitude and longitude as decimal degrees
        const formattedLatLng = latitude.toFixed(7) + ", " + longitude.toFixed(7);
        document.getElementById("coordinates").textContent = "Coordinates: " + formattedLatLng;
        document.getElementById("coordinateValue").value = formattedLatLng;
        // Display formatted latitude and longitude
        const content = "Coordinates: " + formattedLatLng;
        infoWindow.setContent(content);
        infoWindow.open(map);
    });
    document.getElementById("coordinateValue").value = "0,0";
  }
  
  
  window.initMap = initMap;