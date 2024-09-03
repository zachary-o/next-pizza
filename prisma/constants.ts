export const categories = [
  { name: "Pizzas" },
  { name: "Combo" },
  { name: "Snacks" },
  { name: "Cocktails" },
  { name: "Coffee" },
  { name: "Beverages" },
  { name: "Desserts" },
]


export const _ingredients = [
    {
      name: 'Cheese edge',
      price: 9,
      imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    },
    {
      name: 'Creamy mozzarella',
      price: 4,
      imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    },
    {
      name: 'Cheeses cheddar and parmesan',
      price: 15,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
    },
    {
      name: 'Hot pepper jalapeño',
      price: 3,
      imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
    },
    {
      name: 'Tender chicken',
      price: 10,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
    },
    {
      name: 'Champignons',
      price: 4,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
    },
    {
      name: 'Ham',
      price: 9,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
    },
    {
      name: 'Spicy pepperoni',
      price: 9,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
    },
    {
      name: 'Hot corizo',
      price: 7,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
    },
    {
      name: 'Gherkins',
      price: 5,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
    },
    {
      name: 'Fresh tomatos',
      price: 2,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
    },
    {
      name: 'Red onions',
      price: 2,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    },
    {
      name: 'Juicy pineapple',
      price: 3,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
    },
    {
      name: 'Italian spices',
      price: 1,
      imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
    },
    {
      name: 'Sweet pepper',
      price: 3,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
    },
    {
      name: 'Feta cubes',
      price: 5,
      imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
    },
    {
      name: 'Meetballs',
      price: 8,
      imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
    },
  ].map((obj, index) => ({id: index + 1, ...obj}))

  export const products = [
    {
      name: "Omlette with ham and mushrooms",
      imageUrl:
        "https://i.ibb.co/QXXrFx3/670cf5ae07ef955972775b6829fb4c79453b2cd1bee0eae6479345fba3655363.png",
      categoryId: 2,
    },
    {
      name: "Omlette with pepperoni",
      imageUrl:
        "https://i.ibb.co/bW2QWB8/71f98c51eafa440f871fd6e49df247534aef117a08eb40924554e2d2175a1835.png",
      categoryId: 2,
    },
    {
      name: "Latte",
      imageUrl:
        "https://i.ibb.co/yWVwY4P/167fd19b67bf5c18031ab8e222f7b9e66fdcbcbb12b7d69cd13f0e8a80e42c15.png",
      categoryId: 5,
    },
    {
      name: "Sandwich with ham and cheese",
      imageUrl:
        "https://i.ibb.co/TMYBTr4/be196e3a18bb7877611ee5297bce77da0762d9796ad915257306d38782b3328d.png",
      categoryId: 3,
    },
    {
      name: "Chicken nuggets",
      imageUrl:
        "https://i.ibb.co/YPx65nY/d3e24efeb4c537941eef0ca990b34c4a12aa918d505aa9673ad964f952fb8013.png",
      categoryId: 3,
    },
    {
      name: "Baked potatoes with sauce 🌱",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp",
      categoryId: 3,
    },
    {
      name: "Dodster",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp",
      categoryId: 3,
    },
    {
      name: "Spicy dodster 🌶️🌶️",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp",
      categoryId: 3,
    },
    {
      name: "Banana milkshake",
      imageUrl:
        "https://i.ibb.co/mN31vCb/963e0af6838bf41bfd21a0e228a8588fc1ad3a23d50c4e7ce21526b63c29912d.png",
      categoryId: 4,
    },
    {
      name: "Caramel and apples milkshake",
      imageUrl:
        "https://i.ibb.co/LY25kKs/f54ae95d69389ecbbebd3c6f5dcde6a94e468775e5feebad1499906aca1d027d.png",
      categoryId: 4,
    },
    {
      name: "Oreo biscuits milkshake",
      imageUrl:
        "https://i.ibb.co/wC5NyHx/a83763033eff5721a0e99f570caf488d9bc350e8537a85472d5c4032990ca2d1.png",
      categoryId: 4,
    },
    {
      name: "Classic milkshake 👶",
      imageUrl:
        "https://i.ibb.co/VYXkYrX/c9855ab371ff1958fd452b3472db752a63943f2fe25ad80e05c959edb84da30c.png",
      categoryId: 4,
    },
    {
      name: "Caramel cappuccino",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp",
      categoryId: 5,
    },
    {
      name: "Coconut latte",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp",
      categoryId: 5,
    },
    {
      name: "Americano",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp",
      categoryId: 5,
    },
  ];