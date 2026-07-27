import { Meta, StoryObj } from "@storybook/react-vite";
import {
  ContextProvider,
  ContextSelector,
  ContextSearch,
  ContextSelectEvent,
} from "@equinor/fusion-react-context-selector/src";
import { Typography } from "@equinor/eds-core-react";
import { _exampleResolver } from "./context-selector.helpers";

const meta: Meta<typeof ContextSearch> = {
  title: "data/ContextSelector",
  component: ContextSelector,
};

export default meta;

type Story = StoryObj<typeof ContextSearch>;

export const ContextHeader: Story = {
  args: {
    placeholder: "Start to type to search...",
    initialText: "The initial text result",
    variant: "header",
    dropdownHeight: "300px",
    onSelect: (e: ContextSelectEvent) => {
      e.stopPropagation();
      console.log("Event", e.type, "fired. Object:", e);
    },
    onClearContext: () => {
      console.log("Context Clearing");
    },
  },
  render: (args) => (
    <ContextProvider resolver={_exampleResolver}>
      <ContextSearch {...args} />
    </ContextProvider>
  ),
};

/**
 * `topLayer` defaults to `true` for context selector results (see the
 * "Rendering above arbitrary Fusion app stacking contexts" section in the package
 * README), so results render in the browser's top layer and can't be clipped or
 * hidden behind app content with its own stacking context. Pass `topLayer={false}`
 * to opt back into the previous shadow-DOM-relative, absolutely positioned behavior.
 */
export const ContextHeaderTopLayerDisabled: Story = {
  ...ContextHeader,
  args: {
    ...ContextHeader.args,
    topLayer: false,
  },
  render: (args) => (
    <div
      style={{
        position: "relative",
        transform: "translateZ(0)",
        padding: "2rem 1rem 260px",
        border: "1px dashed gray",
      }}
    >
      <Typography style={{ margin: "0 0 1rem" }}>
        This box creates its own stacking context via transform: translateZ(0).
        The overlay directly below the input uses z-index: 999, exactly where
        the result list opens. Toggle topLayer in the Controls panel to compare.
      </Typography>
      <div style={{ position: "relative" }}>
        <ContextProvider resolver={_exampleResolver}>
          <ContextSearch {...args} />
        </ContextProvider>
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            height: "200px",
            zIndex: 999,
            background: "rgba(226, 6, 44, 0.25)",
            textAlign: "center",
            paddingTop: "0.5rem",
          }}
        >
          <Typography>
            Overlay with its own stacking context (z-index: 999)
          </Typography>
        </div>
      </div>
    </div>
  ),
};
