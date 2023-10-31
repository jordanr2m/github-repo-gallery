// Profile info div
const profileInfo = document.querySelector(".overview");
const username = "jordanr2m";

// Unordered List of repos
const repoList = document.querySelector(".repo-list");

// Repo info section - starting screen
const allReposContainer = document.querySelector(".repos");
// Individual repo data - secondary screen
const repoData = document.querySelector(".repo-data");

// Back button
const backButton = document.querySelector(".view-repos");
// Search bar input
const filterInput = document.querySelector(".filter-repos");


const getGitData = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    // console.log(data); -> Shows all object properties
    displayUserData(data);
};
// Must call this function in order for data to be pulled!
getGitData();

const displayUserData = function (data) {
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
    getRepos(username);
};

const getRepos = async function (username) {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    // console.log(repoData);
    displayRepoList(repoData);
};
// getRepos(); - Checking that we are pulling list of repos

const displayRepoList = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItems = document.createElement("li");
        repoItems.classList.add("repo");
        repoItems.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItems);
    }
    /* Can also use a forEach loop here. Use for of instead because we don't need to grab the index number. */
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        // console.log(repoName);
        getRepoData(repoName);
    }
});

const getRepoData = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    // console.log(repoInfo);

    // Grab languages - fetch can target specific attributes of the data
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);
    
    // Make a list of languages - turn languageData object into an array so that we can easily show it on the page
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoData(repoInfo, languages);
};

const displayRepoData = function (repoInfo, languages) {
    repoData.innerHTML = ""; // clear section each time
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    backButton.classList.remove("hide");
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = 
        `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(repoDiv);
};

backButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

// Dynamic search
filterInput.addEventListener("input", function (e) {
    const userInput = e.target.value;
    // console.log(userInput); - Type in search bar to confirm it is working
    const repos = document.querySelectorAll(".repo");
    const userInputLower = userInput.toLowerCase();

    for (const repo of repos) {
        const lowerCaseValue = repo.innerText.toLowerCase();
        if (lowerCaseValue.includes(userInputLower)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});