function CanvasPadApp() {
    var version = "4.1",
    canvas2d = new Canvas2D($("#main>canvas")),
    toolbar = new Toolbar($("#toolbar"));
    toolbar.toolbarButtonClicked = toolbarButtonClicked;
	toolbar.menuItemClicked = menuItemClicked;
    drawing = false;
    fillShapes = true;
	points = [];
	actions = [];
	curTool = "pen";
	curAction = newAction(curTool);
	function toolbarButtonClicked(action) {
		switch (action) {
			case "clear":
				if (confirm("Clear the canvas?")) {
					actions = [];
					redraw();
				}
				break;
			case "undo":
				actions.pop();
				redraw();
				break;
		}
	}
	function menuItemClicked(option, value) {
		switch (option) {
			case "drawingTool":
				curTool = value;
				break;
			case "fillShapes":
				fillShapes = Boolean(value);
				break;
			default:
				canvas2d[option](value);
		}
	}
    this.start = function() {
		$("#app header").append(version);
		$("#main>canvas").mousemove(onMouseMove)
			.mousedown(onMouseDown)
			.mouseup(onMouseUp)
			.mouseout(onMouseUp);
			initColorMenu();
			initWidthMenu();
	}
	function onMouseMove(e) {
		penMoved(e.pageX, e.pageY);
	}
	function penMoved(pageX, pageY) {
		var canvasPoint = canvas2d.getCanvasPoint(pageX, pageY);
		showCoordinates(canvasPoint);
		if (drawing) {
			if (curTool == "pen") {
				// Add another point
				curAction.points.push(canvasPoint);
			} else {
				// Change the second point
				curAction.points[1] = canvasPoint;
			}
			redraw();
		}
	}
	function redraw() {
		// why we'd redraw every time as the mouse moves
		// console.log('redraw called');
		canvas2d.clear();
		canvas2d.savePen();
		for (var i in actions) {
			var action = actions[i];
			canvas2d.penColor(action.color)
					.penWidth(action.width)
					.penOpacity(action.opacity);
			switch (action.tool) {
				case "pen":
					canvas2d.drawPoints(action.points);
					break;
				case "line":
					canvas2d.drawLine(action.points[0],
						action.points[1]);
					break;
				case "rect":
					canvas2d.drawRect(action.points[0],
						action.points[1],
						action.fill);
					break;
			}
		}
		canvas2d.restorePen();
	}
	function onMouseUp(e) {
		penUp();
	}
	function penUp() {
		if (drawing) {
			drawing = false;
			if (curAction.points.length < 2) {
				actions.pop();
			}
		}
	}
	function onMouseDown(e) {
		e.preventDefault();
		penDown(e.pageX, e.pageY);
	}
	function penDown(pageX, pageY) {
		drawing = true;
		curAction = newAction(curTool);
		curAction.points.push(canvas2d.getCanvasPoint(pageX, pageY));
		actions.push(curAction);
	}
	function showCoordinates(point) {
		$("#coords").text(point.x + ", " + point.y);
	}
	function initColorMenu() {
		$("#color-menu li").each(function(i, e) {
			$(e).css("background-color", $(e).data("value"));
		});
	}
	function initWidthMenu() {
		$("#width-menu li").each(function(i, e) {
			$(e).css("border-bottom",
			$(e).data("value") + "px solid black");
		});
	}
	function newAction(tool) {
		return {
			tool: tool,
			color: canvas2d.penColor(),
			width: canvas2d.penWidth(),
			opacity: canvas2d.penOpacity(),
			fill: fillShapes,
			points: []
		};
	}
}

$(function() {
	window.app = new CanvasPadApp();
	window.app.start();
});