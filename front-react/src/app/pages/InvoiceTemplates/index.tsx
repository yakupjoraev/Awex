import { AuthorizedService } from "@awex-api"
import { useEffect, useState } from "react"
import { useAppSelector } from "@store/hooks"
import toast from "react-hot-toast"
import { useShortString } from "../../hooks/useShortString"


interface OrderTemplate {
    id: number
    data: {
      userId: number
      name: string
      price: number
      currency: string
      projectId: number
      depositAmount: number
      depositReturnTime: number
    },
    created_at: number
}


export function InvoiceTemplates() {
    const [orderTemplates, setOrderTemplates] = useState<OrderTemplate[]>([])
    const [isOrderTemplatesLoading, setIsOrderTemplatesLoading] = useState<boolean>(false)
    const projects = useAppSelector((state) => state.projects.data)
    const [shortingString, setString, shortString] = useShortString('', 30)


    useEffect(() => {
        getTemplates()
    }, [])


    function getTemplates() {
        if(isOrderTemplatesLoading) return
        setIsOrderTemplatesLoading(true)
        AuthorizedService.getOrderTemplates()
        .then((response) => {
            if(!response || !response.list) return
            setOrderTemplates([...response.list])
        })
        .catch((error) => {
            console.log(error)
            toast.error('Ошибка связи с сервером')
            setOrderTemplates([])
        })
        .finally(() => {
            setIsOrderTemplatesLoading(false)
        })
    }


    return (
        <div className="wrapper">
            <section className="my-projects">
                <div className="my-projects__header">
                    <h1 className="my-projects__title main-title">Мои шаблоны</h1>

                    ####
                </div>

                <div className="my-projects__items-wrapper">
                    <ul className="my-projects__items templates-fix">

                        { orderTemplates && orderTemplates.map((templateData) => {
                            const template = templateData.data
                            const templateName = shortString(template.name)
                            const project = projects ? projects.find((project) => project.id === template.projectId.toString()) : null
                            const projectsName = project ? project.project.name : ''
                            
                            return (
                                <li className="my-projects__item" key={templateData.id}>
                                    <div className="my-projects__item-info">
                                        <h3 className="my-projects__item-title main-title">
                                            { templateName }
                                            <img className="my-projects__item-icon" src="./img/icons/pen.svg" alt="pen" />
                                        </h3>
                                    </div>
                                    
                                    <div className="my-projects__item-convertion">
                                        <div className="my-projects__item-for">
                                            <div className="my-projects__item-text">Сумма:</div>
                                            <div className="my-projects__item-client">
                                                { template.price }
                                                { template.currency }
                                            </div>
                                        </div>

                                       { 'depositAmount' in template && (
                                            <>
                                                <div className="my-projects__item-for">
                                                    <div className="my-projects__item-text">Депозит:</div>
                                                    <div className="my-projects__item-client">
                                                        { template.depositAmount }
                                                    </div>
                                                </div>

                                                <div className="my-projects__item-to">
                                                    <div className="my-projects__item-text">Срок депозита:</div>
                                                    <div className="my-projects__item-client">{ template.depositReturnTime } день</div> {/* Add endings!!! */}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="my-projects__item-convertion">
                                        <div className="my-projects__item-for">
                                            <div className="my-projects__item-text">Конвертация в:</div>
                                            <div className="my-projects__item-currency">
                                                <img className="my-projects__item-pic" src="./img/actives/actives-1.png" alt="" />
                                                <span className="my-projects__item-curr">USDT</span> {/* No Data */}
                                            </div>
                                        </div>

                                        <div className="my-projects__item-to">
                                            <div className="my-projects__item-text">Комиссию платит:</div>
                                            <div className="my-projects__item-client">клиент</div> {/* No Data */}
                                        </div>

                                        <div className="my-projects__item-to">
                                            <div className="my-projects__item-text">Проект:</div>
                                            <div className="my-projects__item-client">{ projectsName }</div>
                                        </div>
                                    </div>

                                    <a className="my-projects__item-btn second-btn" href="#">Выбрать шаблон</a>
                                </li>
                            )
                        }) }

                    </ul>
                </div>
            </section>
        </div>
    )
}