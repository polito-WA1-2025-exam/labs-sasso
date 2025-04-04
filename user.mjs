class User {
    constructor(idUser, name, surname, email, password, orders) {
        this.idUser = idUser;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.orders = orders; 
    }
    
    constructor(idUser, name, surname, email){
        this.idUser = idUser;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    // Method to add an order
    pushOrder(new_order) {
        this.orders.push(orders);
    }

    // Method to get all orders
    getOrders() {
        return this.orders;
    }

    // Method to get the user ID
    getId() {
        return this.idUser;
    }

}