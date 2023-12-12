import { AuthorizedService } from "@awex-api"
import { useEffect, useState } from "react"
import { useAppSelector } from "@store/hooks"
import toast from "react-hot-toast"
import { useShortString } from "../../hooks/useShortString"
import { useDebounce } from 'usehooks-ts'
import { useNavigate } from "react-router-dom"
import usePortal from "react-useportal"
import { ConfirmationModal } from "@components/ConfirmationModal"

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

type InvoiceStates = 'new' | 'edit' | 'template'

interface OrderTemplateData {
    process: InvoiceStates
    template: OrderTemplate
}

export function InvoiceTemplates() {
    const [orderTemplates, setOrderTemplates] = useState<OrderTemplate[]>([])
    const [isOrderTemplatesLoading, setIsOrderTemplatesLoading] = useState<boolean>(false)
    const projects = useAppSelector((state) => state.projects.data)
    const [shortingString, setString, shortString] = useShortString('', 30)
    const [searchFilter, setSearchFilter] = useState<string>('')
    const searchFilterDebounce = useDebounce<string>(searchFilter, 200)
    const [orderTemplatesFiltered, setOrderTemplatesFiltered] = useState<OrderTemplate[]>([])
    const navigate = useNavigate()
    const { Portal } = usePortal()
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false)
    const [deleteConfirmationId, setDeleteConfirmationId] = useState<number>(0)
    const [confirmationModalText, setConfirmationModalText] = useState<string>('')


    useEffect(() => {
        getTemplates()
    }, [])

    useEffect(() => {
        filterOrderTemplates()
    }, [orderTemplates, searchFilterDebounce])



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

    function onSearch(event: any) {
        setSearchFilter(event.target.value)
    }

    function filterOrderTemplates() {
        if(searchFilter === '') {
            setOrderTemplatesFiltered([...orderTemplates])
            return
        }
        const filteredTemplates = orderTemplates.filter((item) => {
            return item.data.name.indexOf(searchFilter) >= 0
        })
        setOrderTemplatesFiltered(filteredTemplates)
    }

    function editTemplate(template: OrderTemplate) {
        const orderTemplateData: OrderTemplateData = {
            process: 'edit',
            template
        }
        openInvoicePage(orderTemplateData)
    }

    function openTemplate(template: OrderTemplate) {
        const orderTemplateData: OrderTemplateData = {
            process: 'template',
            template
        }
        openInvoicePage(orderTemplateData)
    }

    function openInvoicePage(templateData: {process: InvoiceStates, template: OrderTemplate}) {
        navigate("/invoice", { state: { templateData } })
    }

    function deleteTemplate(templateId: number, name: string) {
        console.log('del templateId', templateId)
        const confirmText = `Вы действительно хотите удалить шаблон "${name}"?`
        setConfirmationModalText(confirmText)
        setDeleteConfirmationId(templateId)
        setIsOpenConfirmationModal(true)
    }

    function deleteTemplateConfirmation(id: number, ansver: boolean) {
        if(!ansver) {
            toast.error('Удаление отменено')
            setIsOpenConfirmationModal(false)
            return
        }
        AuthorizedService.deleteOrderTemplate(id.toString())
        .then((response) => {
            if(!response) {
                toast.error('Произошла непредвиденная ошибка. Попробуйте повторить действие позже')
                return
            }
            toast.success('Шаблон успешно удален')
        })
        .catch((error) => {
            console.error(error)
            toast.error('Не удалось удалить. Проверьте соединение с интернетом и повторте попытку')
        })
        .finally(() => {
            setIsOpenConfirmationModal(false)
            setDeleteConfirmationId(0)
            setConfirmationModalText('')
            getTemplates()
        })
    }


    return (
        <div className="wrapper">
            <section className="my-projects">
                <div className="my-actives__header">
                    <h1 className="my-actives__title main-title">Мои шаблоны</h1>

                    <div className="my-actives__search search-group">
                        <input className="my-actives__src search-input"
                            type="search"
                            placeholder="Поиск"
                            value={searchFilter}
                            onChange={onSearch}
                        />
                        <img className="my-actives__search-img search-img" src="./img/icons/search.svg" alt="Поиск" />
                    </div>
                </div>
                

                <div className="my-projects__items-wrapper">
                    <ul className="my-projects__items templates-fix">

                        { orderTemplatesFiltered && projects && orderTemplatesFiltered.map((templateData) => {
                            const template = templateData.data
                            const templateName = shortString(template.name)
                            const project = projects ? projects.find((project) => project.id === template.projectId.toString()) : null
                            const projectsName = project ? project.project.name : ''
                            
                            return (
                                <li className="my-projects__item" key={templateData.id}>
                                    <div className="my-projects__item-info">
                                        <h3 className="my-projects__item-title main-title">
                                            { templateName }
                                            <img className="my-projects__item-icon" src="./img/icons/pen.svg" alt="pen"
                                                onClick={() => editTemplate(templateData)}
                                            />
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

                                    <div className="custom_buttons">
                                        <button className="my-projects__item-btn second-btn"
                                            onClick={() => openTemplate(templateData)}
                                        >
                                            Выбрать шаблон
                                        </button>

                                        <button className="my-projects__item-btn main-btn"
                                            onClick={() => deleteTemplate(templateData.id, templateData.data.name)}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </li>
                            )
                        }) }

                    </ul>
                </div>
            </section>

            <Portal>
                <ConfirmationModal
                    isOpen={isOpenConfirmationModal}
                    text={confirmationModalText}
                    data={deleteConfirmationId}
                    ansver={deleteTemplateConfirmation}
                />
            </Portal>
        </div>
    )
}