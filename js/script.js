// Profile info div
const profileInfo = document.querySelector(".overview");
const username = "jordanr2m";

const getGitData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    // console.log(data); -> Shows all object properties
    displayData(data);
}
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
}