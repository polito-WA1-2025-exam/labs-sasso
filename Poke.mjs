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

function Poke(idPoke,size, ingredients, proteins, base, price_poke){
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
    this.price_poke = price_poke;
}


const miaPoke = new Poke(
    1,
    SizeEnum.LARGE,
    [IngredientiEnum.AVOCADO, IngredientiEnum.EDAMAME],
    [ProteineEnum.SALMONE, ProteineEnum.TOFU],
    BaseEnum.RISO_BIANCO,
    12.99
);

console.log(miaPoke);


