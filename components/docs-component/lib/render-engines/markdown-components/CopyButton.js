'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const react_1 = tslib_1.__importStar(require('react'));
const styled_components_1 = tslib_1.__importDefault(
  require('styled-components'),
);
const react_copy_to_clipboard_1 = tslib_1.__importDefault(
  require('react-copy-to-clipboard'),
);
const react_components_1 = require('@kyma-project/react-components');
const CopyButtonWrapper = styled_components_1.default.div`
  position: absolute;
  top: -10px;
  right: -10px;
  user-select: none;
  z-index: 100;
`;
const StyledIcon = styled_components_1.default(react_components_1.Icon)`
  cursor: pointer;
  width: 28px;
  min-width: 28px;
  height: 28px;
  min-height: 28px;
  padding: 7px 8px 5px;
  border-radius: 100%;
  box-shadow: 0 0 6px 0 rgba(137, 165, 199, 0.42);
  background-color: #fff;
  color: #c9c9c9;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #0073e6;
  }
`;
const ConfirmationWrapper = styled_components_1.default.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  z-index: 99;
  min-width: 120px;
  max-width: 420px;
  background: #32363a;
  font-size: 12px;
  line-height: 12px;
  color: #fff;
  filter: drop-shadow(rgba(0, 0, 0, 0.12) 0 0px 2px);
  box-shadow: 0 0 4px 0 #00000026, 0 12px 20px 0 #00000019;
  border-radius: 3px;
  padding: 6px 10px;
  font-weight: bold;
`;
const CONFIRMATION_VISIBILITY_TIME = 2000;
class CopyButton extends react_1.Component {
  constructor(props) {
    super(props);
    this.toggleConfirmation = showConfirmation => {
      this.setState({
        showConfirmation,
      });
    };
    this.timeout = null;
    this.state = {
      showConfirmation: false,
    };
  }
  scheduleHideConfirmation() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.toggleConfirmation(false);
    }, CONFIRMATION_VISIBILITY_TIME);
  }
  render() {
    const { code, className = '' } = this.props;
    const showConfirmation = this.state.showConfirmation;
    const tooltipDescription = 'Click to copy';
    const copyPopupDescription = 'Copied to clipboard';
    if (showConfirmation) {
      this.scheduleHideConfirmation();
    }
    return react_1.default.createElement(
      CopyButtonWrapper,
      { className: className },
      react_1.default.createElement(
        react_components_1.Tooltip,
        { content: tooltipDescription, orientation: 'bottom' },
        react_1.default.createElement(
          react_copy_to_clipboard_1.default,
          {
            text: code,
            onCopy: () => {
              this.toggleConfirmation(true);
            },
          },
          react_1.default.createElement(
            'span',
            null,
            react_1.default.createElement(StyledIcon, { glyph: 'copy' }),
          ),
        ),
      ),
      showConfirmation &&
        react_1.default.createElement(
          ConfirmationWrapper,
          null,
          copyPopupDescription,
        ),
    );
  }
}
exports.CopyButton = CopyButton;
