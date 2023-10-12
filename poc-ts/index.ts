const world = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}
console.log(hello("omar"));


 const helloArrow = (who: string = world): string => {
  return `Hello using arrow func: ${who}! `;
}
console.log(helloArrow("omar"));


const helloArrow2: (who: string) =>  string = (who = world) => {
  return `Hello using arrow2 func: ${who}! `;
}

console.log(helloArrow2("omar"));




function helloWith({name, age}: {name: string, age: number}): string {
  return `Hello ${name}, age ${age}! `;
}

console.log(helloWith({name: "omar", age: 4}));


function helloWith2(person: {name: string, age: number}): string {
  const {name, age} = person
  return `Hello ${name}, age ${age}! `;
}

console.log(helloWith2({name: "barra", age: 7}));


const sayHiFromFunction = (fn: (name: string) => string ) => fn("Omar from function")
console.log(sayHiFromFunction(hello))
// console.log(sayHiFromFunction(() =>  444)) does not compile


// Function is the any for the functions
const sayHiFromFunctionAny = (fn: Function ) => fn("Omar from function with the any function")
console.log(sayHiFromFunctionAny(hello))
console.log(sayHiFromFunctionAny(() =>  444))


// no muy usado
function throwError(message: string): never {
  throw new Error(message)
}


function showName(name: string): void {
  console.log(`Name ${name}` )
}
const names = ["omar", "barra"]
// inferencia funciones anonimas segun el contexto
names.forEach(name =>  showName(name))


// objects
// type alias

type HeroId = `${string}-${string}-${string}-${string}-${string}`
type Hero =  {readonly id?: HeroId,
   name: string, 
   age: number,
    active?: boolean}

function createHero(hero: Hero): Hero {
  const {name, age} = hero
  return {name, age, active: true, id: "a-b-c-d-e"}
}

const newHero = createHero({name: "barra", age: 7})
console.log(newHero)

// optional properties
// newHero.id = 323 does no compile


// template union types
type Hexa = `#${string}`
const color: Hexa = '#00333ff'
// const colorInvalid: Hexa = '00333ff' // it does not compile


// union types
type HeroPowerScale = 'local' | 'multiversal'
type NumOrString = number | string
type StringOr3 = string | 3
const enableAnimationDuration: boolean | number = 200


// intersection types para extender


type HeroBasicInfo =  {
  name: string, 
  age: number,
   }

type HeroProperties =  {readonly id?: HeroId,
    active?: boolean}

type HeroComplete = HeroBasicInfo & HeroProperties

function createHeroComplete(hero: HeroBasicInfo): HeroComplete {
  const {name, age} = hero
  return {name, age, active: true, id: "a-b-c-d-e"}
}

const completeHero = createHeroComplete({name: "barra-complete", age: 7})
console.log(completeHero)

// type indexing para reutilizar tipos

type SomeProps =  {
  name: string, 
  address: {
    planet: string, 
    city: string,
     }
   }

  const address : SomeProps['address'] = {planet: "mars", city: "la paz"}
  console.log(address)

  // type from value
  type Address = typeof address

  const newaddress : Address = {planet: "earth", city: "cocha"}
  console.log(newaddress)

  function createAddress() {
    return {planet: "pluton", city: "santa cruz"}
  }
  type AddresFromRetun = ReturnType<typeof createAddress>
  const ad : AddresFromRetun = {planet: "earth", city: "otro"}
  console.log(ad)

  // arrays


  const  arr = [] // deberia ser array de never pero es any xq?

  const  languages: string[] = [] 
  languages.push("dsd")

  const  languagesOther: Array<string> = [] // it is the same above
  languagesOther.push("dsd")


  const  languagesNumOrStr: (number | string)[] = [] 
  languagesNumOrStr.push("dsd")
  languagesNumOrStr.push(3)


type CellValue = 'X' | '0' | ''
type GameBoard = [
  [CellValue, CellValue, CellValue], // it is a tupla
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
]

const gameBoard : GameBoard = [
  ['X' , '0' , ''],
  ['X' , '0' , ''],
  ['X' , '0' , '']
]

console.log(gameBoard)

type RGB = [number, number, number]
const rgb: RGB = [1,2,3]

type State = [string, (nameState: string) => void]
const [message, setMessage] : State = ["hello world", (message: string) => {console.log(`setting: ${message}`)}]
setMessage(message)