const person = {
  name: 'Alex',
  age: 30,
  location: {
    city: 'Kiev',
    temp: 26
  }
};

const {name: firstName = 'Anonymous', age} = person;
const {city, temp: temperature} = person.location;
console.log(`My name is ${firstName}, ${age} years old, Im from ${city}, temperature is ${temperature}`);

const item = ['Coffee', '$2.00', '$2.50', '$3.00'];
const [coffee,,mediumPrice] = item;

console.log(`A medium ${coffee} costs ${mediumPrice}`);