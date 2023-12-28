import { CommonService } from "@awex-api"
import { BlockProfileModal } from "@components/BlockProfileModal"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"


export interface BlockProfileModalContainerProps {
  open: boolean
  onClose: () => void
}


export function BlockProfileModalContainer(props: BlockProfileModalContainerProps) {
  const [loading, setLoading] = useState(false)


  const handleSubmitBlock = (opts: { problem: string }) => {
    // setError("not implemented")
  }


  return (
    <BlockProfileModal
      open={props.open}
      loading={loading}
      onClose={props.onClose}
      onSubmitProblem={handleSubmitBlock}
    />
  )
}