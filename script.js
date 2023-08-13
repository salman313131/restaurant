const myForm = document.getElementById('myForm')
const items = document.getElementById('items')
myForm.addEventListener('submit',onSumbit)
items.addEventListener('click',onDelete)

function onSumbit(e){
    e.preventDefault();
    const price = document.getElementById('price').value
    const dish = document.getElementById('dish').value
    const table = document.getElementById('table').value
    const userdata = {price,dish,table}
    axios.post('https://crudcrud.com/api/5c13f8323cb04719b0b58306f0154c8e/users',userdata)
    .then(res=>showOuput(res.data))
    .catch(err=>console.log(err))
}

document.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/5c13f8323cb04719b0b58306f0154c8e/users')
    .then(res=>{
        for(var i=0;i<res.data.length;i++){
            showOuput(res.data[i])
        }
    })
})

function showOuput(data){
    const li = document.getElementById(data.table)
    const delBtn = document.createElement('button')
    delBtn.classList.add('delete')
    delBtn.id = data._id
    delBtn.innerHTML = 'Delete'
    li.appendChild(document.createTextNode(`${data.price} - ${data.dish} - `))
    li.appendChild(delBtn)
}

function onDelete(e){
    if(e.target.classList.contains('delete')){
        const delEle = e.target.id;
        const li = e.target.parentElement;
        axios.delete(`https://crudcrud.com/api/5c13f8323cb04719b0b58306f0154c8e/users/${delEle}`)
        .then(res=>{
            while (li.firstChild) {
                li.removeChild(li.firstChild);
             }
        })
        .catch(err=>console.log(err))
    }
}