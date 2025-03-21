import { Poke } from './Poke.mjs';

function Order(id_order, poke, quantity) {
    this.id_order = id_order;
    this.pokes = [];
    if(poke instanceof Poke) {
        this.pokes.push([poke, quantity]);
    } else {
        throw new Error('Non stai inserendo un oggetto di tipo Poke');
    }

    this.add = function(poke, quantity) {
        if (poke instanceof Poke) {
            this.pokes.push([poke, quantity]);
        } else {
            throw new Error('Non stai inserendo un oggetto di tipo Poke');
        }
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

    this.getTotalQuantity = function() {
        let totalQuantity = 0;
        totalQuantity = this.pokes.reduce((acc, order) => acc + order[1], 0);
        return totalQuantity;
    }

    this.getPrice = function() {
        let totalPrice = 0;
        totalPrice = this.pokes.reduce((acc, order) => acc + order[0].pricePoke * order[1], 0);
        if (this.getTotalQuantity() > 4) {
            totalPrice = totalPrice * 0.9;
        }
        return totalPrice;
    }
}


//esempio

const Poke1 = new Poke('poke1', 'R', ['Avocado', 'Cetrioli'], ['Tonno'], 'Riso Bianco');

const order = new Order(3, Poke1, 5);
//order.add(Poke1, 2);

//order.add('poke2', 3);
console.log(JSON.stringify(order, null, 2));
console.log(order.getPrice());

//order.remove('poke1');
//console.log(order.id_order, order.pokes);

//order.mod_quantity('poke2', 5);
//console.log(order.id_order, order.pokes);



