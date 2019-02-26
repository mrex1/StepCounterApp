import React,{Component} from 'react'
import {View,ScrollView,StyleSheet,Dimensions} from 'react-native'
import Analysis from './Analysis'
import Activity from './Activity'
import Map from './Map'
import Dots from './Dots'
import GoBack from './GoBack'

export default class DynamicStats extends Component{
	state={currentPage:0,width:width*0.95}
	
	setCurrentPage(currentPage){
		this.setState({currentPage})
	}
	
	render() {
		var currentPage=this.state.currentPage
		return <View style={{...styles.container,width:this.props.portrait?'95%':undefined,height:this.props.portrait?undefined:'95%'}} onLayout={(event)=>{this.setState({width:event.nativeEvent.layout.width})}}>
			<ScrollView style={{flex:1}} 
				horizontal 
				showsHorizontalScrollIndicator={false} 
				pagingEnabled
				onScroll={(event)=>{ let page=Math.round(event.nativeEvent.contentOffset.x/(this.state.width));if(page!=currentPage)this.setCurrentPage(page)}}
				onContentSizeChange={()=>{this.scrollview.scrollTo({x:this.state.currentPage*this.state.width,y:0,animated:true})}}
				ref={(scrollview)=>{this.scrollview=scrollview}}>
				<Activity width={this.state.width} portrait={this.props.portrait}/>
				<Analysis width={this.state.width} portrait={this.props.portrait}/>
				<Map width={this.state.width}/>
			</ScrollView>
			<GoBack visible={currentPage==2} goback={()=>{this.scrollview.scrollTo({x:this.state.width,y:0,animated:true})}}/>
			<Dots numofpage={3} currentPage={currentPage}/>
		</View>
	}
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
	container:{
		backgroundColor:'white',
		flex:1,
		elevation: 2, //android shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
	}
})
