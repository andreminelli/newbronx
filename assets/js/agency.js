(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function(e) {
    $(".navbar").addClass("d-none");
  })
  $('.portfolio-modal').on('hidden.bs.modal', function(e) {
    $(".navbar").removeClass("d-none");
  })

})(jQuery); // End of use strict

// Faz o check de player
$('#form').submit(function(e){
    $.post('data.php?arg=checar_player',$(this).serialize(), function(data){  
      $('#result .modal-body').html(data)
      $('#result').modal()       
    })
        e.preventDefault()
    })

// Faz o check do chat ilegal
$('#form_ilegal').submit(function(e){
    $.post('chat-ilegal.php',$(this).serialize(), function(data){  
    $('#result .modal-body').html(data)
    $('#result').modal()
    })
        
    e.preventDefault()
    
    })

// Restart
$('#restart').submit(function(e){
    $.post('functions.php',$(this).serialize(), function(data){  
    $('#result .modal-body').html(data)
    $('#result').modal()
    })
        
    e.preventDefault()
    
    })

// Apresenta resultado da whitelist
$('#formwhitelist').submit(function(e){
    $.post('formwhitelist.php',$(this).serialize(), function(data){  
    $('#result .modal-body').html(data)
        $('#result').modal()
        grecaptcha.reset();
    })
        
    e.preventDefault()
    
    })

// Retorna a ativação de vip
$('#vipactivator-form').submit(function(e){
    $.post('vipactivator.php',$(this).serialize(), function(data){  
    $('#result .modal-body').html(data)
        $('#result').modal()
    })
        
    e.preventDefault()
    
    })

$('#vipdisable-form').submit(function(e){
    $.post('vipdisable.php',$(this).serialize(), function(data){  
    $('#result .modal-body').html(data)
        $('#result').modal()
    })
        
    e.preventDefault()
    
    })
	
// Checar VIP
$('#check-vip').submit(function(e){
    var capture_id = $('#capture_id').val();
	
	$.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'checar-vip',capture_id:capture_id}
			}).done(function (data) {
			$('#result .modal-body').html(data)
			$('#result').modal()
		});	
        
    e.preventDefault()
    
    })
// banir old
$('#ban-form').submit(function(e){
    $.post('ban.php',$(this).serialize(), function(data){  
    $('#result .modal-body').html(data)
    $('#result').modal()
    })
        
    e.preventDefault()
    
    })

// desbanir old
$('#desban-form').submit(function(e){
    $.post('desban.php',$(this).serialize(), function(data){  
    $('#result .modal-body').html(data)
        $('#result').modal()
    })
        
    e.preventDefault()
    
    })
// Banir NOVO
function banir() {
	var id = document.getElementsByName("id")[0].value
	if (id == '') {
		alert("Você precisa preencher um id!")
	} else {
		$.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'banir',id:id}
			}).done(function (data) {
			$('#result .modal-body').html(data)
			$('#result').modal()
		});	
	}
}

// Desbanir NOVO
function desbanir() {
	var id = document.getElementsByName("id")[0].value
	if (id == '') {
		alert("Você precisa preencher um id!")
	} else {
		$.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'desbanir',id:id}
			}).done(function (data) {
			$('#result .modal-body').html(data)
			$('#result').modal()
		});	
	}
}

// Kickar NOVO
function kickar() {
	var id = document.getElementsByName("id")[0].value
	if (id == '') {
		alert("Você precisa preencher um id!")
	} else {
		$.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'kickar',id:id}
			}).done(function (data) {
			$('#result .modal-body').html(data)
			$('#result').modal()
		});	
	}
}

// Ligar servidor
function sv_start() {
	var e = document.getElementById("servidor");
	var sv = e.options[e.selectedIndex].value;
	
	if (sv === 'undefined') {
		alert("Você precisa escolher um servidor!")
	} else {
		$.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'sv_control',sv:sv,fun:1}
			}).done(function (data) {
			$('#result .modal-body').html(data)
			$('#result').modal()
		});	
	}
}

// Desligar servidor
function sv_stop() {
	var e = document.getElementById("servidor");
	var sv = e.options[e.selectedIndex].value;
	
	if (sv === 'undefined') {
		alert("Você precisa escolher um servidor!")
	} else {
		$.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'sv_control',sv:sv,fun:0}
			}).done(function (data) {
			$('#result .modal-body').html(data)
			$('#result').modal()
		});	
	}
}

// Reiniciar servidor
function sv_restart() {
	var e = document.getElementById("servidor");
	var sv = e.options[e.selectedIndex].value;
	
	if (sv === 'undefined') {
		alert("Você precisa escolher um servidor!")
	} else {
		$.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'sv_control',sv:sv,fun:2}
			}).done(function (data) {
			$('#result .modal-body').html(data)
			$('#result').modal()
		});	
	}
}


$(document).ready(function (){
            $("#vip").change(function() {
               if ($(this).val() == "vip-basic") {
                      $("#homes").addClass("d-none");
                      $("#homest").addClass("d-none");
                }else{
                    $("#homes").removeClass("d-none");
                    $("#homest").removeClass("d-none");
                } 
            });
        });
// Aqui some com botao casa quando nao vai setar casa sets
$(document).ready(function (){
            $("#nohomes").change(function() {
               if($(this).is(":checked")) {
                    $("#homes").addClass("d-none");
                    $("#homest").addClass("d-none");
                }else{
                    $("#homes").removeClass("d-none");
                    $("#homest").removeClass("d-none");
                    
                } 
            });
        });

// Verificar players online
$('#onlineplayers').submit(function(e){
	$('#page-top').loading('start')
    $.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'onlineplayers'}
			}).done(function (data) {
			$('#result .modal-body').html(data)
			$('#result').modal()
			$('#page-top').loading('stop')
		});
        
    e.preventDefault()
    
    })
	
	
	
	
	

// Verifica login para liberar menus
	window.onload=function(){
		
		if (Boolean(getCookie('auth_admin'))) {
			$("#staff").removeClass("d-none");
			$("#players").removeClass("d-none");
			$("#check").removeClass("d-none");
			$("#nav-movimentacao").removeClass("d-none");
			$("#banned").removeClass("d-none"); // manager
            $("#desban").removeClass("d-none"); // manager
			$("#nav-lista-vips").removeClass("d-none");
			$("#vipactivator").removeClass("d-none");
            $("#gerenciar-servidores").removeClass("d-none");    
		} 
		
		else if (Boolean(getCookie('auth_chefe'))) {			
			$("#staff").removeClass("d-none");
            $("#players").removeClass("d-none");
            $("#check").removeClass("d-none");
			$("#nav-movimentacao").removeClass("d-none");
			$("#banned").removeClass("d-none"); // manager
            $("#desban").removeClass("d-none"); // manager
			$("#gerenciar-servidores").removeClass("d-none");
        }
		
		else if (Boolean(getCookie('auth_manager'))) {			
			$("#staff").removeClass("d-none");
            $("#players").removeClass("d-none");
            $("#check").removeClass("d-none");
			$("#nav-movimentacao").removeClass("d-none");
			$("#banned").removeClass("d-none"); // manager
            $("#desban").removeClass("d-none"); // manager
        }
        
		else if (Boolean(getCookie('auth_viewer'))) {			
			$("#staff").removeClass("d-none");
            $("#players").removeClass("d-none");
            $("#check").removeClass("d-none");
			$("#nav-movimentacao").removeClass("d-none");
        }
        
		else {
            if (location.pathname=='/sets.html' ||
            location.pathname=='/check.html' ||
            location.pathname=='/players.html' ||
            location.pathname=='/ban.html' ||
            location.pathname=='/chat-ilegal.html' ||
            location.pathname=='/lista-vips.html'||
            location.pathname=='/desban.html'||
            location.pathname=='/movimentacao.html' ||
            location.pathname=='/sv-control.html') {
            location.href='/entrar.html'
            }
        }
	}
	
		function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}


// Carrega lista de contas ativas
if (location.pathname == '/lista-vips.html') {
	
	$(document).ready(function(){
		//$('#lista-vips').hide()
        $.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'lista_vips'}
			}).done(function (data) {
			$('#tabela-vips').html(data)
            $('#lista-vips').slideDown(1000)
		});
        // Quantidade de vips ativos
        $.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'qtd_vips_ativos'}
			}).done(function (data) {
			$('#qtd_vips_ativos').html(data).toggleClass('d-none')
		});
        // Valor dos vips neste mes
        $.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'valor_vips_mes'}
			}).done(function (data) {
			$('#valor_vips_mes').html(data).toggleClass('d-none')
		});
	})
	
}

// Carrega movimentacao financeira
if (location.pathname == '/movimentacao-financeira.html') {
	
	$(document).ready(function(){
		//$('#lista-vips').hide()
        $.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'movimentacao_financeira'}
			}).done(function (data) {
			$('#lista-movimentacao').html(data)
            $('#lista-movimentacao').slideDown(1000)
		});
        
    });
}
                      

// Desabilitar vip
function disable_vip(hash) {
    var r = confirm("Deseja desabilitar este vip?");
    if (r == true) {
        $.ajax({
			url: '/data.php',
			method: 'get',
			data: {arg:'disable_vip',hash:hash}
			}).done(function (data) {
           alert(data);
           location.reload()
		});
	}
	
}

// Limpar pesquisa
$('#clear-search').on('search', function(e) {
	if('' == this.value) {
		
		$('.results tbody tr').attr('visible','true');
		$('.no-result').attr('visible','false').removeAttr('style');
	}
});

// buscas da tabela
$(document).ready(function() {
	$(".search").keyup(function () {
		var searchTerm = $(".search").val();
		var listItem = $('.results tbody').children('tr');
		var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
		
		$.extend($.expr[':'], {'containsi': function(elem, i, match, array){
			return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
		});
		
		$(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
			$(this).attr('visible','false');
		});
		
		$(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
			$(this).attr('visible','true');
		});
		
		var jobCount = $('.results tbody tr[visible="true"]').length;
		$('.counter').text(jobCount + ' item');
		console.log(jobCount)
		if(jobCount == '0') {$('.no-result').show();}
		else {$('.no-result').hide();}
	});
});

// Mostra imagem do carro ao passar o mouse
$(document).ready(function() {
	$('label').hover(function(){
		var img = $(this).find('input').val();
		$("#img_preview").attr('src','/assets/img/carros/' + img + '.png');
		$('#block-preview').removeClass('d-none');
	})
	
	//$('.checkbox input:checkbox').mouseover(function() {console.log(this.value)
	//var img = this.value;
	//$("#img_preview").attr('src','/assets/img/carros/' + img + '.png');
	//$('#block-preview').removeClass('d-none');
	//})
})

$(document).ready(function() {
$('label').mouseout(function() {
	$('#block-preview').addClass('d-none');
	})
})

//multiselect-container dropdown-menu show


