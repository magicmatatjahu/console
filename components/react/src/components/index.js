// this is the primary export for Blocks
// All components are exported from lib/index.js

import Button from './Button';
import Dropdown from './Dropdown';
import ErrorBoundary from './ErrorBoundary';
import Input from './Forms/Input';
import Select from './Forms/Select';
import Checkbox from './Forms/Checkbox';
import JsonSchemaForm from './Forms/JSONSchema';
import Header from './Header';
import H1 from './Header/H1';
import H2 from './Header/H2';
import H3 from './Header/H3';
import H4 from './Header/H4';
import Label from './Label';
import Icon from './Icon';
import Markdown from './Markdown';
import Modal from './Modal';
import InformationModal from './Modal/Information';
import ConfirmationModal from './Modal/Confirmation';
import StepsModal from './Modal/Steps';
import Notification from './Notification';
import NotificationMessage from './NotificationMessage';
import Paragraph from './Paragraph';
import Search from './Search';
import Separator from './Separator';
import Spinner from './Spinner';
import Tabs from './Tabs';
import Tab from './Tabs/Tab';
import Table from './Table';
import Text from './Text';
import ThemeWrapper from './ThemeWrapper';
import Token from './Token';
import Toolbar from './Toolbar';
import Tooltip from './Tooltip';
import { MenuItem, MenuList, Menu } from '../fundamentals-react/Menu/Menu';
import { Panel, PanelBody } from '../fundamentals-react/Panel/Panel';
import {
  FormFieldset,
  FormItem,
  FormInput,
  FormLabel as FrmLb,
} from '../fundamentals-react/Forms/Forms';

import 'fiori-fundamentals/dist/fiori-fundamentals.min.css';
import styled from 'styled-components';

const FormLabel = styled(FrmLb)`
  padding-right: 20px;
`;
module.exports = {
  Button,
  Dropdown,
  ErrorBoundary,
  Input,
  Select,
  Checkbox,
  JsonSchemaForm,
  Header,
  H1,
  H2,
  H3,
  H4,
  Label,
  Icon,
  Markdown,
  Modal,
  InformationModal,
  ConfirmationModal,
  StepsModal,
  Notification,
  NotificationMessage,
  Paragraph,
  Search,
  Separator,
  Spinner,
  Tabs,
  Tab,
  Table,
  Text,
  ThemeWrapper,
  Token,
  Toolbar,
  Tooltip,
  MenuItem,
  Menu,
  MenuList,
  FormFieldset,
  FormItem,
  FormInput,
  FormLabel,
  Panel,
  PanelBody,
};
