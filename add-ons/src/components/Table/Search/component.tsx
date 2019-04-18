import React from "react";

interface Props {
  text: string
}

const Component: React.FunctionComponent<Props> = () => (
  <span className="fd-inline-help fd-has-float-right">
    <span className="fd-inline-help__content fd-inline-help__content--bottom-left">
      dupa
    </span>
  </span>
);

export default Component;