import { Container, Filters, Title, TopBar } from "@/components/shared"

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title className="font-extrabold" text="All pizzas" size="lg" />
      </Container>
      <TopBar />

      <Container className="pb-14">
        <div className="flex gap-[60px]">
          {/* FILTERS */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* ITEMS LIST */}
          <div className="flex-1">
            <div className="flex flex-col gap-16"></div>
          </div>
        </div>
      </Container>
    </>
  )
}
