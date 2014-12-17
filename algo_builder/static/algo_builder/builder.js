description_text = {
	'SMA': 'The simple moving average calculates the mean stock price for two consecutive periods and compares their percent difference.',
	'Volatility': "The volatility of a given stock is defined by it's standard deviation, the average difference from the mean per data point.",
	'Covariance': 'Hello',
	'Event': "This is soemthing",
	'Thresholds': "A passive condition, this places limits on how your portfolio may behave.",
	'Diversity': "By diversifying your portfolio, you broaden your base."
}

$(document).ready(function(){	
	$('.popup_conditions').hide();
	$('.draggable').draggable();
	$('#SMA').data({
		'origionalLeft': $("#SMA").css('left'),
    	'origionalTop': $("#SMA").css('top')
	})



	$(".cancel_button").click(function() {

		var block_id = $(this).attr('id').split("_")[0];
		form_id = "#" + block_id + "_conditions"
		$(form_id).animate({
			width: '0px',
			height: '0px',
			opacity: 0,
			borderWidth: '0px'
		}, 300);
		find_block_id = "#" + block_id
		$(find_block_id).show()
			.css({
				'top': $("#SMA").data('origionalTop'),
				'left': $("#SMA").data('origionalLeft'),
			}) // ('display','block');
    });


	$('.conditionals').submit(function(e){
		e.preventDefault();
		post_data = $(this).serialize() + '&id=' + $(this).attr('id').split('_')[0]	
		$('#behavior_conditions').show()
				.animate({
					width: "22%",
				    height: "250px",
				    opacity: 1,
				    borderWidth: "4px"
				  }, 300 );
			});

	$('#behavior_form').submit(function(e){
		e.preventDefault();
		var behavior = $(this).serialize().split("=")[0]
		post_data += '&behavior=' + behavior
		console.log(post_data)
		$.ajax({
	            url: "/builder/create_json/",
	            type: "POST",
	            data: {
	                csrfmiddlewaretoken:$.cookie('csrftoken'),
	                data: post_data
	            },
	            success: function (data) {
	                console.log(data);
	                console.log("submit form");
	            },
	            error: function (xhr, errmsg, err) {
	                alert("error");
	            }
	        });
	});

	$("#behavior_cancel").click(function() {
		$('.popup_conditions').hide();
		// $('.conditionals').hide()
		// 	.animate({
		// 	width: '0px',
		// 	height: '0px',
		// 	opacity: 0,
		// 	borderWidth: '0px'
		// }, 300);
		var splits = post_data.split('&')
		var block_id_pair = splits[splits.length-1]
		var block_id = "#" + block_id_pair.split('=')[1]
		$(block_id).show()
			.css({
				'top': $("#SMA").data('origionalTop'),
				'left': $("#SMA").data('origionalLeft'),
			}) // ('display','block');
    });

	$('.droppable').droppable({	
 		drop: function(event, ui) {
 			var match_to_block = $(ui.draggable).attr('id')
			var match_to_form = "#" + $(ui.draggable).attr('id') + "_conditions";
			console.log(match_to_form)
 			$(match_to_form).show()
 				.animate({
				    width: "22%",
				    height: "250px",
				    opacity: 1,
				    borderWidth: "4px"
				  }, 300 );
 			// possible to run AJAX post/get request if we want
 			var position_left = match_to_block + "_original_left"
 				position_top = match_to_block + "_original_top"
 			$(ui.draggable).hide()
 			// $(ui.draggable).css({
			 //        'left': $(ui.draggable).data(position_left),
			 //        'top': $(ui.draggable).data(position_top)
			 //    });
    		}
  		});

	    $('.draggable').hover(
	    	function() {
            	var id = $(this).attr('id');
            	$('.description_header')
            		.text(id)
            	$('.description_text')
            		.text(description_text[id])

            })


});
