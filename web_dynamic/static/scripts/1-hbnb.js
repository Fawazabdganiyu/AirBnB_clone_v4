$(document).ready(() => {
  const checkeds = new Set();
  let clicks = 0;
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
});
