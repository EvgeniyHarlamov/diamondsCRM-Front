import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import ReactScrollbarsCustom from "react-scrollbars-custom";
import styles from './styles.module.scss';

type PropsT = {
  children: React.ReactNode,
  className?: string
  noScrollX?: true
}

type RendererT = {
  elementRef: React.RefObject<any>,
  style: CSSProperties
  className: string
}

function Scrollbar({ children,className, noScrollX, ...props }: PropsT) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isShow = isScrolling || isMouseOver;

  const onScrollStart = useCallback(() => {
    setIsScrolling(true);
  }, []);
  const onScrollStop = useCallback(() => {
    setIsScrolling(false);
  }, []);
  const onMouseEnter = useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const trackProps: any = useMemo(() => ({
    renderer: ({ elementRef, style, className, ...restProps }: RendererT) => (
      <span
        {...restProps}
        // className={styles.track}
        ref={elementRef}
        style={{ ...style, opacity: isShow ? 1 : 0, transition: "opacity 0.4s ease-in-out", }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    )
  }), [isShow, onMouseEnter, onMouseLeave]);

  return (
    <ReactScrollbarsCustom
      className={`scrollbar ${className ? className : ''}`}
      {...props}
      wrapperProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <div {...restProps} ref={elementRef} style={{ ...style, right: 0 }} />
        ),
      }}
      mobileNative={true}
      trackXProps={trackProps}
      trackYProps={trackProps}
      onScrollStart={onScrollStart}
      onScrollStop={onScrollStop}
      momentum={true}
      scrollDetectionThreshold={200} // ms
      maximalThumbSize={1000}
      maximalThumbXSize = {0}
      noScrollX={noScrollX ? true : false}
    >
      {children}
    </ReactScrollbarsCustom>
  );
}

export default Scrollbar;