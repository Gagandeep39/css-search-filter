const result = document.getElementById('result');
const filter = document.getElementById('filter');
const listItems = [];

// Fetch user through random user api
async function getUsers() {
  const user = await fetch('https://randomuser.me/api?results=50');
  const { results } = await user.json();
  return results;
}

//Add user to list
async function addUserToUI() {
  const users = await getUsers();
  listItems.push(...users);
  result.innerHTML = listItems
    .map((user) => {
      return `
      <li>
          <img
            src="${user.picture.thumbnail}"
            alt="Person"
          />
          <div class="user-info">
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
          </div>
        </li>
      `;
    })
    .join('\n');
}

addUserToUI();
