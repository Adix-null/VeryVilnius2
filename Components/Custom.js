// Apply saved theme immediately to avoid flash on dark-mode preference
;(function () {
	document.documentElement.dataset.theme = localStorage.getItem('vv-theme') || 'light';
})();

class PCNavbar extends HTMLElement {
	connectedCallback() {
		fetch("/Components/pc-nav.html")
			.then((r) => r.text())
			.then((html) => {
				this.innerHTML = html;
				HighlightNav();
			});
	}
}
customElements.define("navbar-component-pc", PCNavbar);

class PhoneNavbar extends HTMLElement {
	connectedCallback() {
		fetch("/Components/phone-nav.html")
			.then((r) => r.text())
			.then((html) => {
				this.innerHTML = html;
				HighlightNav();
			});
	}
}
customElements.define("navbar-component-phone", PhoneNavbar);

class Language extends HTMLElement {
	connectedCallback() {
		var path = this.getAttribute("src").toString().slice(0, -7);
		this.innerHTML = `
        <div class="language-container">
            <a href="${path.concat("en.html")}"> 🇬🇧 | </a>
            <a href="${path.concat("ru.html")}"> 🇷🇺 |</a>
            <a href="${path.concat("lt.html")}"> 🇱🇹 </a>
        </div>
        `;
	}
}
customElements.define("language-select", Language);

/* ── Theme ────────────────────────────────────────────────────── */

function toggleTheme() {
	const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
	document.documentElement.dataset.theme = next;
	localStorage.setItem('vv-theme', next);
}

/* ── Phone nav ────────────────────────────────────────────────── */

function ToggleOptions(name, element) {
	const doc = document.getElementById(name);
	const upArr = "˄";
	const dwArr = "˅";
	element.innerHTML = element.innerHTML
		.slice(0, -1)
		.concat(element.innerHTML.slice(-1) === upArr ? dwArr : upArr);
	doc.style.display =
		doc.style.display === "none" || doc.style.display === "" ? "block" : "none";
}

function ToggleNav() {
	const nav     = document.querySelector(".navbar.phone");
	const btn     = document.getElementById("side-btn");
	const overlay = document.getElementById("nav-overlay");
	const isOpen  = nav && nav.style.display === "flex";

	if (isOpen) {
		if (nav)     nav.style.display = "none";
		if (btn)     btn.textContent   = "☰";
		if (overlay) overlay.style.display = "none";
	} else {
		if (nav)     nav.style.display = "flex";
		if (btn)     btn.textContent   = "✕";
		if (overlay) overlay.style.display = "block";
	}
}

/* ── Active nav highlight ─────────────────────────────────────── */

function HighlightNav() {
	document.querySelectorAll(".nav-active").forEach((el) => el.classList.remove("nav-active"));

	// PC: dropdown sub-items
	document.querySelectorAll('.dropdown-content.pc > a').forEach((el) => {
		if (el.href === location.href) {
			el.parentElement.parentElement.classList.add("nav-active");
			el.classList.add("nav-active");
		}
	});
	// PC: top-level links
	document.querySelectorAll('.animation-hover > a').forEach((el) => {
		if (el.href === location.href) {
			el.parentElement.classList.add("nav-active");
		}
	});
	// Phone: top-level links
	document.querySelectorAll('.dropdown.phone > a').forEach((el) => {
		if (el.href === location.href) {
			el.parentElement.classList.add("nav-active");
		}
	});
	// Phone: dropdown sub-items
	document.querySelectorAll('.dropdown-content.phone > a').forEach((el) => {
		if (el.href === location.href) {
			el.parentElement.parentElement.firstElementChild.classList.add("nav-active");
			el.classList.add("nav-active");
		}
	});
}

document.querySelectorAll('.expandable').forEach((section) => {
	section.addEventListener('click', () => {
		section.querySelector('.content').classList.toggle('open');
	});
});

function initPhotosphereHints() {
	document.querySelectorAll('.Photosphere-container').forEach(function (container) {
		var hint = container.querySelector('.photosphere-hint');
		if (!hint) return;

		function fadeHint() {
			hint.classList.add('fade-out');
			setTimeout(function () { hint.remove(); }, 650);
		}

		var timer = setTimeout(fadeHint, 4500);

		container.addEventListener('pointerdown', function () {
			clearTimeout(timer);
			fadeHint();
		}, { once: true });
	});
}

window.onload = function () {
	HighlightNav();
	initPhotosphereHints();
};
