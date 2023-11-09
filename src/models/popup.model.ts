import { RefObject } from 'react';
import { Props } from './core.model';

export type usePopupProps = {
  containerElement: RefObject<HTMLElement>;
} & Pick<Props, 'popupGap'>;

export type ContentType = 'image' | 'text';

export type PopupProps = {
  type?: ContentType;
  data?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

export type popupDimensions = {
  width: number;
  height: number;
};

export type PopupPosition = 'top' | 'bottom' | 'left' | 'right';

// Define the type for the dimensions of the popup
export type PopupDimensions = {
  width: number;
  height: number;
};

export type TargetRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type UsePopupProps = {
  containerElement: React.RefObject<HTMLElement>;
  popupGap?: number; // Optional, will default to 0 if not provided
};

// Type for the active popup's state
export type ActivePopupState = {
  type: ContentType;
  data: string;
  dimensions: PopupDimensions;
  position: PopupPosition;
  targetRect: TargetRect;
};
