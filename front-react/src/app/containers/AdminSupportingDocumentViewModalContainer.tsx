import { AuthorizedService } from "@awex-api";
import AdminDocumentsViewModal from "@components/AdminDocumentsViewModal";
import SupportingDocumentsForOfficeAddressModal from "@components/SupportingDocumentsForOfficeAddressModal";
import { useEffect, useState } from "react";

export interface AdminSupportingDocumentViewModalContainerProps {
  open: boolean;
  onClose: () => void;
  img: string;
}

export function AdminSupportingDocumentsViewModalContainer(
  props: AdminSupportingDocumentViewModalContainerProps
) {
  return (
    <AdminDocumentsViewModal
      open={props.open}
      onClose={props.onClose}
      img={props.img}
    />
  );
}
