// Events

window.onload = function() {
    getPage();
    checkCookies();
}

window.onresize = function() {
    responsive();
}

window.onscroll = function() {
	if (window.scrollY > 100) {
        document.getElementById('top').style.opacity = 1;
        document.getElementById('categories').style.display = 'none';
        // document.getElementById('popup').style.display = 'none';
    } else {
		document.getElementById('top').style.opacity = 0;
    }
}

// Functions

function getPage() {
    var fullPage = ['header', 'content', 'footer'];
    fullPage.forEach(function(value) {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'pages/' + value + '.html'); // Prepara la llamada
        ajax.send(); // Hace la petición

        // Corregir la asincronía
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                document.getElementById('container').style.display = 'none';
                document.getElementById(value).innerHTML = ajax.responseText; // Obtiene la respuesta
                                
                if (value.toLowerCase() == 'header') {
                    responsive();
                    document.getElementById('container').style.display = 'block';
                } else if (localStorage.getItem('page')) {
                    getContent(localStorage.getItem('page').split('/')[1])
                } else {
                    document.getElementById('container').style.display = 'block';
                } 
            }
        };
    });
}

function getContent(page) { 
    var contentName = page ? page == 'Home' ? 'Content' : page : event.type == 'click' ? event.currentTarget.getAttribute('value') : 'Content'; 
    var ajax = new XMLHttpRequest(); 
    ajax.open('GET', 'pages/' + contentName + '.html'); // Prepara la llamada
    ajax.send(); // Hace la petición

    // Corregir la asincronía
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById('spinner').style.display = 'none'; // Spinner
            window.history.pushState(null, null, contentName == 'Content' ? 'Home' : contentName); // pushState: cambia la url del navegador sin tener que resfrescar
            document.title = contentName == 'Content' ? 'Home' : contentName;
            document.getElementById('content').innerHTML = ajax.responseText; // Obtiene la respuesta
            for (i = 0; i < document.getElementsByClassName('img').length; i++) {
                document.getElementsByClassName('img')[i].onclick = function() {
                    getPopUp();
                }
            }
        } else {
            document.getElementById('content').innerHTML = ''; 
            document.getElementById('spinner').style.display = 'block'; 
        }
    
    }
};

function hideShare(){
    document.getElementById('share').style.display = "none";
}
function genres() {
    document.getElementById('categories').style.display = 'block';
} 
function hideGenres() {
    document.getElementById('categories').style.display = 'none';
}

function hamburger() {
    document.getElementById('hamburger').style.display = 'block';
}


function hideHamburger(){
    document.getElementById('hamburger').style.display = 'none';
}

// PopUp Ver o Comprar
function getPopUp() {
    for (var i = 0; i < document.getElementsByClassName('img').length; i++) {
        document.getElementsByClassName('img')[i].style.opacity = '';
        document.getElementsByClassName('img')[i].style.transform = '';
    }
    var image = event.currentTarget;
    image.style.opacity = 1;
    image.style.transform = 'scale(1.15)';
    document.getElementById('name').innerHTML = image.getAttribute('name');
    document.getElementById('imgSrc').src = image.getAttribute('src');
    document.getElementById('desc').innerHTML = image.getAttribute('desc');
    document.getElementById('watch').innerHTML = 'Ver ' + image.getAttribute('name');
    document.getElementById('buy').innerHTML = 'Comprar ' + image.getAttribute('name');
    document.getElementById('watch').onclick = function() {
        window.open(image.getAttribute('watch'));
    }
    document.getElementById('buy').onclick = function() {
        window.open(image.getAttribute('buy'));
    }
    document.getElementById('popup').style.display = 'block';
}

// Close PopUp
function closePopUp() {
    document.getElementById('popup').style.display = 'none';
    for (var i = 0; i < document.getElementsByClassName('img').length; i++) {
        document.getElementsByClassName('img')[i].style.opacity = '';
        document.getElementsByClassName('img')[i].style.transform = '';
    }
}

// Login
function getLogin() {
    var access = document.getElementById('access');
    var background = document.getElementsByClassName('background')[0];
    access.classList.remove('modalClose');
    background.classList.add('backgroundShow');
}

function getClose() {
    var access = document.getElementById('access');
    var background = document.getElementsByClassName('background')[0];
    access.classList.add('modalClose');
    background.classList.remove('backgroundShow');
}

// Share
function Share() {
    var share = document.getElementById('share');
    var background = document.getElementsByClassName('background')[1];
    share.classList.remove('modalClose');
    background.classList.add('backgroundShow');
}

function closeShare() {
    var share = document.getElementById('share');
    var background = document.getElementsByClassName('background')[1];
    share.classList.add('modalClose');
    background.classList.remove('backgroundShow');
}

function search() {
    var searchButton = document.getElementsByClassName('searchButton')[0];
    var search = document.getElementsByClassName('search')[0];
    if (document.getElementsByClassName('searchButton')[0].classList.value.indexOf('Open') > -1) {
        // Cerrado
        searchButton.classList.remove('searchButtonOpen');
        search.classList.remove('searchOpen');
    } else {
        // Abierto
        searchButton.classList.add('searchButtonOpen');
        search.classList.add('searchOpen');
    }
}

function closeCookies() {
    cookie = document.getElementById('cookies');
    cookie.style.display = 'none';
    document.cookie = 'maite=true';
}

// Top

function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Responsive

function responsive(){
    if (document.body.clientWidth <= 500) {
        document.getElementById('hamburgerIcon').style.display = 'block';
        document.getElementById('index').style.display = 'none';

    } else {
        document.getElementById('hamburgerIcon').style.display = 'none';
        document.getElementById('index').style.display = 'block';
    }

}

function MenuHamburger() {
    hamburger = document.getElementById('hamburger');
    if (hamburger.style.display == 'block'){
        hamburger.style.display = 'none';

    } else {
        hamburger.style.display = 'block';
    }
}
 
// Check cookies

function checkCookies() {
    if(document.cookie.includes('maite=true')) {
        document.getElementById('cookies').style.display = 'none';
    } else {
        document.getElementById('cookies').style.display = 'block';
    }
}

function bodyClosePopUp() {
    document.getElementById('popup').style.display = 'none';
}

function buttonClosePopUp() {
    document.getElementById('popup').style.display = 'none';
}

// Reproductor

function playVid() { 
  document.getElementById('myVideo').play();
} 

function pauseVid() { 
    document.getElementById('myVideo').pause(); 
} 

function enlarge() {
    if(document.getElementById('myVideo').style.width='40%'){
        document.getElementById('myVideo').style.width='96%';
    } else {
        document.getElementById('myVideo').style.width='40%';
    }
    document.getElementById('enlarge').style.marginTop='251px';

}
