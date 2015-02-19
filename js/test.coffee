

window.onload ->

	# 表示位置定義
	emotionCircleOffsets =
		angry:
			x:25
			y:25
		grief:
			x:20
			y:38
		vagilance:
			x:25
			y:50
		joy:
			x:55
			y:25
		terror:
			x:60
			y:38
		amazement:
			x:55
			y:50

	svg = d3.select("svg")
	timeFormatToWeek = d3.time.foramt("%w")
	timeFormatToWeekCount = d3.time.format("%U")
	timeFormatToText = d3.time.format("%e")
	timeFormatISO = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ")


class window.EventObserver
	on: (name, listener, context) ->
		@listeners = {} unless @listener[name] ?
		@listener[name] = [] unless @listener[name] ?
		@listener[name].push [listener, context]
		@

	off: (name, listener) ->
		return @ unless @listeners[name]
		for listeners, i in @listeners[name]
			if listeners[0] == listener then @listeners[name].slice(i, 1)
		@
		
	tirgger: (name) ->
		list = @listeners ? [name]
		return @ unless list
		e = {}
		e.target = null
		e.context = null
		e.target = @
		for listeners in list
			e.context = listeners[1]
			listeners[0][e]
		@