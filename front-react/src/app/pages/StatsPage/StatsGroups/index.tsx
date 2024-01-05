

export default function StatsGroups() {

    return (
        <div className="stats__groups">
            <div className="stats__group">
                <h2 className="stats__title main-title"> Счета </h2>
                <img src="/img/stats-pic.svg" alt="" />
            </div>

            <div className="stats__group">
                <h2 className="stats__title main-title"> Депозиты </h2>

                <div className="stats__counts">
                    <div className="stats__count">
                        Всего
                        <span>256</span>
                    </div>

                    <div className="stats__count">
                        В работе
                        <span>125</span>
                    </div>

                    <div className="stats__count">
                        Завершенные
                        <span>100</span>
                    </div>
                </div>
            </div>
        </div>
    )
}