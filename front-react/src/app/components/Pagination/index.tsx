
const NUMBER_OF_ADJACENT_PAGES = 2

export interface PaginationPropsType {
    currentPage: number,
    pages: number,
    goToPage: (page: number)=>void
}

export function Pagination({currentPage, pages, goToPage}: PaginationPropsType) {

    let items = []

    if(pages > 0) {       
        if(currentPage - NUMBER_OF_ADJACENT_PAGES - 1 > 0) {
            items.push({id: 1, Element: ()=>(
                <>
                    <PageItem page={1} />
                    { currentPage - NUMBER_OF_ADJACENT_PAGES - 2 !== 0 && ( <Arrow />) }
                </>
                )}
            )
        }

        for(let i = 1; i <= pages; i++) {
            if(
                (i >= (currentPage - NUMBER_OF_ADJACENT_PAGES) ) &&
                (i <= (currentPage + NUMBER_OF_ADJACENT_PAGES))
            ) {
                items.push({id: i, Element: ()=>(
                    <PageItem page={i} />
                    )}
                )
            }
        }

        if(currentPage + NUMBER_OF_ADJACENT_PAGES < pages) {
            items.push({id: pages, Element: ()=>(
                <>
                    { currentPage + NUMBER_OF_ADJACENT_PAGES + 1 !== pages && ( <Arrow />) }
                    <PageItem page={pages} />
                </>
                )}
            )
        }
    }

    function itemClick(indx: number): void {
        indx !== currentPage && goToPage(indx)
    }

    function PageItem({page}: {page: number}) {
        return (
            <div className={`page-list__item${page === currentPage ? ' active' : ''}`}>
                <a className="page-list__link"
                    onClick={() => itemClick(page)}
                >
                    { page }
                </a>
            </div>
        )
    }

    function Arrow() {
        return (
            <div className="page-list__item">
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.084 5.176L0.38 9.176V7.976L5.5 4.856L0.38 1.72V0.552L7.084 4.584V5.176Z" fill="#292421" />
                </svg>
            </div>
        )
    }

    return (
        <div className="page-list">
            { items.map(({id, Element}) => {
                return (
                    <Element key={id} />
                )
            }) }            
        </div>
    )
}