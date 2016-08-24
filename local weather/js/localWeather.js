var beforechange;
var afterchange;
var flag = 1;	
var a;
var b=new Date();
var ftemp;
var ctemp;
$(document).ready(function(){

	var getData=$.ajax({
		url:"https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22beijing%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
		type:"GET",	
		data:{},
		dataType:'json',
		async:false,
		success :function(data){
			document.getElementById("city").innerHTML=data.query.results.channel.location.city+" "+data.query.results.channel.location.country;

			
				for(var i=0;i<data.query.results.channel.item.forecast.length;i++){
					var date=data.query.results.channel.item.forecast[i].date;
					if(date.substring(0,2)==b.getDate()){
					document.getElementById("status").innerHTML=data.query.results.channel.item.forecast[i].text;
					ftemp=data.query.results.channel.item.condition.temp;
					ctemp=Math.floor((ftemp-32)*5/9);
					console.log(ctemp);
					}
				}


			beforechange=(ctemp+"°"+"<a"+" id='changeTemp'>"+"C"+"</a>");
			afterchange=(ftemp+"°"+"<a"+" id='changeTemp' >"+"F"+"</a>");
			// change();
			document.getElementById("temp").innerHTML=beforechange;
			$("#changeTemp").click();
			// document.getElementById("temp").innerHTML(afterchange);
		},
	});
	a = $("#changeTemp").click(function(){
		console.log("asd");
		if (flag === 1) {
			document.getElementById("temp").innerHTML=afterchange;
			flag = 0;
		} else {
			document.getElementById("temp").innerHTML=beforechange;			
			flag = 1;
		}
	});
});

function change() {
	console.log(flag);

	if (flag === 1) {
		document.getElementById("temp").innerHTML=afterchange;
		flag = 0;
	} else {
		document.getElementById("temp").innerHTML=beforechange;			
		flag = 1;
	}
}