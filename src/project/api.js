import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Font from 'expo-font'

import { R, L, K, suppose, equals } from 'camarche/core'
import { pinpoint, un } from 'camarche/optics'
import { go, trace, panic } from 'camarche/effects'
import { faith, belief, show, please, L_ } from 'camarche/faith'

import { step_stat_state, user_state, team_state, client_state, cache_state } from './state'
import { serialize, deserialize, on_interest_ } from './aux'





var backend_url = /*/'http://ec2-3-19-76-6.us-east-2.compute.amazonaws.com:8080'/*/'http://localhost:8080'/**/

var log_fetches_yes = true

var _fetch = (endpoint, payload) =>
	suppose (
	( _payload = pinpoint (
		L .choice 
		( [ L .when (equals (undefined)), K ({ method: 'GET' }) ]
		, x => (
			{ method: 'POST'
			, headers:
				{ 'Accept': 'application/json'
				, 'Content-Type': 'application/json' }
			, body: JSON .stringify (x) }) )
		) (
		serialize (payload) )
	) =>
	fetch (backend_url + endpoint, _payload)
	.then (_req => _req .json ())
	.catch (_err => ({ error: _err }))
	.then (R .tap (_res => {
		if (log_fetches_yes) {
			;trace (endpoint, serialize (payload), _res) } } ) )
	.then (
		pinpoint (
		L .choice
		( [ 'error', L .when (L_ .isDefined), panic ]
		, 'response' ) ) )
	.then (deserialize) )

var param_or_ = x => fn => y => fn (y || x)
var with_client_ = fn => param_or_ ({}) (({ ... params }) =>
	fn ({ client: show (client_state), ... params }) )

var query_ = ({ ... _query }) => '?' + pinpoint (un (L .querystring)) (_query)
var interested_ = _state => _then =>
	_then
	.then (R .tap (x => {;please (L_ .set (x)) (_state)}))





var load = _ =>
	go
	.then (_ =>
		Promise .all (
		[ Font .loadAsync (
			{ 'anticon': require ('__/assets/fonts/anticon.ttf')
			, 'Gill Sans': require('__/assets/fonts/Gillsans.ttf')
			, 'AntDesign': require ('__/assets/fonts/anticon.ttf') } )
		, Font .loadAsync (MaterialIcons .font)
		, Font .loadAsync (Ionicons .font) ] ) )
var signup = ({ email, password, user }) =>
	_fetch ('/signup', { email, password, user }) 
var login = ({ email, password }) =>
	_fetch ('/login', { email, password })
var id_email = with_client_ (({ client, id }) => interested_ (id_email_state_ (id)) (
	_fetch ('/email' + query_ ({ client, id })) ))
var id_user = with_client_ (({ client, id }) => interested_ (id_user_state_ (id)) (
	_fetch ('/user' + query_ ({ client, id })) ) )
var id_team = with_client_ (({ client, id }) => interested_ (id_team_state_ (id)) (
	_fetch ('/team' + query_ ({ client, id })) ) )
var user_ranking = with_client_ (({ client }) => interested_ (user_ranking_state) (
	_fetch ('/user-ranking' + query_ ({ client, offset: 0 })) ) )
var team_ranking = with_client_ (({ client }) => interested_ (team_ranking_state) (
	_fetch ('/team-ranking' + query_ ({ client, offset: 0 })) ) )
var user = with_client_ (({ client }) => interested_ (user_state) (
	_fetch ('/client/user' + query_ ({ client })) ) )
var team = with_client_ (({ client }) => interested_ (team_state) (
	_fetch ('/client/team' + query_ ({ client })) ) )
var step_stat = with_client_ (({ client }) => interested_ (step_stat_state) (
	_fetch ('/client/step-stat' + query_ ({ client })) ) )
var merge_step_stat = with_client_ (({ client, step_stat }) =>
	_fetch ('/client/step-stat', { client, step_stat }) )
var update_user = with_client_ (({ client, user }) =>
	_fetch ('/client/user', { client, user }) )
var invites = with_client_ (({ client }) => interested_ (invites_state) (
	_fetch ('/client/invite' + query_ ({ client })) ) )
var invite = with_client_ (({ client, email }) =>
	_fetch ('/client/invite', { client, email }) )
var accept = with_client_ (({ client, email }) =>
	_fetch ('/client/accept', { client, email }) )
var reject = with_client_ (({ client, email }) =>
	_fetch ('/client/reject', { client, email }) )
var remove = with_client_ (({ client, email }) =>
	_fetch ('/client/remove', { client, email }) )
var uninvite = with_client_ (({ client, email }) =>
	_fetch ('/client/uninvite', { client, email }) )
var name_team = with_client_ (({ client, name }) =>
	_fetch ('/client/team/name', { client, name }) )




var memoize = fn => suppose (
	( cache = new Map
	) =>
	x =>
	suppose (
	( $__invalidate_cache = jinx (_ => {
		if (not (cache .has (x))) {;cache .set (x, fn (x))} } )
	) =>
	cache .get (x) ) )


var id_email_state_ = memoize (_id => belief ([ 'email', _id, on_interest_ (_ => api .id_email ({ id: _id })) ]) (cache_state))
var id_user_state_ = memoize (_id => belief ([ 'user', _id, on_interest_ (_ => api .id_user ({ id: _id })) ]) (cache_state))
var id_team_state_ = memoize (_id => belief ([ 'team', _id, on_interest_ (_ => api .id_team ({ id: _id })) ]) (cache_state))
var invites_state = belief ([ 'invites', on_interest_ (_ => api .invites ()) ]) (cache_state)
var user_ranking_state = belief ([ 'user-ranking', on_interest_ (_ => api .user_ranking (show (client_state))) ]) (cache_state)
var team_ranking_state = belief ([ 'team-ranking', on_interest_ (_ => api .team_ranking (show (client_state))) ]) (cache_state)


var api =
	{ load
	, signup, login
	, id_email, id_user, id_team
	, user_ranking, team_ranking
	, step_stat, merge_step_stat
	, user, update_user
	, team, invites, invite, accept, reject, remove, uninvite, name_team }


export
{ id_email_state_
, id_user_state_
, id_team_state_
, invites_state
, user_ranking_state
, team_ranking_state }

export default api