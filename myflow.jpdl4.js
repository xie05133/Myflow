(function ($) {
	var myflow = $.myflow;

	$.extend(true, myflow.config.rect, {
		attr: {
			r: 8,
			fill: '#F6F7FF',
			stroke: '#03689A',
			"stroke-width": 2
		}
	});

	$.extend(true, myflow.config.props.props, {
		name: { name: 'name', label: '名称', value: '新建流程', editor: function () { return new myflow.editors.inputEditor(); } },
		key: { name: 'key', label: '标识', value: '', editor: function () { return new myflow.editors.inputEditor(); } },
		desc: { name: 'desc', label: '描述', value: '', editor: function () { return new myflow.editors.inputEditor(); } }
	});


	$.extend(true, myflow.config.tools.states, {
		start: {
			showType: 'image',
			type: 'start',
			name: { text: '<<start>>' },
			text: { text: '开始' },
			img: { src: 'img/48/start_event_empty.png', width: 48, height: 48 },
			attr: { width: 48, heigth: 48 },
		},
		end: {
			showType: 'image', type: 'end',
			name: { text: '<<end>>' },
			text: { text: '结束' },
			img: { src: 'img/48/end_event_terminate.png', width: 48, height: 48 },
			attr: { width: 48, heigth: 48 },
			props: {
			}
		},
		fork: {
			showType: 'image&text', type: 'fork',
			name: { text: '<<fork>>' },
			text: { text: '分支' },
			img: { src: 'img/48/gateway_parallel.png', width: 16, height: 16 },
			attr: { width: 100, heigth: 50 },
			props: {
			}
		},
		join: {
			showType: 'image&text', type: 'join',
			name: { text: '<<join>>' },
			text: { text: '合并' },
			img: { src: 'img/48/gateway_parallel.png', width: 16, height: 16 },
			attr: { width: 100, heigth: 50 },
			props: {
			}
		},
		task: {
			showType: 'image&text', type: 'task',
			name: { text: '<<task>>' },
			text: { text: '任务' },
			img: { src: 'img/48/task_empty.png', width: 16, height: 16 },
			props: {
			}
		}
	});
})(jQuery);