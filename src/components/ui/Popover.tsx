import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

interface PopoverContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

function usePopoverContext() {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error("Popover compound components must be used within <Popover>");
  }
  return ctx;
}

interface PopoverProps {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean; // controlled mode
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const triggerRef = useRef<HTMLElement>(null);

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  return (
    <PopoverContext.Provider value={{ isOpen, open, close, toggle, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps {
  children: React.ReactElement<any>;
}

Popover.Trigger = function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { toggle, triggerRef } = usePopoverContext();

  return React.cloneElement(children, {
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      toggle();
    },
    "aria-haspopup": "dialog",
  });
};

interface PopoverContentProps {
  children: ReactNode;
  placement?: "bottom" | "top" | "left" | "right";
  offset?: number;
  className?: string;
}

Popover.Content = function PopoverContent({
  children,
  placement = "bottom",
  offset = 2,
  className = "",
}: PopoverContentProps) {
  const { isOpen, close, triggerRef } = usePopoverContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  // Position relative to trigger
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "bottom":
        top = rect.bottom + scrollY + offset;
        left = rect.left + scrollX;
        break;
      case "top":
        top = rect.top + scrollY - offset;
        left = rect.left + scrollX;
        break;
      case "right":
        top = rect.top + scrollY;
        left = rect.right + scrollX + offset;
        break;
      case "left":
        top = rect.top + scrollY;
        left = rect.left + scrollX - offset;
        break;
    }

    setCoords({ top, left });
  }, [isOpen, placement, offset, triggerRef]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close, triggerRef]);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      role="dialog"
      style={{
        position: "absolute",
        top: coords.top,
        left: coords.left,
        zIndex: 50,
      }}
      className={className}
    >
      {children}
    </div>,
    document.body
  );
};