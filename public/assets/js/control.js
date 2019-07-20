var self = this;
this.socket = io();

function setRain(){
	this.socket.emit('changeWeather', { weather:'rain'});
}