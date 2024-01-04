// Most of the good stuff happens here
const bloodBankData = [
  { name: "Red Cross - Malabon", 
      lat: 14.673136842947024, lng: 120.98702039972662,
      address: "Gov. Pascual Ave, Potrero, Malabon, 1475"}, 
  { name: "Philippine Heart Center - East Avenue", 
      lat: 14.644973728923008, lng: 121.04650514835683,
      address: "Mezzanine, New Medical Arts Building Annex, Philippine Heart Center, East Avenue, Quezon City"}, 
  { name: "Red Cross - Marikina", 
      lat: 14.648502860099297, lng: 121.12957100447329,
      address: "6th St, Marikina, 1800"},
  { name: "San Lazaro Hospital - Manila", 
      lat: 14.614021257810409, lng: 120.98207424480572,
      address: "Quiricada St, Santa Cruz, Manila, 1003"}, 
  { name: "Red Cross - Mandaluyong", 
      lat: 14.572114290748177,  lng: 121.04658085792998,
      address: "37 EDSA, corner Boni Ave, Mandaluyong, 1550"},
  { name: "Red Cross - San Juan", 
      lat: 14.606348038078854,  lng: 121.03014402542044, 
      address: "P1 Col. Bonny Serrano Ave, San Juan, 1500"},
  { name: "Red Cross - Makati", 
      lat: 14.558005271045849,  lng: 121.0072461533042,
      address: "Dian St, Makati, Metro Manila"},
  { name: "Red Cross - Pasay", 
      lat: 14.54023492452279,  lng: 121.00610581463143,
      address: "2345 Aurora Blvd, 190, Pasay, 1300"}, 
  { name: "University of Perpetual Help System - Las Piñas", 
      lat: 14.453000518006021, lng: 120.99368156077617,
      address: "University of Perpetual Help System, Alabang-Zapote Road, Las Piñas, 1740"},
  // Add more blood bank data here
];

export function initMap() {
  const myLatLng = { lat: 14.602299563459118, lng: 121.03637304460855 };
  const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: myLatLng,
  });
 
  // Markers V.1
  bloodBankData.forEach((bloodBank) => {
    new google.maps.Marker({
      position: { lat: bloodBank.lat, lng: bloodBank.lng },
      map: map,
      title: bloodBank.name,
    });
  }); 

  const bloodBankListItems = document.getElementById('bloodbank-list-items');

  bloodBankData.forEach((bloodBank, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<strong>${bloodBank.name}</strong><br>${bloodBank.address}`;
      listItem.classList.add('mapList');

      // When a blood bank is clicked, pan to its location on the map.
      listItem.addEventListener('click', () => {
          map.panTo({ lat: bloodBank.lat, lng: bloodBank.lng });
          map.setZoom(15);
      });

      bloodBankListItems.appendChild(listItem);
  });
}



export function webMap() {
        window.initMap = initMap
    };
