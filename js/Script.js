var showing = null;

// Faites le code jQuery ici
$(document).ready(function () {
	$('li').click(function () {
		if($(this).find('img').attr("src")=='img/tick.png'){
			$(this).find('img').attr("src", 'img/cross.png');
		}else{
			$('li img').attr('src', 'img/cross.png');
			$(this).find('img').attr("src", 'img/tick.png');
		}
		
	});
});

$(document).ready(function () {
	$('#floatRight').hover(function () {
		$(this).css("opacity", "0.5");
	},function(){
		$(this).css("opacity", "1");
	});
});


$(document).ready(function () {
	
	$('input[name=choix][value=SNavette]').click(function(){
		show($('#SNavette'));
	});
});

$(document).ready(function () {
	
	$('input[name=choix][value=sectionChauffeur]').click(function(){
		show($('#sectionChauffeur'));
	});
});

$(document).ready(function () {
	$('input[name=choix][value=sectionTaxi]').click(function(){
		show($('#sectionTaxi'));
	});
});


$(document).ready(function () {
	$('#sectionTaxi').toggle();
	$('#sectionChauffeur').toggle();
	$('#SNavette').toggle();
});



$(document).ready(function(){
        $("#SNavette").append("<table></table>");
        $("#SNavette table:last").attr('id', 'tableNavette');
        $("#SNavette table:last").append("<tr></tr>");
         $("<th></th>").html('Numero de navette').appendTo("#SNavette table tr:first");
         $("<th></th>").html('Immatriculation').appendTo("#SNavette table tr:first");
         $("<th></th>").html('Nombre de places').appendTo("#SNavette table tr:first");
         $("<th></th>").html('Marque').appendTo("#SNavette table tr:first");
        $.ajax({
            type: "GET",
            url: "xml/navettes.xml",
            dataType: "xml",
            success: function(xml){
                $(xml).find('navette').each(function(){
                	 $("#SNavette table").append("<tr></tr>");
                	 $(this).find("numNavette").each(function(){
                var num = $(this).text();
               // alert(sTitle);
			   $("<td></td>").html(num).appendTo("#SNavette table tr:last");
                	 });

                	 $(this).find("immatriculation").each(function(){
                var imm = $(this).text();
               // alert(sTitle);
			   $("<td></td>").html(imm).appendTo("#SNavette table tr:last");
                	 });

                	 $(this).find("nbPlace").each(function(){
                var nb = $(this).text();
               // alert(sTitle);
			   $("<td></td>").html(nb).appendTo("#SNavette table tr:last");
                	 });

                	 $(this).find("marque").each(function(){
                var marque = $(this).text();
               // alert(sTitle);
			   $("<td></td>").html(marque).appendTo("#SNavette table tr:last");
                	 });
               
            });
         },
            error: function() {
            alert("An error occurred while processing XML file.");
            }
        });
    });
function getChauffeurAuto() {
	// l'objet pour les requetes
	var req = null;
	

	document.chauf.nomCh.value = "Started...";

	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			req = new XMLHttpRequest();
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return;
	}

	req.onreadystatechange = function () {
		document.chauf.nomCh.value = "Wait server...";
		if (req.readyState == 4) {
			if (req.status == 200) {

				var doc = req.responseXML;
				// l'ellements chercher
				console.log("lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
				var element = doc.getElementsByTagName('chauffeur').item(document.getElementById("listeChauffeur").selectedIndex);
				console.log(element);
				document.chauf.nomCh.value = element.firstElementChild.firstChild.data;
				document.chauf.prenomCh.value = element.childNodes[3].firstChild.data;
				document.chauf.telephone.value = element.childNodes[5].firstChild.data;
				document.chauf.numPermis.value = element.childNodes[7].firstChild.data;
				document.chauf.refVeh.value = element.childNodes[9].firstChild.data;
				//childNodes.item(0);
			} else {
				console.log("wtf");
				document.chauf.nomCh.value = "Error: returned status code " + req.status + " " + req.statusText;
			}
		}
	};
	req.open("GET", "xml/chauffeurs.xml", true);
	req.send(null);
}

function submitForm() {

	// l'objet pour les requetes
	var req = null;

	document.ajax.numTaxi.value = "Started...";

	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			req = new XMLHttpRequest();
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return;
	}

	req.onreadystatechange = function () {
		document.ajax.numTaxi.value = "Wait server...";
		if (req.readyState == 4) {
			if (req.status == 200) {
				var doc = req.responseXML;
				// l'ellements chercher
				var element = doc.getElementsByTagName('taxi').item(document.getElementById("listeTaxi").selectedIndex);
				console.log(element);
				document.ajax.numTaxi.value = element.firstElementChild.firstChild.data;
				document.ajax.zone.value = element.childNodes[3].firstChild.data;
				document.ajax.immatriculation.value = element.childNodes[5].firstChild.data;
				document.ajax.nbPlace.value = element.childNodes[7].firstChild.data;
				document.ajax.marque.value = element.childNodes[9].firstChild.data;
				$("#floatRight").css("background-image", "url(img/"+ element.childNodes[11].firstChild.data +".jpg)");
			
				//childNodes.item(0);
			} else {
				document.ajax.numTaxi.value = "Error: returned status code " + req.status + " " + req.statusText;
			}
		}
	};
	req.open("GET", "xml/taxis.xml", true);
	req.send(null);
}


function show(newShow){
	console.log(!(newShow.is(showing)));
	if(showing==null){
		newShow.toggle("slow");
		showing = newShow;
	}else{
		if(!(newShow.is(showing))){
			newShow.toggle("slow");

			showing.toggle();
			showing = newShow;
	}
	}

	
	

		
}
$(function () {
		//Insérez toutes les fonctions ici
	}

);

// Faites le code jQuery ici

// Super auto du futur
$(document).ready(function () {
	var $position = 90; // position de depart

	function coin1(x, y) {
		rotate($position);
		$("#navette").animate({
			marginLeft: "125px",
			marginTop: "0px"
		}, 250);
		coin2();
	}

	function coin2() {
		rotate($position);
		$("#navette").animate({
			marginLeft: "125px",
			marginTop: "125px"
		}, 250);
		coin3();
	}

	function coin3() {
		rotate($position);
		$("#navette").animate({
			marginLeft: "0px",
			marginTop: "125px"
		}, 250);
		coin4();
	}

	function coin4() {
		rotate($position);
		$("#navette").animate({
			marginLeft: "0px",
			marginTop: "0px"
		}, 250);
		coin1();
	}

	// pour la rotation de l'auto
	function rotate(valeur) {
		$position = valeur + 90;
		$('#navette').animate({
			borderSpacing: $position
		}, {
			step: function (now, fx) {
				$(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
				$(this).css('-moz-transform', 'rotate(' + now + 'deg)');
				$(this).css('transform', 'rotate(' + now + 'deg)');
			},
			duration: 'fast'
		}, 'linear');
	}
	coin1();
});


$(function () {
	//Insérez toutes les fonctions ici


});