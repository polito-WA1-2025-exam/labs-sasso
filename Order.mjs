function Order(id_order) {
    this.id_order = id_order;
    this.pokes = [];

    this.add = function(id_poke, quantity) {
        this.pokes.push([id_poke, quantity]);
    }

    this.mod_quantity = function(id_poke, quantity) {
        this.pokes = this.pokes.map(order => {
            if(order[0] === id_poke) {
                order[1] = quantity;
            }
            return order;
        });
    }

    this.remove = function(id_poke) {
        this.pokes = this.pokes.filter(order => order[0] !== id_poke);
    }
}

//esempio

const order = new Order(3);
order.add('poke1', 2);
order.add('poke2', 3);
console.log(order.id_order, order.pokes);

order.remove('poke1');
console.log(order.id_order, order.pokes);

order.mod_quantity('poke2', 5);
console.log(order.id_order, order.pokes);



