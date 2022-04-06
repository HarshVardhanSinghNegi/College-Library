class Book{
    constructor(name,author,type){
        this.name=name;
        this.author=author;
        this.type=type;
    }
}

class Display{
    add(book){
        console.log("adding to ui");
        let tableBody=document.getElementById('tableBody');
    
        let uiString=`  <tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML+=uiString;    
    }
    clear(){
        let libraryForm=document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book){
        if(book.name.length<2 || book.author.length<2){
            return false;
        }else{
            return true;
        }
    }
    show(showAlert,showMessage){
        let message=document.getElementById('message');
        message.innerHTML=` <div class="alert alert-${showAlert} alert-dismissible fade show" role="alert">
                                <strong>Message: </strong>${showMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
        setTimeout(function() {
            message.innerHTML=''
        }, 2000);
    }
}

//add submit event listner to libraryForm
let libraryForm=document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFormSubmit);


//library form submit function
function libraryFormSubmit(e){
    console.log("you have submitted the form!");
    let name=document.getElementById('bookName').value;
    let author=document.getElementById('author').value;
    let type;
    // setting type=>fiction,programming,cooking
    let fiction=document.getElementById('fiction'); 
    let programming=document.getElementById('programming'); 
    let cooking=document.getElementById('cooking'); 

    if(fiction.checked){
        type=fiction.value;
    }else if(programming.checked){
        type=programming.value;
    }else if(cooking.checked){
        type=cooking.value;
    }

    let book=new Book(name,author,type);
    console.log(book);

    let display=new Display();
    
    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success',"Book added Successfully!");
    }else{
        //show error
        display.show('danger',"Please fill book details correctly!");
    }
    
    e.preventDefault();
}