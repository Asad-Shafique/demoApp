import {faker} from '@faker-js/faker';

import {IListItem} from '../screens/list';

//
//

const list_data: IListItem[] = [];
const size:number = 20;

const generateListData = (size: number, pageNumber: number): IListItem[] => {
  const list_data: IListItem[] = [];

  const startingIndex = (pageNumber - 1) * size + 1;
  const endingIndex = pageNumber * size;
  for (let index = startingIndex; index <= endingIndex; index++) {
    const price = faker.commerce.price();
    const priceInt = parseFloat(faker.commerce.price());

    list_data.push({
      id: index,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: price,
      salePrice: faker.helpers.maybe(
        () => faker.commerce.price(priceInt * 0.5, priceInt * 0.9),
        { probability: 0.1 },
      ),
      brand: faker.company.name(),
    });
  }

  return list_data;
};

//Below code was time consuming, as it loading all item once
// we implemented pagination to solve this problem

// const listData = generateListData(pageSize, pageNumber);
// console.log(listData);
// for (let index = 0; index < 1500; index++) {
//   const price = faker.commerce.price();
//   const priceInt = parseFloat(faker.commerce.price());
//   //id was declared as string, so index.toString() fixed the typo error.
//   list_data.push({
//     id: index.toString(),
//     name: faker.commerce.productName(),
//     description: faker.commerce.productDescription(),
//     price: price,
//     salePrice: faker.helpers.maybe(
//       () => faker.commerce.price(priceInt * 0.5, priceInt * 0.9),
//       {probability: 0.1},
//     ),
//     brand: faker.company.name(),
//   });
// }

export default generateListData;
