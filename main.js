
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
    constructor(){
        this.start=null;
    }
    add(x){
        if(this.start==null){this.start=x;}
        else{this._add(x,this.start)}
    }
    _add(x,y){
        if(y.next==null){y.next=x}
        else{this._add(x,y.next)}
    }
    _addN(x,position){
        if(this.start==null){
            if (position!=0) {
                return;
            }
        }
        if (this.start != null && position == 0) {
            x.next = this.start;
            this.start = x;
            return;
          }
          let current = this.start;
          let previous = null;
          let i = 0;
          while (i < position) {
            previous = current;
            current = current.next;
            if (current == null) {
              break;
            }
             i++;
            }
            x.next = current;
            previous.next = x;
            
    }

    list(){
        let x = '';
        let temp=this.start;
        while (temp!=null){
          x += temp.info() + "\n"
          temp=temp.next;
        }
        return x;
    }
    listRev(){
        let x='';
        let temp=this.start;
        while (temp!=null){
          x = temp.info() + "\n" + x
          temp=temp.next;
        }
        return x;
      }
    find(id){
        if (!this.start)
          return null;
        let aux=this.start;
        while(aux!=null){
          if (aux._id==id)
            return aux;
          aux=aux.next;
        }
        return null;
      }
    delete(id){
        let deleted=null;
        if (!this.start)
          return null;
        if (this.start._id==id){
          deleted=this.start;
          this.start=this.start.next;
          return deleted;
        } else {
          let x=this.start;
          let y=this.start.next;
          while(y!=null){
            if (y._id==id){
              x.next=x.next.next;
              deleted=y;
              deleted.next=null;
              return deleted;
            } else {
              x=y;
              y=y.next;
            }
          }
          return null;
        }
      }


}
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
    
    
    }
    updateConsole = (x) =>{
        let y = document.getElementById("changelog")
        y.value = x;
    }
    _returnInventory = () =>{
        console.log(this._inventory.list())
        
    }
    _returnReverseInventory = () =>{
        console.log(this._inventory.listRev())
        
    }
    test = () =>{
        console.log(this._inventory)
        
    }
    
    _addProduct = () => {
        let consoleText = document.getElementById("changelog")
        let form =  document.getElementById("form1")
        let product = new Product(document.getElementById("id").value,document.getElementById("name").value
        ,document.getElementById("units").value,document.getElementById("cost").value);
        let position = document.getElementById("position").value;
        let y = this._inventory.find(product._id)
        
        if (y == null) {
            console.log(position)
            console.log(y)
            if(position == ""){
                this._inventory.add(product);
                console.log("The product '" + product.info() + "' has been added.");
                consoleText.innerHTML ="The product '" + product.info() + "' has been added.";
                form.reset();

            }else{
                this._inventory._addN(product,position)
                console.log("The product '" + product.info() + "' has been added.")
                consoleText.innerHTML ="The product '" + product.info() + "' has been added."
                form.reset()
                
            }
        }else{
            console.log("The product '" + product.info() + "' already exists in the inventory.")
            consoleText.innerHTML ="The product '" + product.info() + "' already exists in the inventory."
        }

       
        //this.consoleText.innerHTML =product,1)

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
        let y = this._inventory.find(x)
        if (y == null) {
            console.log("The product with the ID '" + x + "' does not exist.")
            consoleText.innerHTML ="The product with the ID '" + x + "' does not exist."
            
        }else{
            console.log(y.info())
            consoleText.innerHTML = y.info()
        }

    };


}

/*let i=new Inventory();
let p1=new Product(1,1,1,1,1);
i.add(p1);
p1=new Product(2,1,1,1,1);
i.add(p1);
p1=new Product(3,3,3,3,3);
i.add(p1);
p1=new Product(4,1,1,1,1);
i.add(p1);
p1=new Product(5,1,1,1,1);
i.add(p1);
p1=new Product(7,1,1,1,1);
i.add(p1);
console.log(i.list());
console.log(i.find(4));*/


new App;