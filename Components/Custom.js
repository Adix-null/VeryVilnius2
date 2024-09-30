class PCNavbar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		fetch("/Components/pc-nav.html")
			.then((response) => response.text())
			.then((text) => (this.innerHTML = text));
	}
}
customElements.define("navbar-component-pc", PCNavbar);

class PhoneNavbar extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		fetch("/Components/phone-nav.html")
			.then((response) => response.text())
			.then((text) => (this.innerHTML = text));
	}
}
customElements.define("navbar-component-phone", PhoneNavbar);

class Language extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		//Not a perfect solution
		var path = this.getAttribute("src").toString().slice(0, -7); // removes en.html from string
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

//Does not work
// class Photosphere extends HTMLElement{
//     constructor(){
//         super();
//     }

//     connectedCallback(){
//         this.innerHTML = `
//         <script defer>
//             const viewer = new PhotoSphereViewer.Viewer({
//                 navbar:[
//                     'zoom',
//                     'fullscreen',
//                 ],
//                 container: document.querySelector('#${this.getAttribute("id")}'),
//                 panorama: "${this.getAttribute("src")}",
//             });
//         </script>
//         
//     }
// }
// customElements.define("photosphere-script", Photosphere);

function ToggleOptions(Name, element) {
	var doc = document.getElementById(Name);
	const upArr = "\u02C4"; //^
	const dwArr = "\u02C5"; //v
	//toggle arrow
	element.innerHTML = element.innerHTML
		.slice(0, -1).concat(element.innerHTML.slice(-1) === upArr ? dwArr : upArr);
	//toggle display
	doc.style.display =
		doc.style.display == "none" || doc.style.display == "" ? "block" : "none";
}

function ToggleNav(elm) {
	const rgArr = "\u02C3"; //>
	const lfArr = "\u02C2"; //<
	if (elm.textContent === lfArr) {
		elm.innerHTML = rgArr;
		elm.style.left = "50px";
		document.querySelector(".navbar.phone").style.display = "none";
	} else {
		elm.innerHTML = lfArr;
		elm.style.left = "calc(60vw + 20px)";
		document.querySelector(".navbar.phone").style.display = "block";
		document.querySelector(".navbar.phone").style.minWidth = "60vw";
	}
}


	function HighlightNav () {
	document.querySelectorAll(".animation-hover, .dropdown.phone").forEach(e => {
		e.style.backgroundColor = "initial";
	});

	document.querySelectorAll('.dropdown-content.pc > a').forEach(element => {
		if (element.href === location.href) {			
			element.parentElement.parentElement.style.backgroundColor = "var(--blue)";
			element.style.backgroundColor = "var(--blue)";
			element.style.color = "var(--white)";
		}
	});
	document.querySelectorAll('.animation-hover > a, .dropdown.phone > a').forEach(element => {
		if (element.href === location.href) {			
			element.parentElement.style.backgroundColor = "var(--blue)";
		}
	});

	document.querySelectorAll('.dropdown-content.phone > a').forEach(element => {
		if (element.href === location.href) {			
			element.parentElement.parentElement.firstElementChild.style.backgroundColor = "var(--blue)";
			element.style.backgroundColor = "var(--blue)";
		}
	});
}

window.onload = HighlightNav;