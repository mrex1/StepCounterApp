import { ActivityIndicator, Text, View, TouchableOpacity } from 'react-native'
import Input from 'react-native-input-validation'
import { DismissKeyboard } from '~/components'
import { Images } from '__/assets/assets'

import { L, equals, suppose, I } from 'camarche/core'
import { pinpoint, match, case_ } from 'camarche/optics'
import { L_, belief, please, show, mark } from 'camarche/faith'
import { calmm } from 'camarche/calmm'
import { as } from 'camarche/adt'

import { signup_view } from '~/project/types'

var styles = {
	container: {
		padding: 20 },
	input: {
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		color: '#FFF',
		paddingHorizontal: 15,
		borderRadius: 7 },
	buttonContainer: {
		marginTop: 20,
		backgroundColor: '#004D40',
		paddingVertical: 15,
		borderRadius: 7 },
	buttonContainerDisabled: {
		marginTop: 20,
		backgroundColor: 'rgba(0,51,51,1)',
		paddingVertical: 15,
		borderRadius: 7,
		opacity: 0.5 },
	buttonText: {
		textAlign: 'center',
		color: '#FFFFFF',
		fontWeight: '400',
		fontFamily: 'Gill Sans' },
	errorMessageStyle: {
		color: 'white',
		padding: 10,
		paddingBottom: -10,
		maxWidth: 250 } }

export default calmm (({ signup_state }) => 
	suppose (
	( password_ref
	, password_confirmation_ref

	, valid_yes_ = _ => equals (show (password_state)) (show (password_confirmation_state))
	, valid_email_ = _email => _email .endsWith ('@connect.hku.hk') || _email .endsWith ('@hku.hk')
	, valid_yes_belief = belief (_ =>
		valid_email_ (mark (email_state)) && (equals (mark (password_state)) (mark (password_confirmation_state)))
		) (signup_state )
	
	, email_state = belief (as (signup_view) .email) (signup_state)
	, password_state = belief (as (signup_view) .password) (signup_state)
	, committing_yes_state = belief (as (signup_view) .committing_yes) (signup_state)

	, select_email = _email => {;please (L_ .set (_email)) (email_state)}
	, select_password = _password => {;please (L_ .set (_password)) (password_state)}
	, select_password_confirmation = _password => {;please (L_ .set (_password)) (password_confirmation_state)}
	, commit_signup = _ => {;please (L_ .set (true)) (committing_yes_state)}
	) =>
	<DismissKeyboard>
		<View style={styles.container}>
			<Input
				placeholder="Email" keyboardType="email-address"
				returnKeyType="next"
				autoCapitalize="none" autoCorrect={false}
				style={styles.input} placeholderTextColor="rgba(64,64,64,0.5)"
				onChangeText={select_email}
				onSubmitEditing={_ => {;password_ref .focus ()}}
				validator="^[-.\w]+@([\w-]+\.)*(hku.hk){1}$"
				onValidatorExecuted={I}
				errorMessage="Please input a valid HKU email address."
				errorMessageStyle={styles .errorMessageStyle} errorInputContainerStyle={{ }} />
			<Input
				placeholder="Password" validator="password"
				placeholderTextColor="rgba(64,64,64,0.5)" style={styles.input}
				secureTextEntry={true} returnKeyType="next"
				onSubmitEditing={_ => {;password_confirmation_ref .focus ()}}
				onChangeText={select_password}
				inputRef={_ref => {;_ref && (password_ref = _ref)}}
				onValidatorExecuted={I}
				errorMessage="Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number."
				errorMessageStyle={styles .errorMessageStyle} errorInputContainerStyle={{ }} />
			<Input
				placeholder="Confirm Password" customValidator={valid_yes_}
				placeholderTextColor="rgba(64,64,64,0.5)" style={styles.input}
				secureTextEntry={true} returnKeyType="go"
				onChangeText={select_password_confirmation}
				inputRef={_ref => {;_ref && (password_confirmation_ref = _ref)}}
				onValidatorExecuted={I}
				errorMessage="Password does not match."
				errorMessageStyle={styles .errorMessageStyle} errorInputContainerStyle={{}} />
			{ !! mark (committing_yes_state) ?
			<ActivityIndicator style={{ marginVertical: 20 }} />
			: mark (valid_yes_belief) ?
			<TouchableOpacity onPress={commit_signup} style={styles .buttonContainer}>
				<Text style={styles.buttonText}>SIGN UP</Text> </TouchableOpacity>
			: not (mark (valid_yes_belief)) ?
			<View style={styles .buttonContainerDisabled}>
				<Text style={styles.buttonText}>SIGN UP</Text> </View>
			: _ }
			</View> </DismissKeyboard> ) )