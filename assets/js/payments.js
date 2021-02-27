// Desabilita o enter no form
$('html').bind('keypress', function(e) {
 if (e.keyCode == 13) {
  return false;
 }
});

// Monitora select para ajustar o preco do vip
var app = {
 vip_value: 30.00,
 plano: 'ND',
 id: '',
 mansao: 'ND',
 carros: 0,
 max_car: 1
};

 $("#plano-vip").change(function() {
  //document.getElementById('#paypal-button-container').remove()
  if ($(this).val() == "vip-basic") {
   app.vip_value = 30.00
  } else if ($(this).val() == "vip-advanced") {
   app.vip_value = 50.00
  } else if ($(this).val() == "vip-premium") {
   app.vip_value = 70.00
  } else if ($(this).val() == "vip-diamond") {
   app.vip_value = 100.00
  } else if ($(this).val() == "vip-supreme") {
   app.vip_value = 150.00
  }

 });

// PAYPAL - Renderiza botão + acoes de retorno
paypal.Buttons({
 createOrder: function(data, actions) {
  return actions.order.create({
   purchase_units: [{
    amount: {
     value: app.vip_value
    }
   }]
  });
 },
 onApprove: function(data, actions) {
  return actions.order.capture().then(function(details) {
   //envia ativacao do vip
   app.orderID = data.orderID;
   $("#sendactivator").submit()
  });
 },
 onCancel: function(data, actions) {

 }
}).render('#paypal-button-container');



// Manipulador form send activator
$("#sendactivator").submit(function(event) {
 $('#page-top').loading('start')
 $.post('/paypal/vip-activator.php?order_id=' + app.orderID, $(this).serialize(), function(data) {
  $('.login-clean').html(data)
  $('#page-top').loading('stop')
 })
 event.preventDefault();
});

// Tentar ativar novamente quando esta online
//$(document).on('click', 'body', function() {
// $('#isOnline').submit(function(e) {
//  $('#page-top').loading('start')
//  $.post('paypal/vip-activator.php?arg=tentar_novamente', $(this).serialize(), function(data) {
//   $('.login-clean').html(data)
//   $('#page-top').loading('stop')
//  })
//  e.preventDefault()
// })
//});

// Identifica qual plano ativar
$("#plano-vip").change(function() {
 app.plano = $(this).val()
 
// Maximo de carros selecionados
 if ($(this).val() == 'vip-basic' || $(this).val() == 'vip-advanced') { 
	 app.max_car = 1;
 } else if ($(this).val() == 'vip-premium') {
	 app.max_car = 2;
 } else if ($(this).val() == 'vip-diamond' || $(this).val() == 'vip-supreme') {
	 app.max_car = 4;
 } else { app.carros = ''}

 // Some com input mansao quando e vip basic
 if (app.plano == 'vip-basic') {
	$('#bloco-mansao').addClass('d-none');
 } else {
	$('#bloco-mansao').removeClass('d-none');
 }

 // Limpa todos carros sempre q troca o vip
 $("#carros-vip").multiselect("clearSelection")
 // Libera carros para selecionar
 $('#carros-vip option').each(function() {
 var input = $('input[value="' + $(this).val() + '"]');
 input.prop('disabled', false);
 input.parent('li').addClass('disabled');
 });
 app.carros = [];
 showPaymentButton()

});


// Identifica se preencheu ID
$("#id").change(function() {
 app.id = $(this).val()
 showPaymentButton()
});

// Identifica a mansão-vip
$("#mansao-vip").change(function() {
 app.mansao = $(this).val()

  //Verifica se quer mansao para liberar mais um carro
  if (app.plano != 'vip-basic' && app.mansao == 'trocar-carro') {
  app.max_car = app.max_car + 1
  } else {
	  
	   if (app.plano == 'vip-basic' || app.plano == 'vip-advanced') { 
			app.max_car = 1;
		} else if (app.plano == 'vip-premium') {
			app.max_car = 2;
		} else if (app.plano == 'vip-diamond' || app.plano == 'vip-supreme') {
			app.max_car = 4;
		} else { app.carros = ''}
	  
  }
 
 // Limpa todos carros sempre q troca o vip
 $("#carros-vip").multiselect("clearSelection")
 // Libera carros para selecionar
 $('#carros-vip option').each(function() {
 var input = $('input[value="' + $(this).val() + '"]');
 input.prop('disabled', false);
 input.parent('li').addClass('disabled');
 });
 app.carros = [];

 showPaymentButton()
});

// Identifica os carros
$("#carros-vip").change(function(event) {
 app.carros = $(this).val()
 showPaymentButton()
});

$('#carros-vip').multiselect({
 nonSelectedText: 'Selecione seus veículos',
 numberDisplayed: '5',
 buttonClass: 'btn btn-warning',
 buttonWidth: '100%',
 nSelectedText: 'carros selecionados',

 onChange: function(option, checked) {
  // Get selected options.
  var selectedOptions = $('#carros-vip option:selected');

  if (selectedOptions.length >= app.max_car) {
   // Disable all other checkboxes.
   var nonSelectedOptions = $('#carros-vip option').filter(function() {
    return !$(this).is(':selected');
   });

   nonSelectedOptions.each(function() {
    var input = $('input[value="' + $(this).val() + '"]');
    input.prop('disabled', true);
    input.parent('li').addClass('disabled');
   });
  } else {
   // Enable all checkboxes.
   $('#carros-vip option').each(function() {
    var input = $('input[value="' + $(this).val() + '"]');
    input.prop('disabled', false);
    input.parent('li').addClass('disabled');
   });
  }
 }
});

// Primeiro submit Pagseguro - Gerar Order ID
$('#submit-pagseguro').on('click', function(event) {
    $.ajax({
			url: '/paypal/pagseguro.php',
			method: 'get',
			data: {
				    'arg':'gerar_order_id',
					'plano':app.plano
				}
			}).done(function (data) {
			var json = JSON.parse(data)
			$('#referencecode').val(json['referencecode']) 
			
			app.orderID = json['referencecode']
			$("#sendactivator").submit()
			
			console.log(json['code'])
			console.log(json['referencecode'])

			//document.getElementById('referencecode').value
			
			// PAGSEGURO - Acoes de retorno
			var code = json['code'];
			var callback = {
				success : function(transactionCode) {
					// retorno
					//envia ativacao do vip
					app.orderID = transactionCode;
					console.log("Compra feita com sucesso, código de transação: " + transactionCode);
				},
				abort : function() {
					//erro ou abandonar
					console.log("abortado");
				}
			};
			//Chamada do lightbox passando o código de checkout e os comandos para o callback
			var isOpenLightbox = PagSeguroLightbox(code, callback);
			
		});
});





// Mostrar ou ocultar botão de pagamento
function showPaymentButton() {
 
 if (app.plano != 'ND' && app.id != '' && app.carros.length > 0 && window.location.search == "?paypal") {
	$('#paypal-button-container').removeClass('d-none');
 } 
 else if (app.plano != 'ND' && app.id != '' && app.carros.length > 0 && window.location.search == "?pagseguro") {
	$('#pagseguro-button-container').removeClass('d-none');
 }
 else {
  $('#paypal-button-container').addClass('d-none');
  $('#pagseguro-button-container').addClass('d-none');
 }
};