class Book {
    constructor(name, author, type) {
        this.bookObj = {
            Name: name,
            Author: author,
            Type: type
        }
        let localObj;
        let localBooks = localStorage.getItem("books");
        if (localBooks == null) {
            localObj = [];
        } else {
            localObj = JSON.parse(localBooks);
        }
        localObj.push(this.bookObj);
        localStorage.setItem("books", JSON.stringify(localObj));
    }
}
function deleteBook(index){
    let localObj;
        let localBooks = localStorage.getItem("books");
        if (localBooks == null) {
            localObj = [];
        } else {
            localObj = JSON.parse(localBooks);
        }
        localObj.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(localObj));
  showTable();
}
function showTable(){
    let localObj;
    let localBooks = localStorage.getItem("books");
    if (localBooks == null) {
        localObj = [];
    } else {
        localObj = JSON.parse(localBooks);
    }

    let tableBody = document.getElementById('tableBody');

    let uiString='' 
    localObj.forEach(function(element,index) {
        uiString+= `  <tr>
                        <th scope="row">${index+1}</th>
                        <td>${element.Name}</td>
                        <td>${element.Author}</td>
                        <td>${element.Type}</td>
                        <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteBook(this.id)" id='${index}'>Delete</button></td>
                    </tr>`;            
    });
    if(localObj.length!=0){
        tableBody.innerHTML = uiString;
    }
    else{
        tableBody.innerHTML=`<h3>No books available!</h3>`
    }
    
}

showTable();
class Display {
    
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book) {
        console.log(book);
        if (book.bookObj.Name.length < 2 || book.bookObj.Author.length < 2) {
            return false;
        } else {
            return true;
        }
    }
    show(showAlert, showMessage) {
        let message = document.getElementById('message');
        message.innerHTML = ` <div class="alert alert-${showAlert} alert-dismissible fade show" role="alert">
                                <strong>Message: </strong>${showMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 2000);
    }
}

//add submit event listner to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);


//library form submit function
function libraryFormSubmit(e) {
    console.log("you have submitted the form!");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    // setting type=>fiction,programming,cooking
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book.bookObj);

    let display = new Display();

    if (display.validate(book)) {
        showTable();
        display.clear();
        display.show('success', "Book added Successfully!");
    } else {
        //show error
        display.show('danger', "Please fill book details correctly!");
    }

    e.preventDefault();
}

//search
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let tableBody = document.getElementById('tableBody');
    tr=tableBody.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          let txtValue = td.textContent || td.innerText;
          if (txtValue.toLowerCase().indexOf(inputVal) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
    }
})