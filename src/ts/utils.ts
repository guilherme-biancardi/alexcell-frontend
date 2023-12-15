import type { Icon } from '@/components/utils/IconComponent.vue';
import axios, { AxiosHeaders, type AxiosRequestConfig } from 'axios';
import type { MaskInputOptions } from 'maska';
import type { ButtonHTMLAttributes, InputHTMLAttributes } from 'vue';

type InputHTMLTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export interface Input {
  name: string;
  type: InputHTMLTypeAttribute;
  value: string | number | undefined;
  attributes?: InputHTMLAttributes;
  icon?: Icon;
  mask?: string;
  maskOptions?: MaskInputOptions;
  maskTokens?: string;
  label?: string;
}

type InputKeys = keyof Input;

const useInput = (
  name: string,
  type: Input['type'] = 'text',
  value: Input['value'] = undefined
) => {
  const input: Map<InputKeys, Input[InputKeys]> = new Map();

  input.set('name', name);
  input.set('type', type);
  input.set('value', value);

  const setAttributes = (attrs: Input['attributes']) => input.set('attributes', attrs);
  const setIcon = (icon: Input['icon']) => input.set('icon', icon);
  const setMask = (mask: string) => input.set('mask', mask);
  const setMaskOptions = (options: Input['maskOptions']) => input.set('maskOptions', options);
  const setMaskTokens = (tokens: Input['maskTokens']) => input.set('maskTokens', tokens);
  const setLabel = (label: string) => input.set('label', label);

  return {
    setAttributes,
    setIcon,
    setMask,
    setMaskOptions,
    setMaskTokens,
    setLabel,
    get: () => Object.fromEntries(input) as unknown as Input
  };
};

export interface ButtonStyle {
  backgroundColor?: string;
  color?: string;
}

export interface Button {
  text?: string;
  type?: ButtonHTMLAttributes['type'];
  attributes?: ButtonHTMLAttributes;
  maxWidth?: number;
  hover?: ButtonStyle;
  buttonStyle?: ButtonStyle;
  icon?: Icon;
  invertIcon?: boolean;
  visible?: boolean;
  click?: () => void;
}

type ButtonKeys = keyof Button;

const useButton = (type: Button['type'] = 'button', text = '') => {
  const button: Map<ButtonKeys, Button[ButtonKeys]> = new Map();

  button.set('text', text);
  button.set('type', type);
  button.set('visible', true);

  const setAttributes = (attrs: Button['attributes']) => button.set('attributes', attrs);
  const setIcon = (icon: Button['icon']) => button.set('icon', icon);
  const setHover = (hover: Button['hover']) => button.set('hover', hover);
  const setStyle = (style: Button['buttonStyle']) => button.set('buttonStyle', style);
  const setClick = (click: Button['click']) => button.set('click', click);
  const setVisible = (visible: boolean) => button.set('visible', visible);

  const maxWidth = (maxWidth: number) => button.set('maxWidth', maxWidth);
  const invertIcon = () => button.set('invertIcon', true);

  return {
    setHover,
    setAttributes,
    setStyle,
    maxWidth,
    setIcon,
    setClick,
    invertIcon,
    setVisible,
    get: () => Object.fromEntries(button) as unknown as Button
  };
};

const useRequest = (headers?: AxiosRequestConfig['headers']) => ({
  request: axios.create({ baseURL: import.meta.env.VITE_API_URL, headers })
});

export const useUtil = () => ({
  useInput,
  useButton,
  useRequest
});
