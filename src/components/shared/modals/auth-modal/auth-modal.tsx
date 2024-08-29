import { Button, Dialog, DialogContent } from "@/components/ui"
import { signIn } from "next-auth/react"
import React from "react"

interface Props {
  open: boolean
  onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose()
  }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        FORM
        <hr />
        <div className="flex gap-2">
          <Button
            className="gap-2 h-12 p-2 flex-1"
            variant="secondary"
            type="button"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/",
                redirect: true,
              })
            }
          >
            <img
              className="w-6 h-6"
              src="https://github.githubassets.com/favicons/favicon.svg"
            />
            GitHib
          </Button>

          <Button
            className="gap-2 h-12 p-2 flex-1"
            variant="secondary"
            type="button"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
