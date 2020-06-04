let inputSearh = null,
  buttonSearch = null,
  panelUsers = null,
  panelStatistics = null,
  divWait = null,
  divInterface = null,
  allUsers = [];

const formatter = Intl.NumberFormat('pt-BR');

window.addEventListener('load', async () => {
  mapElements();
  await fetchUsers();
  addEvents();
});

function mapElements() {
  inputSearh = document.querySelector('#inputSearch');
  panelUsers = document.querySelector('#panelUsers');
  panelStatistics = document.querySelector('#panelStatistics');

  divWait = document.querySelector('#divWait');
  divInterface = document.querySelector('#divInterface');
}

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();

  allUsers = json.results
    .map(({ login, picture, name, dob, gender }) => {
      const fullName = `${name.first} ${name.last}`;

      return {
        id: login.uuid,
        picture: picture.medium,
        name: fullName, //nome completo com somente as primeiras letras maiúsculas
        nameLowerCase: fullName.toLowerCase(), //nome completo com todas as letras minúsculas
        age: dob.age,
        gender: gender,
      };
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  showInterface();
}

function showInterface() {
  setTimeout(() => {
    divWait.classList.add('hidden');
    divInterface.classList.remove('hidden');
  }, 800);
}

function addEvents() {
  inputSearch.addEventListener('keyup', handleKeyUP);
  btnSearch.addEventListener('click', clickButton);
}

function handleKeyUP(event) {
  const currentKey = event.key;

  if (currentKey !== 'Enter') {
    return;
  }

  const filterText = event.target.value;

  if (filterText.trim() !== '') {
    filterUsers(filterText);
  }
}

function clickButton() {
  const filterText = document.querySelector('#inputSearch').value;

  if (filterText.trim() !== '') {
    filterUsers(filterText);
  }
}

function filterUsers(filterText) {
  const filterTextLowercase = filterText.toLowerCase();
  const filteredUsers = allUsers.filter((user) => {
    return user.nameLowerCase.includes(filterTextLowercase);
  });
  renderProfileUsers(filteredUsers);
  renderStatistics(filteredUsers);
}

function renderProfileUsers(allUsers) {
  panelUsers.innerHTML = '';

  const h5 = document.createElement('h5');
  h5.textContent = `${allUsers.length} usuário(s) encontrado(s)`;

  const ul = document.createElement('ul');

  allUsers.forEach((user) => {
    const li = document.createElement('li');
    li.classList.add('flex-row');
    li.classList.add('space-bottom');
    const img = `<img class='avatar' src="${user.picture}" alt="${user.name}">`;
    const userData = `${user.name},  ${user.age} anos`;

    li.innerHTML = `${img}${userData}`;
    ul.appendChild(li);
  });

  panelUsers.appendChild(h5);
  panelUsers.appendChild(ul);
}

function renderStatistics(allUsers) {
  const countFemale = allUsers.filter((user) => user.gender === 'female')
    .length;
  const countMale = allUsers.filter((user) => user.gender === 'male').length;
  const sumAges = allUsers.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
  const averageAges = sumAges / allUsers.length || 0;

  panelStatistics.innerHTML = `
  <h5>Estatísticas: </h5>
  <ul>
    <li>Sexo Feminino: <strong>${countFemale}</strong></li>
    <li>Sexo Masculino: <strong>${countMale}</strong></li>
    <li>Soma das Idades: <strong>${formatNumber(sumAges)}</strong></li>
    <li>Média das Idades: <strong>${formatAverage(averageAges)}</strong></li>
  </ul>
  `;
}

function formatNumber(number) {
  return formatter.format(number);
}

function formatAverage(number) {
  return number.toFixed(2).replace('.', ',');
}
