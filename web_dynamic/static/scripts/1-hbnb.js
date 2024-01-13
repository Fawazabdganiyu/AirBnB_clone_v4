$(document).ready(() => {
        const checkeds = new Set();
	let clicks = 0;
        $('input[type="checkbox"]').click((event) => {
		clicks++;
		const text = $("div.amenities h4").text();
		const name = event.target.dataset.name;

		if (event.target.checked) { 
			checkeds.add(event.target.dataset.id);
			const main_name = $("div.amenities h4").text();
			name_array = main_name.split(', ');
			if (clicks === 1) { name_array = [] }
			name_array.push(name);
			$("div.amenities h4").text(name_array.join(', '));
		} else {
			checkeds.delete(event.target.dataset.id);
			const main_name = $("div.amenities h4").text();
			const name_set = new Set(main_name.split(', '));
			name_set.delete(name);
			name_array = Array.from(name_set);
			$("div.amenities h4").text(name_array.join(', '));
		}
		console.log(name_array);
		console.log(checkeds);
	});
});
