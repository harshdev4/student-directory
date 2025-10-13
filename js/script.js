let users = [];
fetch('data/users.json')
    .then(res => res.json())
    .then(data => users = data);


const themeBtn = document.querySelectorAll('#themeBtn, #themeBtnMobile');
const themeIcon = document.getElementById('themeIcon');
const themeIconMobile = document.getElementById('themeIconMobile');

let theme = localStorage.getItem("theme-port");

if (theme === "dark") {
    document.body.classList.add('dark');
    if (themeIcon && themeIconMobile) {
        themeIcon.textContent = 'light_mode';
        themeIconMobile.textContent = 'light_mode';
    }
}

function toggleTheme() {
    if (theme === "dark") {
        localStorage.setItem("theme-port", "light");
    }
    else {
        localStorage.setItem("theme-port", "dark");
    }
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    if (themeIcon) themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
    if (themeIconMobile) themeIconMobile.textContent = isDark ? 'light_mode' : 'dark_mode';
}

themeBtn.forEach(btn => btn.addEventListener('click', toggleTheme));

const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const menuIconClosed = document.getElementById('menuIconClosed');
const menuIconOpen = document.getElementById('menuIconOpen');



const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'profile.html';
        } else {
            document.getElementById('error').innerText = 'Invalid Credentials';
        }
    });
}


if (menuButton) {
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle("menu-show");
    })
}

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    if (document.getElementById('profileName')) {
        document.getElementById('profileName').innerText = currentUser.name;
        document.getElementById('profileImage').src = currentUser.profileImage;
        document.getElementById('profileAbout').innerText = currentUser.about;

        const ach = document.getElementById('profileAchievements');
        currentUser.achievements.forEach(a => {
            let li = document.createElement('li');
            li.innerText = a;
            ach.appendChild(li);
        });

        const proj = document.getElementById('profileProjects');
        currentUser.projects.forEach(p => {
            let div = document.createElement('div');
            div.innerHTML = `<img src="${p.image}" alt="${p.title}"><p>${p.title}</p>`;
            proj.appendChild(div);
        });
    }
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});
const logoutBtnMobile = document.getElementById('logoutBtnMobile');
if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
    if (mobileMenu.style.display === 'flex') {
        mobileMenu.style.display = 'none';
        menuIconClosed.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
    }
});


const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', e => {
        const value = e.target.value.toLowerCase();
        const results = users.filter(u => u.name.toLowerCase().includes(value) || u.email.toLowerCase().includes(value));
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';
        results.forEach(u => {
            let div = document.createElement('div');
            div.className = 'user-card';
            div.innerHTML = `<img src="${u.profileImage}" alt="${u.name}"><h4>${u.name}</h4>`;
            div.addEventListener('click', () => {
                localStorage.setItem('clickedUser', JSON.stringify(u));
                window.location.href = 'user.html';
            });
            searchResults.appendChild(div);
        });
    });
}


const clickedUser = JSON.parse(localStorage.getItem('clickedUser'));
if (clickedUser) {
    if (document.getElementById('userName')) document.getElementById('userName').innerText = clickedUser.name;
    if (document.getElementById('userImage')) document.getElementById('userImage').src = clickedUser.profileImage;
    if (document.getElementById('userAbout')) document.getElementById('userAbout').innerText = clickedUser.about;

    if (document.getElementById('userAchievements')) {
        const ach = document.getElementById('userAchievements');
        clickedUser.achievements.forEach(a => {
            let li = document.createElement('li');
            li.innerText = a;
            ach.appendChild(li);
        });
    }
    if (document.getElementById('userProjects')) {
        const proj = document.getElementById('userProjects');
        clickedUser.projects.forEach(p => {
            let div = document.createElement('div');
            div.innerHTML = `<img src="${p.image}" alt="${p.title}"><p>${p.title}</p>`;
            proj.appendChild(div);
        });
    }
}
