import {
  Popover,
  ContentRenderer,
  PopoverPosition,
  PopoverAlign,
  ArrowContainer,
} from "react-tiny-popover";
import style from "./style.module.css";
import { CSSProperties } from "react";

export interface EditRolesPopoverProps {
  isOpen: boolean;
  positions?: PopoverPosition[];
  padding?: number;
  align?: PopoverAlign;
  children: JSX.Element;
  renderContent: () => JSX.Element;
  onClickOutside?: (e: MouseEvent) => void;
}

export function EditRolesPopover(props: EditRolesPopoverProps) {
  const renderPopoverContent: ContentRenderer = ({
    position,
    childRect,
    popoverRect,
  }) => {
    let arrowClassName: string | undefined;
    switch (position) {
      case "top": {
        arrowClassName = style["arrow"] + " " + style["arrow--bottom"];
        break;
      }
      case "right": {
        arrowClassName = style["arrow"] + " " + style["arrow--left"];
        break;
      }
      case "bottom": {
        arrowClassName = style["arrow"] + " " + style["arrow--top"];
        break;
      }
      case "left": {
        arrowClassName = style["arrow"] + " " + style["arrow--right"];
        break;
      }
    }

    let arrowStyle: CSSProperties | undefined = undefined;
    switch (position) {
      case "top": {
        arrowStyle = { bottom: "1px" };
        break;
      }
      case "right": {
        arrowStyle = { left: "1px" };
        break;
      }
      case "bottom": {
        arrowStyle = { top: "1px" };
        break;
      }
      case "left": {
        arrowStyle = { right: "1px" };
      }
    }

    return (
      <ArrowContainer
        position={position}
        childRect={childRect}
        popoverRect={popoverRect}
        arrowColor={"var(--light-grey, #d1d1d1)"}
        arrowSize={10}
        arrowStyle={arrowStyle}
        arrowClassName={arrowClassName}
      >
        {props.renderContent()}
      </ArrowContainer>
    );
  };

  return (
    <Popover
      isOpen={props.isOpen}
      positions={props.positions}
      padding={props.padding}
      align={props.align}
      onClickOutside={props.onClickOutside}
      content={renderPopoverContent}
    >
      {props.children}
    </Popover>
  );
}
