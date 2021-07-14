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

//Add user to initialize List
async function addAllUserToUI() {
  listItems = await getUsers();
  updateUI(listItems);
}

// filter User from already fetched userlist
async function filterUser(searchKey) {
  let filterItems = listItems.filter((user) =>
    user.name.first.includes(searchKey)
  );
  updateUI(filterItems);
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
