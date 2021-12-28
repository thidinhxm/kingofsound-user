(function($) {

	const checkboxes = $('.group-checkbox .checkall input').toArray();
	checkboxes.forEach(function(item) {
		$(item).change(function() {
			if ($(this).prop('checked')) {
				$(this).closest('.group-checkbox').find('input').prop('checked', true);
			} else {
				$(this).closest('.group-checkbox').find('input').prop('checked', false);
			}
		});
	});
	const urlParams = new URLSearchParams(window.location.search);

	let params = {
		page: 1,
		min: 100,
		max: 10000,
		limit: 9,
		categories: '',
		brands: '',
		sort: '',
		search: ''
	}

	for (let key in params) {
      if (!urlParams.has(key)) {
        urlParams.append(key, params[key])
      }
    }

	$(document).ready(function() {
		const checkboxes = ['categories', 'brands'];
		for (let key of checkboxes) {
			if (urlParams.has(key)) {
				const values = urlParams.get(key);
				if (values) {
					for (let value of values.split(',')) {
						$(`input[name=${key}][value=${value}]`).prop('checked', true);
					}
				}

			}
		}

		$('#limit').val(urlParams.get('limit'));
		$('#sort').val(urlParams.get('sort'));

		const savePage = urlParams.get('page');
		$('#pagination li a').each((index, item) => {
			const page = $(item).attr('href').split('=')[1]
			urlParams.set('page', page)
			const href = '/products?' + urlParams.toString()
			$(item).attr('href', href)
		})
		urlParams.set('page', savePage)
	});

	$('input[name=categories]').change(function() {
		let categories = [];
		$('input[name=categories]:checked').each(function() {
			categories.push($(this).val());
		});
		urlParams.set('categories', categories.join(','));
		urlParams.set('page', 1);
		window.location.search = urlParams.toString();
	});
	
	$('input[name=brands]').change(function() {
		let brands = [];
		$('input[name=brands]:checked').each(function() {
			brands.push($(this).val());
		});
		urlParams.set('brands', brands.join(','));
		urlParams.set('page', 1);
		window.location.search = urlParams.toString();
	});

	$('#sort').change(function() {
		urlParams.set('sort', $(this).val());
		urlParams.set('page', 1);
		window.location.search = urlParams.toString();
	});

	$('.search-btn').click(function() {
		urlParams.set('search', $(this).val());
		urlParams.set('page', 1);
		window.location.search = urlParams.toString();
	});

	$('#limit').change(function() {
		urlParams.set('limit', $(this).val());
		urlParams.set('page', 1);
		window.location.search = urlParams.toString();
	});

	function changePrice(key, value) {
		urlParams.set(key, value)
		urlParams.set('page', 1);
		window.location.search = urlParams.toString();
    }

	"use strict"

	// Mobile Nav toggle
	$('.menu-toggle > a').on('click', function (e) {
		e.preventDefault();
		$('#responsive-nav').toggleClass('active');
	})

	// Fix cart dropdown from closing
	$('.cart-dropdown').on('click', function (e) {
		e.stopPropagation();
	});

	/////////////////////////////////////////

	// Products Slick
	$('.products-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			responsive: [{
	        breakpoint: 991,
	        settings: {
	          slidesToShow: 2,
	          slidesToScroll: 1,
	        }
	      },
	      {
	        breakpoint: 480,
	        settings: {
	          slidesToShow: 1,
	          slidesToScroll: 1,
	        }
	      },
	    ]
		});
	});

	// Products Widget Slick
	$('.products-widget-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});

	/////////////////////////////////////////

	// Product Main img Slick
	$('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs',
  });

	// Product imgs Slick
  $('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
    asNavFor: '#product-main-img',
		responsive: [{
        breakpoint: 991,
        settings: {
					vertical: false,
					arrows: false,
					dots: true,
        }
      },
    ]
  });

	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}

	/////////////////////////////////////////

	// Input number
	$('.input-number').each(function() {
		var $this = $(this),
		$input = $this.find('input[type="number"]'),
		up = $this.find('.qty-up'),
		down = $this.find('.qty-down');

		down.on('click', function () {
			var value = parseInt($input.val()) - 10;
			value = value < 100 ? 100 : value;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})

		up.on('click', function () {
			var value = parseInt($input.val()) + 10;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})
	});

	const priceInputMax = document.getElementById('price-max');
	const priceInputMin = document.getElementById('price-min');

	if (priceInputMax) {
		priceInputMax.addEventListener('change', function(){
			updatePriceSlider($(this).parent() , this.value)
		});
	}

	if (priceInputMin) {
		priceInputMin.addEventListener('change', function(){
			updatePriceSlider($(this).parent() , this.value)
		});
	}


	function updatePriceSlider(elem , value) {
		if ( elem.hasClass('price-min') ) {
			console.log('min')
			priceSlider.noUiSlider.set([value, null]);
		} else if ( elem.hasClass('price-max')) {
			console.log('max')
			priceSlider.noUiSlider.set([null, value]);
		}
	}

	// Price Slider
	var priceSlider = document.getElementById('price-slider');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [urlParams.get('min'), urlParams.get('max')],
			connect: true,
			step: 10,
			range: {
				'min': 100,
				'max': 10000
			}
		});

		priceSlider.noUiSlider.on('update', function( values, handle ) {
			const value = values[handle];
			handle ? priceInputMax.value = value : priceInputMin.value = value
		});

		priceSlider.noUiSlider.on('end', function( values, handle ) {
			const value = values[handle];
			const keys = ['min', 'max'];
			changePrice(keys[handle], value);
		});
	}

	const current_page_URL = location.href;
	$( "a" ).each(function() {
		if ($(this).attr("href") !== "#") {
			let target_URL = $(this).prop("href");
			if (target_URL == current_page_URL) {
				$('nav a').parents('li, ul').removeClass('active');
				$(this).parent('li').addClass('active');
				return false;
			}
		}
	});



	
})(jQuery);



