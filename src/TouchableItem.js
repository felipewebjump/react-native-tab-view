/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

const LOLLIPOP = 21;

type Props = {
  onPress: () => mixed,
  delayPressIn?: number,
  borderless?: boolean,
  pressColor?: string,
  pressOpacity?: number,
  children?: React.Node,
  style?: ViewStyleProp,
};

export default class TouchableItem extends React.Component<Props> {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    delayPressIn: PropTypes.number,
    borderless: PropTypes.bool,
    pressColor: PropTypes.string,
    pressOpacity: PropTypes.number,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    pressColor: 'rgba(255, 255, 255, .4)',
  };

  render() {
    const { style, pressOpacity, pressColor, borderless, ...rest } = this.props;

    if (Platform.OS === 'android' && Platform.Version >= LOLLIPOP) {
      return (
        <TouchableNativeFeedback
          {...rest}
          delayLongPress={2000}
          background={TouchableNativeFeedback.Ripple(pressColor, borderless)}
        >
          <View style={style}>{React.Children.only(this.props.children)}</View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity {...rest} style={style} activeOpacity={pressOpacity}>
          {this.props.children}
        </TouchableOpacity>
      );
    }
  }
}
