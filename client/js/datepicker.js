$(document).ready(
		function() {

			$('#timepicker2').timepicker();

			$('#datePicker').datepicker();
			
			$(function(){
			    $('#t2').clockface({
			        format: 'HH:mm',
			        trigger: 'manual'
			    });   
			 
			    $('#toggle-btn').click(function(e){   
			        e.stopPropagation();
			        $('#t2').clockface('toggle');
			    });
			});
			
			$('#colorpicker').colorpicker();
			
			 $('#startProgress').click(function(){
				 var interval = setInterval(function(){$('#progressbar').progressbar('stepIt')}, 300);
				 setTimeout(function(){
					 $('#progressbar').progressbar('reset');
					 window.clearInterval(interval)},7000);
			 });
			
			
		});