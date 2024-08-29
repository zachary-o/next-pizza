import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { CircleUser, User } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

interface Props {
  onClickSignIn?: () => void
  className?: string
}

export const ProfileButton: React.FC<Props> = ({
  onClickSignIn,
  className,
}) => {
  const { data: session } = useSession()

  return (
    <div className={className}>
      {!session ? (
        <Button
          variant="outline"
          className="flex items-center gap-3"
          onClick={onClickSignIn}
        >
          <User size={16} />
          Login
        </Button>
      ) : (
        <Link href="/profile">
          <Button className="flex otems-center gap-2" variant="secondary">
            <CircleUser size={18} />
            Profile
          </Button>
        </Link>
      )}
    </div>
  )
}
