(function () {
	'use strict';

	// 1. Remove preload class for smooth background fade-in
	window.addEventListener('load', function () {
		setTimeout(function () {
			document.body.classList.remove('is-preload');
		}, 100);
	});

	// 2. Mobile Navigation Drawer
	var mobileToggle = document.getElementById('mobile-menu-toggle');
	var mobileMenu = document.getElementById('mobile-menu');

	if (mobileToggle && mobileMenu) {
		mobileToggle.addEventListener('click', function () {
			var isOpen = mobileMenu.classList.toggle('open');
			mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});

		mobileMenu.querySelectorAll('a').forEach(function (link) {
			link.addEventListener('click', function () {
				mobileMenu.classList.remove('open');
				mobileToggle.setAttribute('aria-expanded', 'false');
			});
		});
	}

	// 3. Pre-select Service Dropdown When Clicking a Service Card Quote Link
	var serviceSelect = document.getElementById('quote-service');
	document.querySelectorAll('[data-service]').forEach(function (trigger) {
		trigger.addEventListener('click', function () {
			var desiredService = trigger.getAttribute('data-service');
			if (serviceSelect && desiredService) {
				for (var i = 0; i < serviceSelect.options.length; i++) {
					if (serviceSelect.options[i].value === desiredService) {
						serviceSelect.selectedIndex = i;
						break;
					}
				}
			}
		});
	});

	// 4. Portfolio Category Filtering
	var filterButtons = document.querySelectorAll('.filter-btn');
	var portfolioItems = document.querySelectorAll('.portfolio-item');

	filterButtons.forEach(function (btn) {
		btn.addEventListener('click', function () {
			var filter = btn.getAttribute('data-filter');

			filterButtons.forEach(function (b) {
				b.classList.remove('active');
			});
			btn.classList.add('active');

			portfolioItems.forEach(function (item) {
				var category = item.getAttribute('data-category');
				if (filter === 'all' || category === filter) {
					item.classList.remove('hidden');
				} else {
					item.classList.add('hidden');
				}
			});
		});
	});

	// 5. Portfolio Image Lightbox
	var lightbox = document.getElementById('lightbox');
	var lightboxImg = document.getElementById('lightbox-img');
	var lightboxCaption = document.getElementById('lightbox-caption');
	var lightboxClose = document.querySelector('.lightbox-close');

	function closeLightbox() {
		if (!lightbox) return;
		lightbox.classList.remove('active');
		lightbox.setAttribute('aria-hidden', 'true');
		if (lightboxImg) lightboxImg.src = '';
	}

	document.querySelectorAll('.lightbox-trigger').forEach(function (item) {
		item.addEventListener('click', function () {
			var img = item.querySelector('img');
			if (!img || !lightbox || !lightboxImg) return;

			lightboxImg.src = img.getAttribute('src');
			lightboxImg.alt = img.getAttribute('alt') || '';
			if (lightboxCaption) {
				lightboxCaption.textContent = item.getAttribute('data-caption') || '';
			}
			lightbox.classList.add('active');
			lightbox.setAttribute('aria-hidden', 'false');
		});
	});

	if (lightboxClose) {
		lightboxClose.addEventListener('click', closeLightbox);
	}

	if (lightbox) {
		lightbox.addEventListener('click', function (e) {
			if (e.target === lightbox) closeLightbox();
		});
	}

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			closeLightbox();
			if (mobileMenu && mobileMenu.classList.contains('open')) {
				mobileMenu.classList.remove('open');
				if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
			}
		}
	});

	// 6. FAQ Accordion
	document.querySelectorAll('.faq-question').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var parentItem = btn.closest('.faq-item');
			var isOpen = parentItem.classList.contains('open');

			document.querySelectorAll('.faq-item').forEach(function (item) {
				item.classList.remove('open');
				var q = item.querySelector('.faq-question');
				if (q) q.setAttribute('aria-expanded', 'false');
			});

			if (!isOpen) {
				parentItem.classList.add('open');
				btn.setAttribute('aria-expanded', 'true');
			}
		});
	});
})();