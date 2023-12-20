import React from "react";
import classes from "./AdminApplicationsPage.module.css";

const AdminApplicationsPage: React.FC = () => {
  return (
    <main className="main main--profile-filling">
      <div className={classes.container}>
        {/* <Tabs className={classes["react-tabs"]}>
          <TabList className={classes["react-tabs__tab-list"]}>
            <Tab
              className={classes["react-tabs__tab"]}
              selectedClassName={classes["react-tabs__tab--selected"]}
              disabled
            >
              Обработка депозитов
            </Tab>
            <Tab
              className={classes["react-tabs__tab"]}
              selectedClassName={classes["react-tabs__tab--selected"]}
            >
              Увеличение количества проектов
            </Tab>
            <Tab
              className={classes["react-tabs__tab"]}
              selectedClassName={classes["react-tabs__tab--selected"]}
            >
              Изменение/добавление юр.счета
            </Tab>
            <Tab
              className={classes["react-tabs__tab"]}
              selectedClassName={classes["react-tabs__tab--selected"]}
            >
              Изменение/добавление юр. адреса
            </Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel
            className={classes["react-tabs__tab-panel"]}
            selectedClassName={classes["react-tabs__tab-panel--selected"]}
          >
            <ProjectsIncrease />
          </TabPanel>
        </Tabs> */}
      </div>
    </main>
  );
};

export default AdminApplicationsPage;
