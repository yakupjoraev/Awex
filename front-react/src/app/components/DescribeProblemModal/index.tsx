import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from "react-hook-form";
import { describeProblemFormSchema } from "./validators";
import classNames from "classnames";

export interface DescribeProblemModalProps {
  open: boolean;
  loading: boolean;
  error?: string;
  onClose: () => void;
  onSubmitProblem: (opts: { problem: string }) => void;
}

export type DescribeProblemModalFormData = {
  problem: string;
};

const DEFAULT_FORM_DATA: DescribeProblemModalFormData = {
  problem: "",
};

export function DescribeProblemModal(props: DescribeProblemModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<DescribeProblemModalFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: yupResolver(describeProblemFormSchema),
  });

  useEffect(() => {
    reset();
  }, [props.open]);

  useEffect(() => {
    if (props.error) {
      setError("root", { message: "NOT IMPLEMENTED!" });
    }
  }, [props.error]);

  const handleDescribeProblemFormSubmit = handleSubmit((formData) => {
    props.onSubmitProblem({ problem: formData.problem });
  });

  return (
    <div className={classNames("modal modal-enter", { show: props.open })}>
      <form
        className="modal-content"
        onSubmit={handleDescribeProblemFormSubmit}
      >
        <div className="modal-content__header">
          <div className="modal-content__header-logo">
            <img src="./img/icons/logo-mini.svg" alt="" />

            <h2>Опишите проблему</h2>
          </div>

          <button
            type="button"
            className="close-modal-btn"
            onClick={props.onClose}
          >
            <img src="./img/icons/close-modal.svg" alt="" />
          </button>
        </div>

        <div className="modal-content__main">
          <p className="modal-content__text">
            Это форма экстренной обратной связи, опишите здесь проблемы и
            напишите E-mail, по которому с вами можно безопасно связаться. Если
            вы подозревает взлом основного E-mail - заведите новый.
          </p>

          <p className="modal-content__text">
            Постарайтесь подробно рассказать о проблеме и уязвимостях, будьте
            внимательны к деталям.
          </p>

          <div className="my-projects__group project-group">
            <textarea
              className="my-projects__input project-textarea"
              placeholder="Опишите проблему"
              disabled={props.loading}
              {...register("problem")}
            ></textarea>
            {renderFieldError(errors, "problem")}
          </div>

          {errors.root && errors.root.message && (
            <div className="modal-content__error">{errors.root.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="modal-content__btn second-btn"
          disabled={props.loading}
        >
          Отправить
        </button>
      </form>
    </div>
  );
}

function renderFieldError(
  errors: FieldErrors<DescribeProblemModalFormData>,
  field: keyof DescribeProblemModalFormData
) {
  const error = errors[field];
  if (!error || !error.message) {
    return null;
  }
  return <div className="project-error">{error.message}</div>;
}
