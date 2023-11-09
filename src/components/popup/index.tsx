import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { styleobjectToCssText } from '../../effects/utils';
import { PopupProps } from '../../models/popup.model';
import styles from './popup.module.scss';

type PopupPlaceholderProps = {
  id: string;
};

/**
 * Creates a placeholder element for a popup component.
 * @param {PopupPlaceholderProps} props - The props object containing the id, target, height, width, and position of the popup.
 * @returns {HTMLDivElement} - The created placeholder element.
 */
const createPopupPlaceholder = ({
  id,
}: PopupPlaceholderProps): HTMLDivElement => {
  // Create the placeholder element
  const placeholder = document.createElement('div');
  placeholder.id = id;
  placeholder.style.cssText = styleobjectToCssText({
    position: 'fixed',
    zIndex: '9999',
  });
  return placeholder;
};

const Popup: FunctionComponent<PopupProps> = ({
  type = 'text',
  data = '',
  position = 'bottom',
}) => {
  const triangleClass = useMemo(
    () =>
      cx(styles.triangle, {
        [styles[position]]: true,
      }),
    [position]
  );

  const canRender = useMemo(() => {
    return (type === 'image' || type === 'text') && data !== '';
  }, [type, data]);

  return (
    <div className={styles.wrapper}>
      {canRender ? (
        <>
          {type === 'image' ? <img src={data} alt="" /> : null}
          {type === 'text' ? <span>{data}</span> : null}
          <span className={triangleClass} />
        </>
      ) : null}
    </div>
  );
};

export { Popup, createPopupPlaceholder };
