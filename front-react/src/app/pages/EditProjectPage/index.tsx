import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Project } from "@awex-api";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  deleteProject,
  getProjects,
  updateProject,
} from "@store/projects/slice";
import {
  EditProjectForm,
  EditProjectFormData,
} from "@components/EditProjectForm";
import { EditProjectFooter } from "./EditProjectFooter";
import { EditProjectHeader } from "./EditProjectHeader";
import { toast } from "react-hot-toast";

export function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const { project, loading } = useAppSelector((state) => {
    const { loading, data } = state.projects;
    let project: Project | undefined = undefined;
    if (data !== undefined && projectId !== undefined) {
      project = data[projectId];
    }
    return { loading, project };
  });

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleDeleteBtnClick = () => {
    if (projectId) {
      dispatch(deleteProject({ id: projectId }));
      toast("Проект удален!");
    }
    navigate("/projects");
  };

  const handleSubmit = (formData: EditProjectFormData) => {
    if (projectId) {
      dispatch(updateProject({ id: projectId, project: formData }));
      toast("Проект обновлен!");
    }
  };

  if (!project && !loading) {
    navigate("/projects", { replace: true });
    return null;
  }

  return (
    <div className="wrapper">
      <section className="my-projects">
        <div className="my-projects__header">
          <h1 className="my-projects__title main-title">Мои проекты</h1>

          <div
            className="my-projects__added"
            role="button"
            onClick={handleDeleteBtnClick}
          >
            <img
              className="my-projects__added-img"
              src="/img/icons/trash.svg"
              alt="trash"
            />

            <span className="my-projects__added-descr">Удалить проект</span>
          </div>
        </div>

        <h2 className="main-title" hidden>
          окно проекта
        </h2>

        <EditProjectForm
          project={project}
          onSubmit={handleSubmit}
          header={<EditProjectHeader project={project} />}
          footer={<EditProjectFooter />}
        />
      </section>
    </div>
  );
}
