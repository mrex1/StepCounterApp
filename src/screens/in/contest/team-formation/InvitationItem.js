import { TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

import { K, L, by, suppose } from 'camarche/core'
import { calmm } from 'camarche/calmm'
import { mark, belief } from 'camarche/faith'
import { go } from 'camarche/effects'

var styles = {
	item: {
		padding: 10,
		backgroundColor: '#eee',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 10,
		borderRadius: 20,
		height: 100,
		opacity: 0.5 } }

var Remove = _email => _ =>
	suppose (
	( remove = _ => {
		;go
		.then (_ => api .uninvite ({ email: _email }))
		.then (_ => api .team ({})) }
	) =>
	<TouchableOpacity onPress={remove}>
		<MaterialIcons name="cancel" color="darkslategray" size={35} /> </TouchableOpacity> )

var captain_state = belief (as (team) .captain, as (mention) .id, _id => mark (id_user_state_ (_id))) (team_state)
var team_mines_yes_state = belief (as (user) .id, by (_ => equals (pinpoint (as (user) .id) (mark (user_state))))) (captain_state)

export default calmm (({ email: _email }) =>
	suppose (
	( team_mines_yes = mark (team_mines_yes_state)
	) =>
	<ListItem
		containerStyle={styles .item}
		title={_email}
		rightIcon={pinpoint (L .when (I), K (Remove (_email))) (team_mines_yes)} /> ) )