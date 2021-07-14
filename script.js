const result = document.getElementById('result');
const filter = document.getElementById('filter');
let listItems = [];

filter.addEventListener('input', (e) => filterUser(e.target.value));

// Fetch user through random user api
async function getUsers() {
  const user = await fetch('https://randomuser.me/api?results=50');
  const { results } = await user.json();
  return results;
}

//Add user to list
async function addAllUserToUI() {
  const users = await getUsers();
  updateUI(users);
}

// filter User based on filter
async function filterUser(searchKey) {
  const users = await getUsers();
  listItems = users.filter((user) => user.name.first.includes(searchKey));
  updateUI(listItems);
}

function updateUI(users) {
  result.innerHTML = users
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

addAllUserToUI();
