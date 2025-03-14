function Order(id_order, orders) {
    this.id_order = id_order;
    this.orders = [];

    this.add = function(poke, quantity) {
        this.orders.push([poke, quantity]);
    }

    this.remove = function(poke) {
        this.orders = this.orders.filter(order => order[0] !== poke);
    }
}

const order = new Order(3);

console.log(order.orders);


