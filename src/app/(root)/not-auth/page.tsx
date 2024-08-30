import { InfoBlock } from "@/components/shared"

export default function NotAuth() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Access denied"
        text="This page can be viewed by authenticated users"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  )
}
