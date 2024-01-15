$(document).ready(executeScripts);

const checkeds = new Set();
let clicks = 0;
let amenities = [];

function executeScripts () {
  alert('Document Ready');
  apiStatus();
  fetchPlaces();
  getAmenity();
  getPlaceByAmenityBtn();
}

function apiStatus () {
  $.get('http://0.0.0.0:5001/api/v1/status/', (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
 });
}

function fetchPlaces (amenities=null) {
  data = (amenities) ? JSON.stringify({amenities}) : JSON.stringify({});
  if (amenities) { console.log(data); }
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
    success: (data) => {
      $.each(data, (index, place) => {
        const htmlContent = `
          <article>
            <div class="title_box">
              <h2> ${place.name} </h2>
                <div class="price_by_night">  ${place.price_by_night} </div>
            </div>
            <div class="information">
              <div class="max_guest"> ${place.max_guest} Guests</div>
              <div class="number_rooms"> ${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">  ${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
        `;
        $('section.places').append(htmlContent);
      });
    }
  });
}



function getAmenity () {
  alert('Get Amenity Test success');
  $('input[type="checkbox"]').click((event) => {
    clicks++;
    const text = $('div.amenities h4').text();
    const name = event.target.dataset.name;
    let nameArray;

    if (event.target.checked) {
      checkeds.add(event.target.dataset.id);
      nameArray = text.split(', ');
      if (clicks === 1) { nameArray.length = 0; }
      nameArray.push(name);
      $('div.amenities h4').text(nameArray.join(', '));
    } else {
      checkeds.delete(event.target.dataset.id);
      const mainName = $('div.amenities h4').text();
      const nameSet = new Set(mainName.split(', '));
      nameSet.delete(name);
      nameArray = Array.from(nameSet);
      $('div.amenities h4').text(nameArray.join(', '));
    }
    console.log(nameArray);
    console.log(checkeds);
  });
}

function getPlaceByAmenityBtn () {
	alert('getPlaceByAmenityBtn test Successful');
	$("button").click(() => {
		console.log(`Search Button Clicked ${Array.from(checkeds)}`);
		fetchPlaces(Array.from(checkeds));
	});
}
