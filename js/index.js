$(function() {

	// потребителски имена за чата
	var you = 'Ти';
	var robot = 'Влади';

	// забавя отговора с между 200 и 600 милисекунди
	var delayStart = 200;
	var delayEnd = 600;

	// инициализация
	var bot = new chatBot();
	var chat = $('.chat');
	var waiting = 0;
	$('.busy').text(robot + ' пише...');

	// подава се входа от потребителя и се връща отговора на бота
	var submitChat = function() {

		var input = $('.input input').val();
		if(input == '') return;

		$('.input input').val('');
		updateChat(you, input);

		var reply = bot.respondTo(input);
		if(reply == null) return;

		var latency = Math.floor((Math.random() * (delayEnd - delayStart)) + delayStart);
		$('.busy').css('display', 'block');
		waiting++;
		setTimeout( function() {
			if(typeof reply === 'string') {
				updateChat(robot, reply);
			} else {
				for(var r in reply) {
					updateChat(robot, reply[r]);
				}
			}
			if(--waiting == 0) $('.busy').css('display', 'none');
		}, latency);
	}

	// добавя новото съобщение в чата
	var updateChat = function(party, text) {

		var style = 'you';
		if(party != you) {
			style = 'other';
		}

		var line = $('<div><span class="party"></span> <span class="text"></span></div>');
		line.find('.party').addClass(style).text(party + ':');
		line.find('.text').text(text);

		chat.append(line);

		chat.stop().animate({ scrollTop: chat.prop("scrollHeight")});

	}

	// изпращане на съобщения с enter и кликане на бутон
	$('.input').bind('keydown', function(e) {
		if(e.keyCode == 13) {
			submitChat();
		}
	});
	$('.input a').bind('click', submitChat);

	// първите съобщения в чата
	updateChat(robot, 'Здравейте! Аз съм Влади и ще ви обслужвам днес.');

	updateChat(robot, 'Да започнем с това какво наргиле ще искате. Трябва да направите комбинация от марка и аромат на тютюна, течност във вазата и големина на чашката.');

});
