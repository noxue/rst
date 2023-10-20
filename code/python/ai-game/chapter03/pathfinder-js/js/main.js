window.onload = function () {
	start()
}

function start(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	run()
	var timer = setInterval(() => {
		epoch()
		// 清空
		ctx.clearRect(0, 0, 500, 500)
		render(ctx, 500, 500)
		renderMemory(ctx, 500, 500)
		if (!running) {
			clearInterval(timer)
		}
		console.log(generation)
	}, 1000 / 120)
}