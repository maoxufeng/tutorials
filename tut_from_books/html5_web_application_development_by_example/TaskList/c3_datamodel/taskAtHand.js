function TaskAtHandApp() {
	var version = "v1.0";
	var appStorage = new AppStorage("taskAtHand");
	var taskList = new TaskList();
	var timeoutId = 0;
	function setStatus(message, noFade) {
		$("#app>footer").text(message).show();
		if (!noFade) {
			$("#app>footer").fadeOut(1000);
		}
	}
	function loadTaskList() {
		var tasks = appStorage.getValue("taskList");
		taskList = new TaskList(tasks);
		rebuildTaskList();
	}
	function rebuildTaskList() {
		// Remove any old task elements
		$("#task-list").empty();
		// Create DOM elements for each task
		taskList.each(function(task) {
			addTaskElement(task);
		});
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
			var task = new Task(taskName);
			taskList.addTask(task);
			appStorage.setValue("nextTaskId", Task.nextTaskId);
			addTaskElement(task);
			saveTaskList();
			// Reset the text field
			$("#new-task-name").val("").focus();
		}
	}
	function onChangeTaskDetails(taskId, $input) {
		var task = taskList.getTask(taskId)
		if (task) {
			var fieldName = $input.data("field");
			task[fieldName] = $input.val();
			saveTaskList();
		}
	}
	function addTaskElement(task) {
		var $task = $("#task-template .task").clone();
		$task.data("task-id", task.id);
		$("span.task-name", $task).text(task.name);
		
		// Populate all of the details fields
		$(".details input, .details select", $task).each(function() {
			var $input = $(this);
			var fieldName = $input.data("field");
			$input.val(task[fieldName]);
		});
		$(".details input, .details select", $task).change(function() {
			onChangeTaskDetails(task.id, $(this));
		});


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
		if (timeoutId) clearTimeout(timeoutId);
		setStatus("saving changes...", true);
		timeoutId = setTimeout(function() {
			appStorage.setValue("taskList", taskList.getTasks());
			timeoutId = 0;
			setStatus("changes saved.");
		},
		2000);
	}
}

$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});