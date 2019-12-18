
let todoList = [{ job: 'job1', finished: false }, { job: 'job2', finished: true }, { job: 'job3', finished: false }, { job: 'job4', finished: false }]
localStorage.setItem('todoList', JSON.stringify(todoList))
localStorage.setItem('navActive', 'ALL')

let list = document.getElementById('list')
let input = document.getElementById('input')
let add = document.getElementById('addbtn')
let navs = document.getElementById('nav').querySelectorAll('a')
let clickTimeout = null

add.addEventListener('click', e => {
  let newText = input.value
  todoList.unshift({job: newText,finished: false})
  localStorage.setItem('todoList',JSON.stringify(todoList))
  refresh()
  input.value = ''
})

refresh()


navs.forEach(e => {
  e.addEventListener('click', e => {
    localStorage.setItem('navActive', e.toElement.innerText)
    navs.forEach(e => {
      e.className = ''
    })
    e.toElement.className = 'active'
    refresh()
  })
})

function loadAll() {
  let todoList = JSON.parse(localStorage.getItem('todoList'))
  todoList.forEach((e, i) => {
    let text = document.createTextNode(e.job)
    let li = document.createElement('li')
    li.appendChild(text)
    li.setAttribute('todoid', i)
    if (e.finished == true)
      li.classList.add('finished')
    list.appendChild(li)
  });
}

function loadTodo() {
  let todoList = JSON.parse(localStorage.getItem('todoList'))
  todoList.forEach((e, i) => {
    if (e.finished == false) {
      let text = document.createTextNode(e.job)
      let li = document.createElement('li')
      li.appendChild(text)
      li.setAttribute('todoid', i)
      list.appendChild(li)
    }
  })
}

function loadFinished() {
  let todoList = JSON.parse(localStorage.getItem('todoList'))
  todoList.forEach((e, i) => {
    if (e.finished == true) {
      let text = document.createTextNode(e.job)
      let li = document.createElement('li')
      li.appendChild(text)
      li.setAttribute('todoid', i)
      li.classList.add('finished')
      list.appendChild(li)
    }
  })
}

function clearLi() {
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild)
  }
}

function switchStatus(e) {
  let i = e.toElement.getAttribute('todoid')
  todoList[i].finished = !todoList[i].finished
  localStorage.setItem('todoList', JSON.stringify(todoList))
  refresh()
}

function deleteItem(e){
  let i = e.toElement.getAttribute('todoid')
  todoList.splice(i,1)
  localStorage.setItem('todoList',JSON.stringify(todoList))
  refresh()
}

function refresh() {
  todoList = JSON.parse(localStorage.getItem('todoList'))
  switch (localStorage.getItem('navActive')) {
    case 'ALL':
      clearLi()
      loadAll()
      break
    case 'TODO':
      clearLi()
      loadTodo()
      break
    case 'FINISHED':
      clearLi()
      loadFinished()
      break
  }

  list.childNodes.forEach(e => {
    e.addEventListener('click', event => {
      clearTimeout(clickTimeout)
      // clickTimeout = window.setTimeout(switchStatus(event),300)
      clickTimeout = window.setTimeout(() => {
        switchStatus(event)
      },300)
    })

    e.addEventListener('dblclick', e => {
      clearTimeout(clickTimeout)
      deleteItem(e)
    })
  })
}