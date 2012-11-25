$(function(){
	var $lastClicked;

	function onTaskDeleteClick() {
		$(this).parent('.task-item').hide('slow');
	}

	function addTask(text) {
		var task = "<div class='task-item'>" + 
								"<div class='task-text'>" + text + "</div>" +
								"<div class='task-delete'>.</div>" +
								"<div class='clear'></div>" +
								"</div>";

		$("#task-list").append(task);

		$(".task-delete").click(onTaskDeleteClick);

		$(".task-item").click(onTaskItemClick);
	}

	function onTaskKeydown(event) {
		if(event.keyCode == 13) {
			addTask($("#task").val());
			$("#task").val("");
		}
	}

	function onTaskEditKeydown(event) {
		if(event.keyCode === 13) {
			savePendingEdition($lastClicked);
			$lastClicked = undefined;
		}
	}

	function onTaskItemClick(){
		if(!$(this).is($lastClicked)) {
			if($lastClicked !== undefined) {
				savePendingEdition($lastClicked);
			}

			$lastClicked = $(this);

			var text = $lastClicked.children('.task-text').text();

			var content = "<input type='text' class='task-edit' value='" + 
				text + "'>";

			$lastClicked.html(content);

			$(".task-edit").keydown(onTaskEditKeydown);
		}
	}

	function savePendingEdition($task) {
		var text = $task.children('.task-edit').val();
		$task.empty();
		$task.append("<div class='task-text'>" + text + "</div>")
					.append("<div class='task-delete'>.</div>")
					.append("<div class='clear'></div>");
	}

	$(".task-delete").click(onTaskDeleteClick);

	$("#task").keydown(onTaskKeydown);
});