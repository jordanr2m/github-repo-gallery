// Profile info div
const profileInfo = document.querySelector(".overview");
const username = "jordanr2m";

// List of repos
const repoList = document.querySelector(".repo-list");

const getGitData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    // console.log(data); -> Shows all object properties
    displayData(data);
};
// Must call this function in order for data to be pulled!
getGitData();

const displayData = function (data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    // Populate the div with the needed elements. Use template literal
    userInfoDiv.innerHTML = 
        `<figure>
            <img alt="user avatar" src=${data.avatar_url}>
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`;
    profileInfo.append(userInfoDiv);
    getRepos();
};

const getRepos = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const data = await res.json();
    // console.log(data);
    displayRepos(data);
}
// getRepos(); - Checking that we are pulling list of repos

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItems = document.createElement("li");
        repoItems.classList.add("repo");
        repoItems.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItems);
    }
    /* Can also use a forEach loop here instead: 
        repos.forEach(function (repo) {
            Same function  body
        }) */
};