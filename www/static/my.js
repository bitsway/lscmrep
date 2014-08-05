
// Put your custom code here=========== Latitude and Longitude

function getLatLong() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {
	$("#lat").val(position.coords.latitude)
	$("#long").val(position.coords.longitude)
	$("#lat_IM").val(position.coords.latitude)
	$("#long_IM").val(position.coords.longitude)
	//var element = document.getElementById('geolocation');
//        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
//                            'Longitude: '          + position.coords.longitude             + '<br />' +
//                            'Altitude: '           + position.coords.altitude              + '<br />' +
//                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
//                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
//                            'Heading: '            + position.coords.heading               + '<br />' +
//                            'Speed: '              + position.coords.speed                 + '<br />' +
//                            'Timestamp: '          +                                   position.timestamp          + '<br />';
//alert (position.coords.latitude);
//alert ('nadira');
}

// onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

//====================================================================== Details Code


//var apipath=location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/mrepmobile_new/lafarge/";
var apipath="http://m.businesssolutionapps.com/mrepmobile/lafarge/";
var cidValue=''
var repid='';
var password='';
var loginResult='';
var memListStr='';

var errror_str='Network Error. Please Check that you have Internet active or Mobile have network signal.';


var im_number=0;
var delivery_str_IM="";

//========================================
// $(document).ready(function(){
// set_route_combo();
// });



	
$(function() {	
	

	
$('#basicSync').click(function() {
		localStorage.cid="";
		localStorage.userid="";
		localStorage.password="";
		localStorage.synccode="";
		localStorage.routeList="";
		localStorage.itemList="";
		localStorage.itemDivCount="";
		
		 cidValue=$("#cid").val() ;
		 repid=$("#repid").val() ;
		 password=$("#password").val() ;
		 
		 if (cidValue==""||repid==""||password==""){
			 $("#mySyncError").html('Authorization Failed');	
			 var url = "#pageSync";
			 $.mobile.navigate(url);
				//$(location).attr('href',url);
		 }else{			 
			
		if (apipath==''){
			$("#mySyncError").html('Error: 10001 Configuration Data not Found. Please contact your system admin.');
			
		}else{
			 //alert(apipath+'syncRepJMobileSS?cid='+cidValue+'&repid='+repid+'&mobile=8801234567890&password='+password);
			// $("#mySyncError").html(apipath+'syncRepSS?cid='+cidValue+'&repid='+repid+'&mobile=8801234567890&password='+password) ;
			 $.ajax({
				 url: apipath+'syncRepSS?cid='+cidValue+'&repid='+repid+'&mobile=8801234567890&password='+password,
				 success: function(result) {
						loginResult=result
						if (loginResult==''){
							$("#mySyncError").html('Error: 10002 Network Time out');
						}
						
						
						var loginSyncArray = loginResult.split('<Synccode>');			
						var synccode=loginSyncArray[1]
						
						
						
						var loginResultArray = loginResult.split('</TRADEMODE>');			
						var loginData=loginResultArray[1]
						
						var loginClientArray = loginData.split('</CLIENT>');
						var loginClient=loginClientArray[0].replace('<CLIENT>','')
						
						var loginBankArray = loginClientArray[1].split('</BANK>');
						var loginBank=loginBankArray[0].replace('<BANK>','')
						
						var loginProductArray = loginBankArray[1].split('</PRODUCT>');
						var loginProduct=loginProductArray[0].replace('<PRODUCT>','')
						
						var loginDepotArray = loginProductArray[1].split('</DEPOT>');
						var loginDepot=loginDepotArray[0].replace('<DEPOT>','')
						
						var loginTransportArray = loginDepotArray[1].split('</TRANSPORT>');
						var loginTransport=loginTransportArray[0].replace('<TRANSPORT>','')
						
						var loginPriceArray = loginTransportArray[1].split('</PRICECHART>');
						var loginPrice=loginPriceArray[0].replace('<PRICECHART>','')
						
						var loginDareaArray = loginPriceArray[1].split('</DELIVERYAREA>');
						var loginDarea=loginDareaArray[0].replace('<DELIVERYAREA>','')
						
						
						
						
						if (loginResult!=''){
							
							syncCode=loginSyncArray[1];
							//alert (syncCode);
							routeListStr=loginResultArray[2];
							itemListStr=loginResultArray[3];
							dvCount=loginResultArray[4];
							itemCombo=loginResultArray[5];
							itemComboIM=loginResultArray[6];
							//alert (loginResult);		
							localStorage.cid=cidValue;
							localStorage.userid=repid;
							localStorage.password=password;
							localStorage.synccode=syncCode;
							
							
							localStorage.clientListStr=loginClient;
							localStorage.bankListStr=loginBank;
							localStorage.itemListStr=loginProduct;
							localStorage.depotListStr=loginDepot;
							localStorage.transportListStr=loginTransport;
							localStorage.priceListStr=loginPrice;
							localStorage.dAreaListStr=loginDarea;

							
							
							
							clientList();
							
							
							
							

							
							var url = "#pageHome";
							//$(location).attr('href',url);
							$.mobile.navigate(url);
							location.reload();
							
							//---------------
						}else{
							var url = "#pageSync";      
							
							//$(location).attr('href',url);
							$.mobile.navigate(url);
							$("#mySyncError").html('Authentication Error. Please contact your company system admin');			
						}
				  },
				  error: function(result) {
					  $("#mySyncError").html(errror_str);
					  var url = "#pageSync";
					  $.mobile.navigate(url);
					//	$(location).attr('href',url);
				  }
				  
			});//end ajax
		  }//end else of blank apipath
		};//end else of blank field
		 
	});//end check click
	
}); 

//================== Sync page
function getSyncPage() {
		if (localStorage.routeList=="" || localStorage.routeList=="None"){
			$("#mySyncError").html('Required Basic Sync');	
			$('#routeList').empty();
					
		}else{
			$('#routeList').empty();			
			$('#routeList').append(localStorage.routeList).trigger('create');
			}
		
		var url = "#pageSync";  
		$.mobile.navigate(url);    
		//$(location).attr('href',url);		
	}


//================== Clear Sync
function clearSync() {
	localStorage.cid="";
	localStorage.userid="";
	localStorage.password="";
	localStorage.synccode="";
	localStorage.routeList="";
	localStorage.itemList="";
	localStorage.itemDivCount="";
	localStorage.routeId="";
	localStorage.routeName="";
	localStorage.clientListStr="";
	localStorage.itemCombo="";
}



//==============client sync================
function getclientList() {	
	clientList();
	var url = "#pageClient";
	$.mobile.navigate(url);
	//$(location).attr('href',url);
	location.reload();
	
			
}

//================== Client List
function clientList() {	
	$('#depot_combo').empty();
	var clientArray=localStorage.clientListStr.split('<fd><rd>')	
	var ob = $("#clientID_S");
	var value="";
	var text="Select Client";
	for (var c=0; c<clientArray.length-1; c++){
		var clientIdNameArray = clientArray[c].split('<fd>');
		//alert (clientIdNameArray); 
		var client_id=clientIdNameArray[0]
		var client_name=clientIdNameArray[1]
		var zoneId=clientIdNameArray[2]
		
		ob.prepend("<option value='"+ client_id+'_'+client_name +'_'+ zoneId +"'>" + client_name + "</option>");
		}	
	//ob.prepend("<option value=''>Select Outlet</option>");					
}

function productList() {	
	$('#productCombo').empty();
	var productArray=localStorage.itemListStr.split('<fd><rd>')	
	var ob = $("#productCombo");
	var value="";
	var text="Product";
	
	//alert (localStorage.clientListStr);
	
	for (var p=0; p<productArray.length-1; p++){
		var productId = productArray[p];
		ob.prepend("<option value='"+ productId+"'>" + productId + "</option>");
		}	
	ob.prepend("<option value=''>Product</option>");
}
function depotList() {	
	$('#depotCombo').empty();
	
	var depotArray=localStorage.depotListStr.split('<fd><rd>')	
	var ob = $("#depotCombo");
	
	var value="";
	var text="Depot";
	
	//alert (localStorage.clientListStr);
	
	for (var d=0; d<depotArray.length-1; d++){
		var depotSingleArray = depotArray[d].split('<fd>');
		var depot_code=depotSingleArray[0]
		var base_price=depotSingleArray[1]
		ob.prepend("<option value='"+ depot_code+'_'+base_price+"'>" + depot_code + "</option>");
		
		}		
	ob.prepend("<option value=''>Depot</option>");
}

function transportList() {	
	$('#transportCombo').empty();
	var transportArray=localStorage.transportListStr.split('<fd><rd>')	
	var ob = $("#transportCombo");
	var value="";
	var text="Transport";
	
	for (var t=0; t<transportArray.length-1; t++){
		var transportId = transportArray[t];
		//ob.prepend("<option value=''>Product</option>");
		ob.prepend("<option value='"+ transportId+"'>" + transportId + "</option>");
		}	
	ob.prepend("<option value=''>Transport</option>");
}

function DareaList() {	
	$('#delCombo').empty();
	var dellArray=localStorage.dAreaListStr.split('<fd><rd>')	
	var ob = $("#delCombo");
	var value="";
	var text="Depot";
	
	//alert (localStorage.clientListStr);
	
	for (var d=0; d<dellArray.length-1; d++){
		var areaId=dellArray[d]
		ob.prepend("<option value='"+ areaId+"'>" + areaId + "</option>");
		}
	ob.prepend("<option value=''>Delivery</option>");	
}
function paymentList() {	
	$('#paymentCombo').empty();
	localStorage.paymentListStr="Payment,Cash-CD-Cheque,Cash-Deposit,Cash-Pay-Order,Cash-Transfer,Credit-PDC,Credit-BG,Credit-LC,Credit-SC";
	var paymentArray=localStorage.paymentListStr.split(',')	
	var ob = $("#paymentCombo");
	var value="";
	var text="Payment";
	
	//alert (localStorage.clientListStr);
	
	for (var p=0; p<paymentArray.length-1; p++){
		var paymentId=paymentArray[p]
		ob.prepend("<option value='"+ paymentId+"'>" + paymentId + "</option>");
		}	
	ob.prepend("<option value=''>Payment</option>");
}

function bankList() {	
	$('#bankCombo').empty();
	
	var bankArray=localStorage.bankListStr.split('<fd><rd>')	
	var ob = $("#bankCombo");
	var value="";
	var text="Bank";
	
	//alert (localStorage.bankListStr);
	
	for (var b=0; b<bankArray.length-1; b++){
		var banktId=bankArray[b]
		ob.prepend("<option value='"+ banktId+"'>" + banktId + "</option>");
		}	
	ob.prepend("<option value=''>Bank</option>");
}
//================== Order
function getOrder() {
		
		$("#clientErrMsg").text("");	
		var clientIdName= $("#clientID_S").val();
		
		
		//alert(clientIdName);
		if (clientIdName==""){
			$("#clientErrMsg").text("Client not available");	
		}else{	
				var clientArray=clientIdName.split("_");
				
				var clientId=clientArray[0];
				var clientName=clientArray[1];
				var zoneId=clientArray[2];
				
				$("#clientID").val(clientId);
				$("#clientName").val(clientName);
				$("#zoneId").val(zoneId);
				
				localStorage.clientID=clientId;
				localStorage.clientName=clientName;
				localStorage.zoneId=zoneId;
				
				$("#clientDiv").text(localStorage.clientName);	
				$("#clientDivreqShow").text(localStorage.clientName);
				
				//getLatLong();
				productList();
				depotList();
				transportList();
				DareaList();
				paymentList();
				bankList();
				
				var url = "#pageOrder";  
				$.mobile.navigate(url); 
				//location.reload();
			}
}

//================== Order Next
function ordNext() {
	  var product=$("#productCombo").val();
	  var qty=$("#qty").val();
	  var depot=$("#depotCombo").val();
	  var transport=$("#transportCombo").val();
	  var payment=$("#paymentCombo").val();
	  var delivery=$("#delCombo").val();
	  
     var orderError='';
	 if (product==''){
		 orderError=orderError+'</br>'+'Product Required';
		 $("#orderError").html(orderError);
		 var url = "#pageOrder";  
		 $.mobile.navigate(url); 
	 }
	 if (qty==''){
		 orderError=orderError+'</br>'+'QTY Required';
		 $("#orderError").html(orderError);
		 var url = "#pageOrder";  
		 $.mobile.navigate(url); 
	 }	
	 if (depot==''){
		 orderError=orderError+'</br>'+'Depot Required';
		 $("#orderError").html(orderError);
		 var url = "#pageOrder";  
		 $.mobile.navigate(url); 
	 }
	 if (transport==''){
		 orderError=orderError+'</br>'+'Transport Required';
		 $("#orderError").html(orderError);
		 var url = "#pageOrder";  
		 $.mobile.navigate(url); 
	 }
	 if (payment==''){
		 orderError=orderError+'</br>'+'Payment Required';
		 $("#orderError").html(orderError);
		 var url = "#pageOrder";  
		 $.mobile.navigate(url); 
	 }
	 if (delivery==''){
		 orderError=orderError+'</br>'+'Delivery';
		 $("#orderError").html(orderError);
		 var url = "#pageOrder";  
		 $.mobile.navigate(url); 
	 }
		
	 if ((product!='') && (qty!='') && (depot!='') && (transport!='') && (payment!='') && (delivery!='')){
		
		localStorage.product=product;
		localStorage.qty=qty;
		localStorage.depot_P=depot;
		
		var depot_PArray=localStorage.depot_P.split("_");	
		var depotId=depot_PArray[0];
		var basePrice=depot_PArray[1];
		
		localStorage.depotId=depotId;
		localStorage.basePrice=basePrice;
		
		
		localStorage.transport=transport;
		localStorage.payment=payment;
		localStorage.delivery=delivery;
		
		localStorage.orderShow=localStorage.clientName+'</br>'+'Product: '+localStorage.product+'</br>'+'Qty: '+localStorage.qty +'</br>'+'Depot: '+localStorage.depotId +'</br>'+'Transport: '+ localStorage.transport +'</br>'+'Payment: '+localStorage.payment +'</br>'+'Delivery: '+localStorage.delivery;
		
		$("#reqInfo").html(localStorage.orderShow);
		 
		var url = "#pageOrderShow";  
		$.mobile.navigate(url); 
	 }
		getPrice();
}

function getPrice() {
	var priceArray=localStorage.priceListStr.split('<fd><rd>')	
	//alert (priceArray.length);
	for (var i=0; i<priceArray.length-1; i++){
		var priceSingleArray = priceArray[i].split('<fd>');
		var productId = priceSingleArray[0]; 
		var zoneId = priceSingleArray[1]; 
		var areaId = priceSingleArray[2]; 
		var payType = priceSingleArray[3]; 
		var depotCode = priceSingleArray[4]; 
		var transport = priceSingleArray[5]; 
		var price = priceSingleArray[6]; 
		
		
		var getPrice=localStorage.basePrice;
		
		if ((productId = localStorage.product) && (zoneId = localStorage.zoneId) &&	(areaId = localStorage.delivery) && (payType = localStorage.payment) &&	(depotCode = localStorage.depotId) && (transport = localStorage.transport)){
			
			getPrice=price;
		}
	}		
	localStorage.getPrice=getPrice;
	var totalPrice=parseFloat(localStorage.qty) * parseFloat(localStorage.getPrice);
	
	
	localStorage.totalPrice=totalPrice;
	
	$("#price").val(localStorage.getPrice);
	$("#totalPrice").val(localStorage.totalPrice);
	
	
	
}

//========================== voucher Submit
function orderSubmit() {
		
		var  chq=$("#chq").val();
		var  bank=$("#bankCombo").val();
		var  branch=$("#branch").val();
		var  remark=$("#remark").val();
		var  s_date=$("#s_date").val();
		
		localStorage.chq=chq;
		localStorage.bank=bank;
		localStorage.branch=branch;
		localStorage.remark=remark;
		localStorage.s_date=s_date;
		
		
		//alert (localStorage.synccode);
		//$("#alert_show").html (localStorage.s_date)
		$("#OrderSubmitButton").hide();	
		//$("#alert_show").html (apipath+'getSubmitResultOrd?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode +'&productId='+localStorage.product +'&clientId='+localStorage.clientID+'&zoneId='+localStorage.zoneId+'&areaId='+localStorage.delivery+'&payType='+localStorage.payment +'&transport='+localStorage.transport +'&depotCode='+localStorage.depotId+'&price='+localStorage.getPrice + '&qty='+localStorage.qty + '&chq='+localStorage.chq + '&bank='+localStorage.bank + '&bankBranch='+localStorage.branch + '&remark='+localStorage.remark + '&deliveryDate='+localStorage.s_date);
	$.ajax({
			  url: apipath+'getSubmitResultOrd?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode +'&productId='+localStorage.product +'&clientId='+localStorage.clientID+'&zoneId='+localStorage.zoneId+'&areaId='+localStorage.delivery+'&payType='+localStorage.payment +'&transport='+localStorage.transport +'&depotCode='+localStorage.depotId+'&price='+localStorage.getPrice + '&qty='+localStorage.qty + '&chq='+localStorage.chq + '&bank='+localStorage.bank + '&bankBranch='+localStorage.branch + '&remark='+localStorage.remark + '&deliveryDate='+localStorage.s_date,
			  success: function(result) {
				
				if (result!='NO'){
					resArray=result.split('<fd>')
					//alert (resArray[0]);
					
					if (resArray[0]=='Success'){
						//alert ('nadira');
						var vRes="Order "+resArray[1]
						$('#successVno').empty();
						$('#successVno').append(vRes).trigger('create');
									
						url = "#pageEnd";
						$.mobile.navigate(url); 
						//$(location).attr('href',url);
						$("#OrderSubmitButton").show();	
						//location.reload();
					}							
				}else{
					alert('Authentication Error');
					$("#OrderSubmitButton").show();	
					}
				
			  },
			  error: function(result) {
				alert(errror_str);
				$("#OrderSubmitButton").show();	
			  }				  
	});
			
		
}

function pageEndNextClient() {
			
			clientList();
			url = "#pageClient";	
			$.mobile.navigate(url);
			location.reload();
			//$(location).attr('href',url);
			
}

//===================

function exit() {
navigator.app.exitApp();
}





//================add item to list==================

function set_item_combo() {
	// alert (localStorage.itemCombo.length);
	var itemArray=localStorage.itemCombo.split('rtrt')	;
	var ob = $("#itemID_add");
	// alert ('nadira')
	$('#itemID_add').empty()
	
	var value="";
	var text="Select Item";
	// ob.prepend("<option value="+ blank +">" + text + "</option>");
	for (var i=0; i<itemArray.length-1; i++){
		var itemIdNameArray = itemArray[i].split('-');
		var item_id=itemIdNameArray[0]
		var item_name=itemIdNameArray[1]
		ob.append("<option value="+ item_id +">" + item_name +"(" +item_id +")" + "</option>");
		// "<option value='"+ item_id +"'>" + item_name +"(" +item_id +")" + "</option>");
		}			
	// ob.prepend("<option value="+ blank +">" + text + "</option>");						
	 var url = "#pageOrder";    
	 $.mobile.navigate(url);  
	// $(location).attr('href',url);
			
}




//==============client sync================




function submit_value() {
	// alert ('nadira');
	var submit_type=$("#submit_type").val()
	if (submit_type=='ORDER'){
		orderSubmit();
	}
	if (submit_type=='DELIVERY'){
		deliverySubmit();
	}
	// alert (submit_type)
	
}
function set_submit_type_ord() {
	// alert ('nadira');
	$("#submit_type").val('ORDER');
	localStorage.submit_type='ORDER';
}
function set_submit_type_del() {
	// alert ('nadira');
	$("#submit_type").val('DELIVERY');
	localStorage.submit_type='DELIVERY';
}
function set_submit_type_del_im() {
	// alert ('nadira');
	$("#submit_type").val('DELIVERYIM');
	localStorage.submit_type='DELIVERYIM';
}



//====================Delivery IM Item add End=================