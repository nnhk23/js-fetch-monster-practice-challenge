const URL = 'http://localhost:3000/monsters'

document.addEventListener('DOMContentLoaded', () => {
    let a = 1
    fetchMonsters(a)
    createAForm()
    
    const formMonster = document.getElementById('monster-form')
    formMonster.addEventListener('submit', (e) => createAMonster(e))

    const forwardBtn = document.querySelector('#forward')
    const backBtn = document.querySelector('#back')
    forwardBtn.addEventListener('click', () => {
        a++
        fetchMonsters(a)
    })

    backBtn.addEventListener('click', () => {
        if (a > 1) {
            a--
        }
        else if (a == 1){
            alert('Aint no monsters here')
        }   
        fetchMonsters(a)
    })
})

function fetchMonsters(a) {   
    fetch(URL + `/?_limit=50&_page=${a}`)
    .then(resp => resp.json())
    .then(monsters => {
        monsters.forEach(monster => renderMonster(monster))
    })    
}

function renderMonster(monster) {
    const list = document.querySelector('#monster-container')
    const monsterHolder = document.createElement('div')

    const name = document.createElement('h2')
    name.innerText = monster.name

    const age = document.createElement('h4')
    age.innerText = monster.age

    const bio = document.createElement('p')
    bio.innerText = `Bio: ${monster.description}`

    monsterHolder.append(name, age, bio)
    list.appendChild(monsterHolder)
    // console.log(monster)
}

function createAForm() {
    const form = `<form id="monster-form">
    <input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <button>Create</button>
    </form>`
    const formHolder = document.querySelector('#create-monster')

    formHolder.innerHTML += form
}

function createAMonster(event) {
    event.preventDefault()
    // debugger
    
    console.log(event)
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
        },
        body: JSON.stringify({
            name: event.target.name.value,
            age: parseInt(event.target.age.value),
            description: event.target.description.value
        })
    })
    .then(resp => resp.json())
    .then(monster => console.log(monster))
}
