declare module 'react-native-draglist' {
  import { ComponentType } from 'react';
  export interface DragListRenderItemInfo<T> {
    item: T;
    index: number;
    onDragStart?: () => void;
    onDragEnd?: () => void;
  }
  const DragList: ComponentType<any>;
  export default DragList;
}
declare module 'react-native-svg';

