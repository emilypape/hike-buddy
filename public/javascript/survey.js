// const { status } = require("express/lib/response")

// Gets user's location
function geoLocation() {
 const locationName = document.querySelector('#location-name')

 function success(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  
  var requestOptions = {
   method: 'GET',
 };
 // using lat and lon to display user's location
 fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=city&apiKey=c0d119700de947649bd1be37cbfa6530`, requestOptions)
   .then(response => response.json())
   .then(result => {
    if (result.features.length) {
     locationName.textContent = result.features[0].properties.formatted 
    } else {
     locationName.textContent = "No location found"
    }
   })
   .catch(error => console.log('error', error));
 }

 function error() {
  status.textContent = "Could not get your location"
 }

 if (!navigator.geolocation) {
  locationName.textContent = "Could not retrieve location"
 } else {
  navigator.geolocation.getCurrentPosition(success, error)
 }
}
// event listener to run function
document.querySelector('#find-me').addEventListener('click', geoLocation)

// function to handle survey page
async function surveyHandler(event) {
 event.preventDefault()
// variables to access the individual questions' values
const survey = document.getElementById('survey')
const gender = document.querySelector('#gender').value
const genderPreference = document.querySelector('#gender-preference').value
const hikeDistance = document.querySelector('#hike-distance').value
const hikePace = document.querySelector('#hike-pace').value
const withPet = document.querySelector('#with-pet').value
const hikeClimate = document.querySelector('#hike-climate').value
const hikeSnow = document.querySelector('#hike-snow').value
const waterFeature = document.querySelector('#water-feature').value
const peaks = document.querySelector('#peaks').value
const specialEquipment = document.querySelector('#special-equipment').value
const location = document.querySelector('#location-name').value
// Making sure all questions are answered
 if (gender && genderPreference && hikeDistance && hikePace && withPet && hikeClimate && waterFeature && peaks && specialEquipment) {
  const response = await fetch('/api/preferences', {
   method: 'POST',
   body: JSON.stringify({
    // user_id: req.session.user_id,
    location_name: location,
    gender_identification: gender,
    gender_preference: genderPreference,
    hike_distance: hikeDistance,
    hike_pace: hikePace,
    hike_with_pet: withPet,
    hike_climate: hikeClimate,
    hike_in_snow: hikeSnow,
    water_feature: waterFeature,
    mountain_peak: peaks,
    special_equipment: specialEquipment
   }),
   headers: { 'Content-Type': 'application/json'}
  })
  if (response.ok) {
   console.log(gender)
   //document.location.replace(`/users/${user_id}`)
  }
  else {
   alert(response.statusText)
  }
 }
 
}

document.getElementById('survey').addEventListener('submit', surveyHandler)

