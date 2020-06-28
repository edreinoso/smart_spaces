import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native'
import validity from '../utility/validate'
import { container, colors } from '../styles/index'
import { Logo, Button, Cards, Input } from '../components/index'
import { connect } from 'react-redux'
import { auth, confirmCodeSignUp } from '../store/actions/index'

class AuthScreen extends Component {
    state = {
        initialState: false,
        showLogin: true,
        showSignUp: true,
        showLoginButton: true,
        showSignUpButton: true,
        confirmPass: false,
        newUser: null,
    }

    componentWillMount() {
        this.reset()
    }

    reset = () => {
        this.setState({
            controls: {
                name: {
                    value: '',
                    validity: false,
                    validationRules: {
                        default: true
                    },
                    touched: false
                },
                email: {
                    value: '',
                    validity: true,
                    validationRules: {
                        isEmail: true
                    },
                    touched: false
                },
                password: {
                    value: '',
                    validity: true,
                    validationRules: {
                        minLength: 6
                    },
                    touched: false
                },
                confirmCode: {
                    value: '',
                    validity: true,
                    validationRules: {
                        minLength: 6
                    },
                    touched: false
                }
            },
            initialState: false
        })
    }

    onFinishTextField = (key, value) => {
        // variable value doesn't hold a text variable
        let text = value.nativeEvent.text
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        validity: validity(text, prevState.controls[key].validationRules),
                    }
                }
            }
        })
    }

    onChangeTextField = (key, value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        touched: true
                    }
                }
            }
        })
    }

    onLoginPress = async (initialState) => {
        if (initialState) {
            this.setState({ initialState: true, showLogin: true, showSignUp: false, showLoginButton: true, showSignUpButton: false })

        } else {
            this.setState({ showLogin: true, showSignUp: false, showLoginButton: true, showSignUpButton: false })
        }
        // Executing auth if email and password are not empty
        if (this.state.controls.email.value != "" || this.state.controls.password.value != "") {
            // console.log('execute auth function')
            await this.props.auth(
                this.state.controls.email.value,
                this.state.controls.password.value,
                'login'
            ).then(() => {
                this.props.navigation.navigate('Home')
            }).catch((err) => {
                Alert.alert('Error found', err.message)
            })
        }
    }

    onSignUpPress = async (initialState) => {
        if (initialState) {
            this.setState({ initialState: true, showSignUp: true, showLogin: false, showSignUpButton: true, showLoginButton: false })
        } else {
            this.setState({ showSignUp: true, showLogin: false, showSignUpButton: true, showLoginButton: false })
        }
        // 
        if (this.state.controls.email.value != "" || this.state.controls.password.value != "" || this.state.controls.name.value != "") {
            await this.props.auth(
                this.state.controls.email.value,
                this.state.controls.password.value,
                'signUp'
            ).then(() => {
            // ).then((response) => {
                // console.log(response)
                this.setState({
                    newUser: 'newUser_Created',
                    showSignUpButton: false
                })
            }).catch((err) => {
                Alert.alert('Error found', err.message)
            })
        }
    }

    onVerifyPress = async () => {
        this.setState({ authMode: 'login' })
        
        await this.props.confirmCodeStep(
            this.state.controls.email.value,
            this.state.controls.confirmCode.value
        )
        await this.props.auth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            'login'
        ).then(() => {
            this.props.navigation.navigate('Home')
        }).catch((err) => {
            Alert.alert('Error found', err.message)
        })
    }

    onSendEmailAgain = async () => {
        await Auth.resendSignUp(this.state.controls.email.value).catch((err) => {
            Alert.alert("Error occured", err.message)
        });
    }

    renderNewUser() {
        return (
            <View>
                {/* {!this.state.showLogin ? <Input
                    onChangeInput={val => this.onChangeTextField('name', val)}
                    onFinishInput={val => this.onFinishTextField('name', val)}
                    value={this.state.controls.name.value}
                    valid={this.state.controls.email.validity}
                    touched={this.state.controls.name.touched}
                    errorText='Please enter a valid name'
                    keyboardType='default'
                    autoCapitalize='none'
                    //Styles
                    title={'Name'}
                    color={colors.black}
                    borderColor={colors.black}
                    borderWidth={1}
                /> : null} */}
                <Input
                    onChangeInput={val => this.onChangeTextField('email', val)}
                    onFinishInput={val => this.onFinishTextField('email', val)}
                    value={this.state.controls.email.value}
                    valid={this.state.controls.email.validity}
                    touched={this.state.controls.email.touched}
                    errorText='Please enter a valid email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    //Styles
                    title={'Email'}
                    color={colors.black}
                    borderColor={colors.black}
                    borderWidth={1}
                />
                <Input
                    onChangeInput={val => this.onChangeTextField('password', val)}
                    onFinishInput={val => this.onFinishTextField('password', val)}
                    value={this.state.controls.password.value}
                    valid={this.state.controls.password.validity}
                    touched={this.state.controls.password.touched}
                    keyboardType='default'
                    errorText='Please enter a valid password'
                    secureTextEntry
                    // Styles
                    title={'Password'}
                    color={colors.black}
                    borderColor={colors.black}
                    borderWidth={1}
                />
            </View>
        )
    }

    renderVerifyUser() {
        return (
            <View>
                <Input
                    onChangeInput={val => this.onChangeTextField('confirmCode', val)}
                    onFinishInput={val => this.onFinishTextField('password', val)}
                    value={this.state.controls.confirmCode.value}
                    valid={this.state.controls.password.validity}
                    touched={this.state.controls.password.touched}
                    keyboardType='default'
                    errorText='Please enter a 6 digit code'
                    // Styles
                    title={'Confirm Code'}
                    color={colors.black}
                    borderColor={colors.black}
                    borderWidth={1}
                />
            </View>
        )
    }

    renderAuthPanel() {
        return (
            <Cards style={[container.authContainer, {
                marginBottom: 20
            }]}>
                {this.state.newUser === null ? this.renderNewUser() : this.renderVerifyUser()}
            </Cards>
        )
    }

    renderLoginButton() {
        if (this.state.showLoginButton) {
            return (
                <View>
                    <Button
                        onButtonPress={() => this.onLoginPress(true)}
                        buttonWidth={Dimensions.get('window').width * 2 / 3}
                        buttonHeight={50}
                        size={18}
                        paddingVerticalProps={15}
                        backgroundColor={colors.white}
                        fontColor={colors.black}
                        borders
                        disable={
                            this.state.initialState &&
                            (!this.state.controls.email.touched ||
                                !this.state.controls.password.touched)
                        }
                    >
                        Login
                    </Button>
                    {!this.state.showSignUpButton ? <View>
                        <Text>
                            Don't have an account yet?
                    </Text>
                        <TouchableOpacity onPress={() => this.onSignUpPress(false)}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                    </View> : null}
                </View>
            )
        }
    }

    renderSignUpButton() {
        if (this.state.showSignUpButton) {
            return (
                <View>
                    <Button
                        onButtonPress={() => this.onSignUpPress(true)}
                        buttonWidth={Dimensions.get('window').width * 2 / 3}
                        buttonHeight={50}
                        paddingVerticalProps={15}
                        size={18}
                        backgroundColor={colors.primary}
                        fontColor={colors.black}
                        disable={
                            this.state.initialState &&
                            // (!this.state.controls.name.touched ||
                            (!this.state.controls.email.touched ||
                                !this.state.controls.password.touched)
                        }
                    >Sign Up</Button>
                    {!this.state.showLoginButton ? <View>
                        <Text>
                            Already have an account?
                    </Text>
                        <TouchableOpacity onPress={() => this.onLoginPress(false)}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View> : null}
                    {/* {this.renderBottomText()} */}
                </View>
            )
        }
    }

    renderVerifyButton() {
        return (
            <View>
                <Button
                    onButtonPress={() => this.onVerifyPress()}
                    buttonWidth={Dimensions.get('window').width * 2 / 3}
                    buttonHeight={50}
                    paddingVerticalProps={15}
                    size={18}
                    backgroundColor={colors.primary}
                    fontColor={colors.black}
                    disable={
                        !this.state.controls.confirmCode.touched
                    }
                >Verify</Button>
                <Text>Did not get an email?</Text>
                <TouchableOpacity onPress={() => this.onSendEmailAgain()}><Text>Send again</Text></TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={container.centerScreen}>
                <View style={[{
                    flex: .2
                }]}>
                    <Logo
                        fontSize={25}
                    />
                </View>
                {this.state.initialState ? this.renderAuthPanel() : null}
                {this.renderLoginButton()}
                {this.renderSignUpButton()}
                {this.state.newUser != null ? this.renderVerifyButton() : null}
            </View>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, authMode) => dispatch(auth(email, password, authMode)),
        confirmCodeStep: (email, confirmCode) => dispatch(confirmCodeSignUp(email, confirmCode)),
    }
}

export default connect(null, mapDispatchToProps)(AuthScreen);