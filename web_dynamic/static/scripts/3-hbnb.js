$(document).ready(executeScripts);

function executeScripts () {
  apiStatus();
  fetchPlaces();
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

function fetchPlaces () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
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
