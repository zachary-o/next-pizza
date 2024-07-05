import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared"

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title className="font-extrabold" text="All pizzas" size="lg" />
      </Container>
      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* FILTERS */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* ITEMS LIST */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Pizzas"
                items={[
                  {
                    id: 1,
                    name: "Cheesburger pizza",
                    imageUrl:
                      "https://cdn.papajohns.pl/images/catalog/thumbs/cart/545fb5ced52c3f2ae0cb39e551d6aeb0.webp",
                    price: 15,
                    items: [{ price: 15 }],
                  },
                  {
                    id: 1,
                    name: "Cheesburger pizza",
                    imageUrl:
                      "https://cdn.papajohns.pl/images/catalog/thumbs/cart/545fb5ced52c3f2ae0cb39e551d6aeb0.webp",
                    price: 15,
                    items: [{ price: 15 }],
                  },
                  {
                    id: 1,
                    name: "Cheesburger pizza",
                    imageUrl:
                      "https://cdn.papajohns.pl/images/catalog/thumbs/cart/545fb5ced52c3f2ae0cb39e551d6aeb0.webp",
                    price: 15,
                    items: [{ price: 15 }],
                  },
                  {
                    id: 1,
                    name: "Cheesburger pizza",
                    imageUrl:
                      "https://cdn.papajohns.pl/images/catalog/thumbs/cart/545fb5ced52c3f2ae0cb39e551d6aeb0.webp",
                    price: 15,
                    items: [{ price: 15 }],
                  },
                  {
                    id: 1,
                    name: "Cheesburger pizza",
                    imageUrl:
                      "https://cdn.papajohns.pl/images/catalog/thumbs/cart/545fb5ced52c3f2ae0cb39e551d6aeb0.webp",
                    price: 15,
                    items: [{ price: 15 }],
                  },
                ]}
                categoryId={0}
              />
              <ProductsGroupList
                title="Snacks"
                items={[
                  {
                    id: 1,
                    name: "Cheesburger pizza",
                    imageUrl:
                      "https://cdn.papajohns.pl/images/catalog/thumbs/cart/545fb5ced52c3f2ae0cb39e551d6aeb0.webp",
                    price: 15,
                    items: [{ price: 15 }],
                  },
                  {
                    id: 1,
                    name: "Cheesburger pizza",
                    imageUrl:
                      "https://cdn.papajohns.pl/images/catalog/thumbs/cart/545fb5ced52c3f2ae0cb39e551d6aeb0.webp",
                    price: 15,
                    items: [{ price: 15 }],
                  },
                  {
                    id: 1,
                    name: "Cheesburger pizza",
                    imageUrl:
                      "https://cdn.papajohns.pl/images/catalog/thumbs/cart/545fb5ced52c3f2ae0cb39e551d6aeb0.webp",
                    price: 15,
                    items: [{ price: 15 }],
                  },
                  {
                    id: 1,
                    name: "Cheesburger pizza",
                    imageUrl:
                      "https://cdn.papajohns.pl/images/catalog/thumbs/cart/545fb5ced52c3f2ae0cb39e551d6aeb0.webp",
                    price: 15,
                    items: [{ price: 15 }],
                  },
                  {
                    id: 1,
                    name: "Cheesburger pizza",
                    imageUrl:
                      "https://cdn.papajohns.pl/images/catalog/thumbs/cart/545fb5ced52c3f2ae0cb39e551d6aeb0.webp",
                    price: 15,
                    items: [{ price: 15 }],
                  },
                ]}
                categoryId={0}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
