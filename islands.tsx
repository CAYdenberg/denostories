// @ts-types="preact"
import { FunctionComponent } from "preact";

import { Menu, type MenuProps } from "./src/components/Menu.tsx";

const Island: FunctionComponent<MenuProps> = (props) => <Menu {...props} />;

export default Island;
