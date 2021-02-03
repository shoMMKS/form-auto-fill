import faker from "faker";
faker.locale = "ja";
import kuromoji from "kuromoji";
const lastName = faker.name.lastName();
const firstName = faker.name.firstName();
const password = faker.internet.password(
  20,
  false,
  /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/g
);

const [kanaLastName, kanaFirstName] = await new Promise((resolve, reject) => {
  kuromoji
    .builder({ dicPath: "node_modules/kuromoji/dict" })
    .build((err, tokenizer) => {
      if (err) {
        return reject(err);
      }

      resolve([
        tokenizer.tokenize(lastName)[0].reading,
        tokenizer.tokenize(firstName)[0].reading,
      ]);
    });
});

export default {
  lastName: lastName,
  firstName: firstName,
  kanaLastName: kanaLastName,
  kanaFirstName: kanaFirstName,
  year: faker.random.number({ min: 1900, max: 2020 }).toString(),
  month: (faker.random.number(11) + 1).toString(),
  date: faker.random.number(28).toString(),
  email: faker.internet.email(),
  tel: faker.phone.phoneNumber(),
  region: faker.address.state(),
  locality: `${faker.address.city()}${faker.address.streetAddress(true)}`,
  password: password,
  rePassword: faker.random.boolean() ? password : faker.internet.password(),
};
