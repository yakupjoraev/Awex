import { BlockProfileModal } from "@components/BlockProfileModal"
import { useState } from "react"


export interface BlockProfileModalContainerProps {
  open: boolean
  onClose: () => void
}


export function BlockProfileModalContainer(props: BlockProfileModalContainerProps) {
  const [loading, setLoading] = useState(false)

  return (
    <BlockProfileModal
      open={props.open}
      loading={loading}
      onClose={props.onClose}
    />
  )
}