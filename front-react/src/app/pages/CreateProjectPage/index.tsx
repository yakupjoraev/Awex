import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  EditProjectForm,
  EditProjectFormData,
} from "@components/EditProjectForm";
import { CreateProjectFooter } from "./CreateProjectFooter";
import { useAppDispatch } from "@store/hooks";
import { createProject } from "@store/projects/slice";
import { toast } from "react-hot-toast";

export function CreateProjectPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCancelBtnClick = () => {
    navigate("/projects");
  };

  const handleSubmit = (formData: EditProjectFormData) => {
    dispatch(createProject({ project: formData }));
    toast("Проект создан!");
    navigate("/projects");
  };

  return (
    <div className="wrapper">
      <Helmet title="Добавление проекта" />
      <section className="my-projects">
        <div className="my-projects__header">
          <h1 className="my-projects__title main-title">Добавление проекта</h1>
        </div>

        <h2 className="main-title" hidden>
          окно проекта
        </h2>

        <EditProjectForm
          footer={<CreateProjectFooter onCancel={handleCancelBtnClick} />}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}
