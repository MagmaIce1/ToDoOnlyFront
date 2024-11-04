const inputEl = (document.getElementsByClassName("app__controls-input"))[0]
const btnEl = (document.getElementsByClassName("app__controls-button"))[0]
const listEl = (document.getElementsByClassName("app__list"))[0]

// btnEl.addEventListener('click', () => {
//     if (inputEl.value === "") return
//     createDeleteElement(inputEl.value)
//     inputEl.value = ""
// })
//


let counter = 1
let data = []

if (localStorage.getItem('data') !== null) {
    data = JSON.parse(localStorage.getItem('data'))
}

data.forEach((item) => {
    if (item.id > counter) {
        counter = item.id + 1
    }
})
if (counter > 1) {
    counter++
}

btnEl.addEventListener('click', () => {
    const textValue = inputEl.value
    if (textValue === "") {
        return
    }
    else {
        data.push({
            id: counter++,
            text: textValue,
            isDone: false
        })
        localStorage.setItem('data', JSON.stringify(data))
        render()
        inputEl.value = ""
    }

})

function render() {
    listEl.innerHTML = ''
    for (let item of data) {
        const tmpElement = createTask(item)
        listEl.appendChild(tmpElement)
    }
}

render()
// 
function createTask(objectData) {

    const root = document.createElement('div')
    root.classList.add('app__list-item')

    const input = document.createElement('input')
    input.classList.add('app__list-checkbox')
    input.type = 'checkbox'
    input.dataId = objectData.id
    if (objectData.isDone) {
        root.classList.add('app__list-item_done')
        input.checked = true
    }

    const txt = document.createElement('p')
    txt.classList.add('app__list-text')
    txt.innerText = objectData.text

    const btn = document.createElement('button')
    btn.classList.add('app__list-btn')

    const img = document.createElement('img')
    img.src = 'Vector.png'
    img.alt = 'trash'

    btn.appendChild(img)

    root.appendChild(input)
    root.appendChild(txt)
    root.appendChild(btn)

    btn.addEventListener('click', () => {
        listEl.removeChild(root)
        let j = 0
        for (let i of data) {
            j++

            if (i.id === objectData.id) {
                data = data.filter((val, ind) => ind !== j - 1)
                localStorage.setItem('data', JSON.stringify(data))
                break
            }

        }

    })

    input.addEventListener('change', (event) => {
        const i = data.findIndex(x => x.id === input.dataId)
        data[i].isDone = event.target.checked
        if (event.target.checked) {
            root.classList.add('app__list-item_done')
        } else {
            root.classList.remove('app__list-item_done')
        }
        console.log(...data)
        localStorage.setItem('data', JSON.stringify(data))
    });

    return root
}
