import { Component, ComponentChildren } from "preact";

interface Props {
  storyTitle: string;
  children: ComponentChildren;
}

interface State {
  message: string;
}

export class RenderedComponentMessage extends Component<Props, State> {
  constructor() {
    super();
    this.state = { message: "" };
  }

  static override getDerivedStateFromError(error: Error | unknown) {
    const message = error instanceof Error
      ? error.message
      : `An unknown error occurred`;
    return { message };
  }

  override componentDidCatch(error: Error | unknown) {
    const message = error instanceof Error
      ? error.message
      : `An unknown error occurred`;
    this.setState({ message });
  }

  override render(props: Props) {
    if (this.state.message) {
      return (
        <div class="ds-message">
          {this.state.message}: {props.storyTitle}
        </div>
      );
    }
    return props.children;
  }
}
