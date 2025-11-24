import type { // @ts-types="preact"
ButtonHTMLAttributes, ComponentChildren } from "preact";

export interface ButtonProps extends ButtonHTMLAttributes {
  id?: string;
  onClick?: () => void;
  children?: ComponentChildren;
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      class="px-2 py-1 border-gray-500 border-2 rounded-sm bg-white hover:bg-gray-200 transition-colors"
    />
  );
}
