import { useState } from "react"

type Props = {
    open: boolean,
    key: string,
    data: any
}
export const useModal = (props: Props = { open: false, key: "", data: null }) => {
    const [modal, setModal] = useState<Props>(props)
    return [modal, setModal] as const
}