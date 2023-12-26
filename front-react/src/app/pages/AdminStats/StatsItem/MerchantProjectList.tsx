import { ProjectList } from "@awex-api";
import React from "react";
import MerchantProjectCard from "./MerchantProjectCard";

interface IProps {
  projects: ProjectList[];
}

const MerchantProjectList: React.FC<IProps> = ({ projects }) => {
  return (
    <ul className="my-projects__items">
      {projects?.map((project) => (
        <MerchantProjectCard key={project.id} project={project?.data!} />
      ))}
    </ul>
  );
};

export default MerchantProjectList;
