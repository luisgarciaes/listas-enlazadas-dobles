
const createNode = (value) => {
  return {
    value: value,
    next: null,
    previous: null,
  };
}
class Product{
    constructor(id,name,units,cost){
        this._id = id;
        this._name = name;
        this._units = units;
        this._cost = cost;
        this._totalCost = this._units * this._cost;
        this.next=null;
    }
    info(){
        return this._id + " - " + this._name + " " + this._units + " " + this._cost;
      }
    
}
class Inventory{
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  insert(value) {
    this.length++;
    let newNode = createNode(value);

    if (this.tail) {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
      return newNode;
    }

    this.head = this.tail = newNode;
    return newNode;
  }
  remove() {
    if (this.tail) {
      this.length--;

      const removedTail = this.tail;
      const beforeTail = this.tail.previous;

      this.tail = beforeTail;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }

      return removedTail;
    }
    return undefined;
  }
  search(x) {
    let temp = this.head;
    let pos = 0;

    while (temp.value._id != x && temp.next != null) {
        pos++;
        temp = temp.next;
    }

    if (temp.value._id != x)
        return -1;
    return (pos+1);
}
findById(x) {
  if (this.head == null) {
    return -1;
  }
  let temp = this.head;
  while (temp.value._id != x && temp.next != null) {
      temp = temp.next;
  }

  if (temp.value._id != x)
      return -1;
  return (temp);
}
findByPosition(x){ // terrible pero funciona
  let temp = this.head;
  let i = 1;
  while (i != x && temp.next != null) {
    temp = temp.next
    i++
  }
  if (i != x)
      return -1;
  return (temp);
  }

  insertAtHead(value) {
    this.length++;
    let newNode = createNode(value);

    if (this.head) {
      this.head.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
      return newNode;
    }

    this.head = this.tail = newNode;
    return newNode;
  }

  insertPos(value, pos) {
    if (pos >= this.length) {
      console.log("Insert position out of bounds");
    }

    if (pos === 1) {
      return this.insertAtHead(value);
    }

    this.length++;
    let currentNode = this.head;
    for (let i = 1; i < pos; i++) {
      currentNode = currentNode.next;
    }
    const previousNode = currentNode.previous;
    const newNode = createNode(value);
    newNode.next = currentNode;
    newNode.previous = previousNode;
    previousNode.next = newNode;
    currentNode.previous = newNode;
    return newNode;
  }

  removeAtPos(pos) {
    if (pos >= this.length) {
      console.log("Remove pos out of bounds");
    }

    if (pos === 0) {
      return this.removeAtHead();
    }

    this.length--;
    let currentNode = this.head;
    for (let i = 1; i < pos; i++) {
      currentNode = currentNode.next;
    }
    const previousNode = currentNode.previous;
    const nextNode = currentNode.next;
    if(previousNode === null && nextNode === null){
      return -1;
    }
    previousNode.next = nextNode;
    nextNode.previous = previousNode;
    return currentNode;
  }
  removeById(x){
    let y = this.search(x);
    if ((y === -1)) {
      return null;
    }
    let removed = this.findByPosition(y).value.info()
    this.removeAtPos(y);
    return removed.info;
  }
  removeAtHead() {
    if (this.head) {
      this.length--;
      const removedHead = this.head;
      this.head = this.head.next;
      if (this.head) {
        this.head.previous = null;
      } else {
        this.tail = null;
      }
      return removedHead;
    }
    return undefined;
  }
  sortList(){
    let current = null;
    let index = null;
    let temp;
    if (this.head == null) {
      return
      
    }
    else{
      for(current = this.head; current.next != null; current = current.next){
        for(index = current.next; index != null; index = index.next){
          if(current.value._id > index.value._id) {  
            temp = current.value;  
            current.value = index.value;  
            index.value = temp;  
        }  
        }
      }
    }

  }
  display(){  
    let current = this.head;  
    if(this.head == null) {  
        console.log("List is empty");  
        return;  
    }  
    while(current != null) {  
        console.log(current.value.info());  
        current = current.next;  
    }
  }
  displayReverse(){  
    let current = this.tail;  
    if(this.head == null) {  
        console.log("List is empty");  
        return;  
    }  
    while(current != null) {  
        console.log(current.value.info());  
        current = current.previous;  
    }
  }

}
/*
let i=new Inventory();
let p1=new Product(8,1,1,1,1);
i.insert(p1);
p1=new Product(7,1,1,1,1);
i.insert(p1);
p1=new Product(5,3,3,3,3);
i.insert(p1);
p1=new Product(4,1,1,1,1);
i.insert(p1);
p1=new Product(3,1,1,1,1);
i.insert(p1);
p1=new Product(10,1,1,1,1);
i.insert(p1); 
i.display();
console.log("------------------------------")
i.sortList()
i.display()
*/


class App{
    constructor(){
    this._inventory = new Inventory()

    let btnAdd = document.getElementById("btnAdd");
    btnAdd.addEventListener("click", this._addProduct);
    let btnRemove = document.querySelector("#btnRemove");
    btnRemove.addEventListener("click", this._removeProduct)
    let btnFind = document.querySelector("#btnFind");
    btnFind.addEventListener("click", this._findProduct);
    let btnReturn = document.querySelector("#btnReturn");
    btnReturn.addEventListener("click", this._returnInventory);
    let btnReturnReverse = document.querySelector("#btnReturnReverse");
    btnReturnReverse.addEventListener("click", this._returnReverseInventory);
    let test = document.querySelector("#test");
    test.addEventListener("click", this.test);
    
    
    }
    updateConsole = (x) =>{
        let y = document.getElementById("changelog")
        y.value = x;
    }
    _returnInventory = () =>{
        this._inventory.sortList();
        this._inventory.display();
    }
    _returnReverseInventory = () =>{
      this._inventory.displayReverse()
        
    }
    test = () =>{
      
        this._inventory.insert(new Product(2,1,1,1,1))

        this._inventory.insert(new Product(1,1,1,1,1))

        this._inventory.insert(new Product(8,1,1,1,1))

        this._inventory.insert(new Product(7,1,1,1,1))

        this._inventory.insert(new Product(6,1,1,1,1))

        this._inventory.insert(new Product(4,1,1,1,1))

        
    }
    
    _addProduct = () => {
        let consoleText = document.getElementById("changelog")
        let form =  document.getElementById("form1")
        let product = new Product(document.getElementById("id").value,document.getElementById("name").value
        ,document.getElementById("units").value,document.getElementById("cost").value);
        let y = this._inventory.findById(product._id)

        if (y === -1) { 
                this._inventory.insert(product)
                console.log("The product '" + product.info() + "' has been added.")
                consoleText.innerHTML ="The product '" + product.info() + "' has been added."
                form.reset() 
        }else{
            console.log("The product '" + product.info() + "' already exists in the inventory.")
            consoleText.innerHTML ="The product '" + product.info() + "' already exists in the inventory."
        }
    }
    

    _removeProduct = () => {
        let consoleText = document.getElementById("changelog")
        let form = document.getElementById("form2")
        let x = document.getElementById("findRemove").value;
        let y = this._inventory.delete(x)
        if (y == null) {
            console.log("The product with the ID '" + x + "' does not exist.")
            consoleText.innerHTML ="The product with the ID '" + x + "' does not exist."
        }else{
            console.log("The product '" + y.info() + "' has been deleted.")
            consoleText.innerHTML ="The product '" + y.info() + "' has been deleted."
            this._inventory.delete(x)
            form.reset();
        }

    };
    _findProduct = () => {
        let consoleText = document.getElementById("changelog")
        let x = document.getElementById("findRemove").value;
        let y = this._inventory.findById(x)
        if (y == -1) {
            console.log("The product with the ID '" + x + "' does not exist.")
            consoleText.innerHTML ="The product with the ID '" + x + "' does not exist."
            
        }else{
            console.log(y.value.info())
            consoleText.innerHTML = y.value.info()
        }

    };


}


new App;


