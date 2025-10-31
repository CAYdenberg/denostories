import type { FunctionComponent } from "preact";

import {
  CheckCheck,
  ChevronRight,
  File,
  type LucideProps,
  Search,
  ShieldAlert,
} from "lucide-preact";
export const FileIcon = File as FunctionComponent<LucideProps>;
export const SearchIcon = Search as FunctionComponent<LucideProps>;
export const ChevronIcon = ChevronRight as FunctionComponent<LucideProps>;
export const FailureIcon = ShieldAlert as FunctionComponent<LucideProps>;
export const SuccessIcon = CheckCheck as FunctionComponent<LucideProps>;
