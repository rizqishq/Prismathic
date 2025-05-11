declare module '@expo/vector-icons' {
  import { Component } from 'react';
    import { TextStyle } from 'react-native';

  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle;
  }

  export class FontAwesome5 extends Component<IconProps> {}
  export class Ionicons extends Component<IconProps> {}
  export class MaterialIcons extends Component<IconProps> {}
}

declare module 'expo-router' {
  export function useRouter(): {
    push: (options: { pathname: string; params?: Record<string, string> }) => void;
    back: () => void;
  };
}

declare module '../../components/NeoBrutalismNavbar' {
  import { Component } from 'react';

  export interface NeoBrutalismNavbarProps {
    variant?: 'course' | 'explore';
  }

  export const APP_COLORS: {
    BLACK: string;
    WHITE: string;
    CATEGORY_BLUE: string;
  };

  export default class NeoBrutalismNavbar extends Component<NeoBrutalismNavbarProps> {}
} 