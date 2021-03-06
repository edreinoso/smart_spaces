import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/index';

class Button extends Component {
    render() {
        const {
            children,
            // confirm,
            // warning,
            borders,
            onButtonPress,
            backgroundColor,
            buttonHeight,
            buttonWidth,
            size,
            fontColor,
            borderWidth,
            borderColor,
            paddingVerticalProps,
            disable
        } = this.props;
        return (
            <View style={{ paddingVertical: paddingVerticalProps }}>
                <TouchableOpacity 
                disabled={disable ? true : false}
                style={{ width: buttonWidth }} 
                onPress={onButtonPress}>
                    <View style={[
                        styles.container,
                        {
                            borderWidth: borderWidth,
                            borderColor: borderColor,
                            height: buttonHeight,
                            backgroundColor: backgroundColor,
                        },
                        borders ? [styles.shadows] : null,
                        // (backgroundColor != '') ? {backgroundColor: 'white'} : {backgroundColor: 'green'}
                        // confirm && styles.confirm,
                        // warning &&  styles.warning,
                    ]}>
                        <Text style={[
                            styles.text,
                            {
                                fontSize: size,
                                color: fontColor
                            }
                        ]}>
                            {children}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    text: {
        color: '#FFF',
        fontWeight: '600',
    },
    disabled: {
        backgroundColor: colors.darkGreen
    },
    confirm: {
        backgroundColor: colors.primary
    },
    warning: {
        backgroundColor: '#ed6a58'
    },
    shadows: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }
})

export default Button;