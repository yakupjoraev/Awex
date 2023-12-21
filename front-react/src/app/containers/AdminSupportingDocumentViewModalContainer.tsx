import AdminDocumentsViewModal from "@components/AdminDocumentsViewModal";

export interface AdminSupportingDocumentViewModalContainerProps {
  open: boolean;
  onClose: () => void;
  fileName: string;
}

export function AdminSupportingDocumentsViewModalContainer(
  props: AdminSupportingDocumentViewModalContainerProps
) {
  return (
    <AdminDocumentsViewModal
      open={props.open}
      onClose={props.onClose}
      fileName={props.fileName}
    />
  );
}
