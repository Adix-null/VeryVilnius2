class PCNavbar extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
    fetch('/Components/pc-nav.html').then(response => response.text()).then(text => this.innerHTML = text);
    }
}
customElements.define("navbar-component-pc", PCNavbar);

class PhoneNavbar extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
    fetch('/Components/phone-nav.html').then(response => response.text()).then(text => this.innerHTML = text);
    }
}
customElements.define("navbar-component-phone", PhoneNavbar);

class Language extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        //Not a perfect solution
        var path = this.getAttribute("src").toString().slice(0, -7); // removes en.html from string
        this.innerHTML = `
        <div class="language-container">
            <a href="${path.concat("en.html")}"> EN | </a>
            <a href="${path.concat("ru.html")}"> RU |</a>
            <a href="${path.concat("lt.html")}"> LT </a>
        </div>
        `
    }
}
customElements.define("language-select", Language);


function ToggleOptions(Name, element){
    var doc = document.getElementById(Name);
    const upArr = '\u02C4';//^
    const dwArr = '\u02C5';//v
    //toggle arrow
    element.innerHTML = element.innerHTML.slice(0,-1).concat(element.innerHTML.slice(-1)===upArr ? dwArr : upArr);
    //toggle display
    doc.style.display = (doc.style.display=="none"|| doc.style.display=="") ? "block" : "none";
}