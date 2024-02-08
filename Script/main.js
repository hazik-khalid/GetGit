var userData; // global variable
var uname;
var name;
var avatar;
var repos;
var link;
var email;

async function getUserInfo() {
    var usernameInput = document.getElementById('username');
    var username = usernameInput.value;

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
            userData = await response.json();
            uname = userData.login;
            name = userData.name;
            avatar = userData.avatar_url;
            repos = userData.repos_url;
            link = userData.html_url;
            email = userData.email;
        } else {
            console.error('Failed to fetch user data. Status:', response.status);
        }
    }
     catch (error) {
        console.log(error) 
    }
}
