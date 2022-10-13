(() => {
	const selectorsAll = [
		'.sc-button-more',
		'.sc-button-addtoset',
		'.addToPlaylistButton[title=""]',
		'button[title="Close"]',
	];
	
	addToPlaylist(selectorsAll);

	function addToPlaylist (_selectors) {
		const selectors = [..._selectors];

		selecting(selectors.shift())
			.then(element => {
				element.click();

				if (selectors.length) {
					addToPlaylist(selectors);
				} else {
					//document.querySelector('.badgeList__item').remove();
					const item = document.querySelectorAll('.badgeList__item'); //reverse order
					item [item.length -1].remove();	//reverse order
					setTimeout(() => addToPlaylist([...selectorsAll]), 500);
				}
			})
			.catch(err => {
				console.error('Something went wrong!');
				console.trace(err);
			});
	}

	function selecting (selector) {
		return new Promise((resolve, reject) => {
			const pooling = setInterval(() => {
				//const element = document.querySelector(selector);
				const elements = document.querySelectorAll(selector); //reverse order
				const element = elements[elements.length - 1]; //reverse order
				if (element) {
					resolve(element);
				}
			}, 100);

			setTimeout(() => {
				clearInterval(pooling);
				reject();
			}, 5000);
		});
	}
})();
