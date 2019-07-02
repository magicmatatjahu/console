import React from "react";
import { Header, ActiveAnchors } from "@kyma-project/documentation-component";
export declare const StyledHeadersNavigation: import("styled-components").StyledComponent<"div", any, {}, never>;
export interface RenderedHeaderProps {
    headers?: Header[];
    className?: string;
    activeAnchors?: ActiveAnchors;
    showNode?: boolean;
}
export declare const RenderedHeader: React.FunctionComponent<RenderedHeaderProps>;
