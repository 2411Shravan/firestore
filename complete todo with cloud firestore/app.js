const ref= document.getElementById('todo-list');
const form = document.getElementById('add-todo');



// db.collection('todo-app').where('task','==','Anime-making').orderBy('deadline').get().then((snapshot)=>{
// console.log(snapshot.docs);
// snapshot.docs.forEach(doc =>{
//    console.log(doc.data());
//     todoapp(doc);
// })
// })


function todoapp(doc){
    let li= document.createElement('li');

    let work = document.createElement('h4');
    let deadline=document.createElement('h4');
    let del= document.createElement('div');
    del.innerHTML=`
        <button class="btn btn-md btn-danger">Delete</button>
    `;
    del.className+='del-ele';

    li.setAttribute('data-id',doc.id);

    //work.textContent = doc.data().task;
   // deadline.textContent = doc.data().deadline;

   work.innerHTML=`
   <h2>Task : ${doc.data().task}</h2>
   `;
    deadline.innerHTML = `
        <h6>Dead-Line : ${doc.data().deadline}</h6>
    `;
    work.className +="text-center";
    deadline.className +="text-center"
    li.appendChild(work);
    li.appendChild(deadline);
    li.appendChild(del);
    ref.appendChild(li);

    del.addEventListener('click',(e)=>{
        e.stopPropagation();

        let id=e.target.parentElement.getAttribute('data-id');
        
        //let ide=doc.id;
        
        db.collection('todo-app').doc(doc.id).delete();

    });
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();


    db.collection('todo-app').add({
        task:form.task.value,
        deadline:form.deadline.value

    });



    form.task.value="";
    form.deadline.value="";
   
})


db.collection('todo-app').orderBy('task').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    //console.log(changes);
    changes.forEach(change=>{
        console.log(change.doc);
        
        if(change.type=='added'){
            todoapp(change.doc);
            
        }
        else if(change.type=='removed'){
            let li = ref.querySelector('[data-id=' + change.doc.id + ']');
            ref.removeChild(li);
        }
    })
})





