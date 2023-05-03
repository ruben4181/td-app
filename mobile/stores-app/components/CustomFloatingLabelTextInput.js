import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Platform,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";

class FloatingLabel extends Component {
  constructor(props) {
    super(props);

    let initialPadding = 9;
    let initialOpacity = 0;

    if (this.props.visible) {
      initialPadding = 5;
      initialOpacity = 1;
    }

    this.state = {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      Animated.timing(this.state.paddingAnim, {
        useNativeDriver: false,
        toValue: this.props.visible ? 5 : 9,
        duration: 230,
      }).start();

      Animated.timing(this.state.opacityAnim, {
        useNativeDriver: false,
        toValue: this.props.visible ? 1 : 0,
        duration: 40,
      }).start();
    }
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.floatingLabel,
          {
            paddingTop: this.state.paddingAnim,
            opacity: this.state.opacityAnim,
          },
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class TextFieldHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginAnim: new Animated.Value(this.props.withValue ? 25 : 0),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.withValue !== this.props.withValue) {
      Animated.timing(this.state.marginAnim, {
        useNativeDriver: false,
        toValue: this.props.withValue ? 25 : 0,
        duration: 230,
      }).start();
    }
  }

  render() {
    return (
      <Animated.View style={{ marginTop: this.state.marginAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class CustomFloatLabelTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      text: this.props.value,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.hasOwnProperty("value") &&
      prevProps.value !== this.props.value
    ) {
      this.setState({ text: this.props.value });
    }
  }

  leftPadding() {
    return { width: this.props.leftPadding || 0 };
  }

  withBorder() {
    if (!this.props.noBorder) {
      return styles.withBorder;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.paddingView, this.leftPadding()]} />
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={this.state.text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>
                {this.placeholderValue()}
              </Text>
            </FloatingLabel>
            <TextFieldHolder withValue={this.state.text}>
              {this.props.maskType ? (
                <TextInputMask
                  type={this.props.maskType}
                  options={
                    this.props.maskType == "money"
                      ? {
                          precision: 0,
                          separator: ",",
                          delimiter: ".",
                          unit: "$",
                          suffixUnit: "",
                        }
                      : this.props.maskType == "cel-phone"
                      ? {
                          maskType: "BRL",
                          withDDD: true,
                          dddMask: "(999) ",
                        }
                      : {}
                  }
                  {...this.props}
                  ref="input"
                  underlineColorAndroid="transparent"
                  defaultValue={this.props.defaultValue}
                  value={this.state.text}
                  maxLength={this.props.maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.unsetFocus()}
                  onChangeText={(value) => this.setText(value)}
                />
              ) : (
                <TextInput
                  {...this.props}
                  ref="input"
                  underlineColorAndroid="transparent"
                  defaultValue={this.props.defaultValue}
                  value={this.state.text}
                  maxLength={this.props.maxLength}
                  onFocus={() => this.setFocus()}
                  onBlur={() => this.unsetFocus()}
                  multiline={this.props.multiline}
                  style={
                    this.props.multiline
                      ? { height: 80, marginTop: 25, marginBottom: 30 }
                      : {}
                  }
                  onChangeText={(value) => this.setText(value)}
                />
              )}
            </TextFieldHolder>
          </View>
        </View>
      </View>
    );
  }

  inputRef() {
    return this.refs.input;
  }

  focus() {
    this.inputRef().focus();
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.inputRef().clear();
  }

  setFocus() {
    this.setState({
      focused: true,
    });
    try {
      return this.props.onFocus();
    } catch (_error) {}
  }

  unsetFocus() {
    this.setState({
      focused: false,
    });
    try {
      return this.props.onBlur();
    } catch (_error) {}
  }

  labelStyle() {
    if (this.state.focused) {
      return styles.focused;
    }
  }

  placeholderValue() {
    if (this.state.text) {
      return this.props.placeholder;
    }
  }

  setText(value) {
    this.setState({
      text: value,
    });
    try {
      return this.props.onChangeTextValue(value);
    } catch (_error) {}
  }
}

//style={[styles.valueText]} estilos borrados

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    backgroundColor: "#FFFFFF00",
    justifyContent: "center",
  },
  viewContainer: {
    flex: 1,
    flexDirection: "row",
  },
  paddingView: {
    width: 15,
  },
  floatingLabel: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  fieldLabel: {
    height: 25,
    fontSize: 14,
    color: "#B1B1B1",
  },
  fieldContainer: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  withBorder: {
    borderBottomWidth: 1 / 2,
    borderColor: "#C8C7CC",
  },
  valueText: {
    height: Platform.OS == "ios" ? 20 : 60,
    fontSize: 18,
    color: "#111111",
  },
  focused: {
    color: "#1482fe",
  },
});

export default CustomFloatLabelTextField;
