const SizeEnum = Object.freeze({
    LARGE: 'L',
    REGULAR: 'R',
    MEDIUM: 'M'
});

const BaseEnum = Object.freeze({
    RISO_BIANCO: 'Riso Bianco',
    RISO_INTEGRALE: 'Riso Integrale',
    QUINOA: 'Quinoa'
});
const ProteineEnum = Object.freeze({
        SALMONE: 'Salmone',
        TONNO: 'Tonno',
        POLLO: 'Pollo',
        TOFU: 'Tofu'
});

const IngredientiEnum = Object.freeze({
    AVOCADO: 'Avocado',
    CETRIOLI: 'Cetrioli',
    EDAMAME: 'Edamame',
    CIPOLLA: 'Cipolla'
})

function Poke(idPoke,size, ingredients, proteins, base){
/*
   * @param {'L' | 'R' | 'M'} size 
   * @param {string} base 
   * @param {string[]} proteine 
   * @param {string[]} ingredienti 
   */

    if(!Object.values(SizeEnum).includes(size)){
        throw new Error('Size non valida');
    }
    if(!Object.values(BaseEnum).includes(base)){
        throw new Error('Base non valida');
    }
    proteins.forEach(p=>{
        if(!Object.values(ProteineEnum).includes(p)){
            throw new Error(`Proteina non valida: ${p}`);
        }
    });
    ingredients.forEach(i => {
        if(!Object.values(IngredientiEnum).includes(i)){
            throw new Error(`ingrediente non valido: ${i}`);
        }
    });

    this.idPoke = idPoke;
    this.size = size;
    this.ingredients = ingredients;
    this.proteins = proteins;
    this.base = base;
    this.pricePoke = this.calculatePrice();
}

Poke.prototype.getIdPoke = function(){
    return this.idPoke;
};
Poke.prototype.getSize = function(){
    return this.size;
};
Poke.prototype.getIngredients = function(){
    return this.ingredients;
};
Poke.prototype.getProteins = function(){
    return this.proteins;  
};
Poke.prototype.getBase = function(){
    return this.base;
};
Poke.prototype.getPrice = function(){
    return this.pricePoke;
};
Poke.prototype.addIngredients = function(ingredient){
    if(!Object.values(IngredientiEnum).includes(ingredient)){
        throw new Error(`Ingrediente non valido: ${ingredient}`);
    }
    this.ingredients.push(ingredient);
    this.pricePoke = this.calculatePrice();
    return this;
};
Poke.prototype.addProteins = function(protein){
    if(!Object.values(ProteineEnum).includes(protein)){
        throw new Error(`Proteina non valida: ${protein}`);
    }
    this.proteins.push(protein);
    this.pricePoke = this.calculatePrice();
    return this;
};
Poke.prototype.removeIngredients = function(ingredient){
    if(!Object.values(IngredientiEnum).includes(ingredient)){
        throw new Error(`Ingrediente non valido: ${ingredient}`);
    }
    //find the index of the ingredients that we want to remove
    const index = this.ingredients.indexOf(ingredient);

    if (index!==-1){
        this.ingredients.splice(index, 1);
        this.pricePoke = this.calculatePrice();
        return true;
    }else{
        return false;
    }
   
};
Poke.prototype.removeProteins = function(protein){
    if(!Object.values(ProteineEnum).includes(protein)){
        throw new Error(`Ingrediente non valido: ${protein}`);
    }
    //find the index of the ingredients that we want to remove
    const index = this.proteins.indexOf(protein);

    if (index!==-1){
        this.proteins.splice(index, 1);
        this.pricePoke = this.calculatePrice();
        return true;
    }else{
        return false;
    }
   
};
Poke.prototype.calculatePrice = function(){
    const basePrice ={ R:9, M:11, L:14};
    let price = basePrice[this.size];
    const maxIngredients={R:4, M:4, L:6};
    if(this.ingredients.length>maxIngredients[this.size]){
        const extra_ingredients = this.ingredients.length - maxIngredients[this.size];
        price += extra_ingredients*0.2*price;
    }
    return price;
}


function testPokePrice() {
    console.log("🔍 Inizio test calcolo prezzo...");

    // 📌 Test 1: Prezzo base per ogni dimensione
    const pokeR = new Poke(1, 'R', [], [], 'Riso Bianco');
    console.assert(pokeR.getPrice() === 9, `❌ Prezzo errato per 'R': ${pokeR.getPrice()}`);

    const pokeM = new Poke(2, 'M', [], [], 'Riso Integrale');
    console.assert(pokeM.getPrice() === 11, `❌ Prezzo errato per 'M': ${pokeM.getPrice()}`);

    const pokeL = new Poke(3, 'L', [], [], 'Quinoa');
    console.assert(pokeL.getPrice() === 14, `❌ Prezzo errato per 'L': ${pokeL.getPrice()}`);

    console.log("✅ Test 1 superato: Prezzo base corretto.");

    // 📌 Test 2: Aggiunta di ingredienti extra
    const pokeExtra = new Poke(4, 'R', ['Avocado', 'Cetrioli', 'Edamame', 'Cipolla'], [], 'Riso Bianco');
    console.assert(pokeExtra.getPrice() === 9, `❌ Prezzo errato per 4 ingredienti in 'R': ${pokeExtra.getPrice()}`);

    pokeExtra.addIngredients('Avocado'); // 1 extra
    let expectedPrice = 9 + (0.2 * 9);
    console.assert(pokeExtra.getPrice() === expectedPrice, `❌ Prezzo errato con 1 extra: ${pokeExtra.getPrice()}, atteso: ${expectedPrice}`);

    pokeExtra.addIngredients('Cetrioli'); // 2 extra
    expectedPrice = 9 + (0.2 * 9) * 2;
    console.assert(pokeExtra.getPrice() === expectedPrice, `❌ Prezzo errato con 2 extra: ${pokeExtra.getPrice()}, atteso: ${expectedPrice}`);

    console.log("✅ Test 2 superato: Sovrapprezzo ingredienti extra corretto.");

    // 📌 Test 3: Rimozione ingredienti
    pokeExtra.removeIngredients('Avocado'); // Torna a 1 extra
    expectedPrice = 9 + (0.2 * 9);
    console.assert(pokeExtra.getPrice() === expectedPrice, `❌ Prezzo errato dopo rimozione ingrediente: ${pokeExtra.getPrice()}, atteso: ${expectedPrice}`);

    console.log("✅ Test 3 superato: Prezzo aggiornato correttamente dopo rimozione ingrediente.");

    // 📌 Test 4: Aggiunta e rimozione proteine (il prezzo NON deve cambiare)
    pokeExtra.addProteins('Salmone');
    pokeExtra.addProteins('Pollo');
    console.assert(pokeExtra.getPrice() === expectedPrice, `❌ Prezzo errato dopo aggiunta proteine: ${pokeExtra.getPrice()}, atteso: ${expectedPrice}`);

    pokeExtra.removeProteins('Salmone');
    console.assert(pokeExtra.getPrice() === expectedPrice, `❌ Prezzo errato dopo rimozione proteina: ${pokeExtra.getPrice()}, atteso: ${expectedPrice}`);

    console.log("✅ Test 4 superato: Aggiunta e rimozione proteine non influiscono sul prezzo.");

    console.log("🎉 Tutti i test sono stati superati con successo!");
}

// Avvia i test
testPokePrice();


