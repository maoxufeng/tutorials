function TaskAtHandApp() {
	var version = "v1.0";
	var appStorage = new AppStorage("taskAtHand");
	function setStatus(message) {
		$("#app>footer").text(message);
	}
	function loadTaskList() {
		var tasks = appStorage.getValue("taskList");
		if (tasks) {
		for (var i in tasks) {
			addTaskElement(tasks[i]);
			}
		}
	}
	this.start = function() {
		$("#new-task-name").keypress(function(e) {
			// Enter key
			if (e.which == 13) {
				addTask();
				return false;
			}
		}).focus();
		$("#app header").append(version);
		loadTaskList();
		setStatus("ready");
	};	
	function addTask() {
		var taskName = $("#new-task-name").val();
		if (taskName) {
			addTaskElement(taskName);
			// Reset the text field
			$("#new-task-name").val("").focus();
		}
	}
	function addTaskElement(taskName) {
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);
		$("#task-list").append($task);
		$("button.delete", $task).click(function() {
			removeTask($task);
		});
		$("button.move-up", $task).click(function() {
			moveTask($task, true);
		});
		$("button.move-down", $task).click(function() {
			moveTask($task, false);
		});
		$("span.task-name", $task).click(function() {
			onEditTaskName($(this));
		});
		$("input.task-name", $task).change(function() {
			onChangeTaskName($(this));
		})
		.blur(function() {
			$(this).hide().siblings("span.task-name").show();
		});
		saveTaskList();
		$task.click(function() {
			onSelectTask($task);
		});
		$task.blur(function() {
			$task.siblings(".selected").removeClass("selected");
		});
		// $task.mouseleave(function() {
		// 	$task.siblings(".selected").removeClass("selected");
		// });
		$("button.toggle-details", $task).click(function() {
			toggleDetails($task);
		});
	}
	function toggleDetails($task) {
		$(".details", $task).slideToggle();
		$("button.toggle-details", $task).toggleClass("expanded");
	}
	function removeTask($task) {
		$task.remove();
		saveTaskList();
	}
	function moveTask($task, moveUp) {
		if (moveUp)	{
			$task.insertBefore($task.prev());
		} else {
			$task.insertAfter($task.next());
		}
		saveTaskList();
	}
	function onEditTaskName($span) {
		$span.hide().siblings("input.task-name")
			.val($span.text()).show().focus();
	}
	function onChangeTaskName($input) {
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val()) {
			$span.text($input.val());
		}
		$span.show();
	}
	function onSelectTask($task) {
		if ($task) {
			// Unselect other tasks
			$task.siblings(".selected").removeClass("selected");
			// Select this task
			$task.addClass("selected");
		}
	}
	function saveTaskList() {
		var tasks = [];
		$("#task-list .task span.task-name").each(function() {
			tasks.push($(this).text())
		});
		appStorage.setValue("taskList", tasks);
	}
}

$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});