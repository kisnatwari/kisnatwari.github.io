window.onload = function(){
	var url = location.href;
	if(url.indexOf('file:///C:/wamp/www') != -1){
		url = url.replace('file:///C:/wamp/www','http:///localhost');
		location.replace(url);
	}
}

function add_task(){
	var textbox = document.getElementById('add-task-text-box');
	var priority = document.getElementById('priority-selector');
	if(textbox.value == '' || textbox.value == null){
		alert('Please input some tasks..');
	}else{
		var date = new Date();
		var cookie = 'cookie_'+(date.getMonth()+1)+'/'+date.getDate()+'_'+date.getTime();
		var data = {name:cookie,task:textbox.value,priority:priority.value,status:'incompleted'};
		document.cookie = cookie+'='+JSON.stringify(data)+';max-age='+calculate_second();
		textbox.value = '';
		refresh_container();
	}
}
function calculate_second(){
		var date = new Date();
		var current_hour = date.getHours();
		var remaining_sec = (24-(current_hour+1))*60*60;
		var current_min = date.getMinutes();
		var this_hr_min = (60-(current_min+1))*60;
		remaining_sec += this_hr_min;
		var current_sec = date.getSeconds();
		var this_min_sec = 60 - current_sec;
		remaining_sec += this_min_sec;
		return remaining_sec;
}
getData();
function getData(){
	var highPriority = [], mediumPriority = [], lowPriority = [];
	var cookie_data = document.cookie.split(';'),i;
	for(i=0;i<cookie_data.length;i++){
		var obj1 = cookie_data[i].split('=')[1];
		var cookie = cookie_data[i].split('=')[0];
		var obj = JSON.parse(obj1);
		if(obj.status != 'incompleted'){
			task_completed(obj);
			continue;
		}
		if(obj.priority == 'High')
			highPriority[highPriority.length] = obj;
		else if(obj.priority == 'Medium')
			mediumPriority[mediumPriority.length] = obj;
		else
			lowPriority[lowPriority.length] = obj;
	}
	for(i=0;i<highPriority.length;i++){
		task_remaining(highPriority[i],'rgba(135,0,255,1)');
	}
	for(i=0;i<mediumPriority.length;i++){
		task_remaining(mediumPriority[i],'rgba(135,0,255,0.4)');
	}
	for(i=0;i<lowPriority.length;i++){
		task_remaining(lowPriority[i],'rgba(135,0,255,0)');
	}
}
function task_remaining(task_obj,bgCol){
	var task_con = document.createElement('DIV');
	task_con.style.minHeight = '60px';
	task_con.style.marginBottom = '20px';
	task_con.style.textAlign = 'center';
	task_con.style.backgroundColor = bgCol;
	task_con.style.color = 'white';
	task_con.style.padding = '10px';
	task_con.style.boxShadow = '0 0 5px white';
	task_con.style.borderRadius = '20px';
	task_con.className = 'task';
	if(window.screen.width < 600){
		task_con.style.padding = '0';
	}
	document.getElementById('remaining-tasks-section').append(task_con);

	var text_con = document.createElement('H1');
	text_con.style.width = '100%';
	text_con.append(document.createTextNode(task_obj.task));
	task_con.append(text_con);

	var complete_btn = document.createElement('I');
	complete_btn.className = 'fa fa-check-square';
	complete_btn.setAttribute('title','Completed task "'+task_obj.task+'"');
	task_con.append(complete_btn);
	complete_btn.onclick = function(){
		task_obj.status = 'completed';
		this.parentElement.remove();
		document.cookie = task_obj.name+'='+JSON.stringify(task_obj)+';max-age='+calculate_second();
		task_completed(task_obj);
	}

	var cancel_btn = document.createElement('I');
	cancel_btn.className = 'fa fa-window-close';
	cancel_btn.setAttribute('title','Delete task "'+task_obj.task+'"');
	task_con.append(cancel_btn);
	cancel_btn.onclick = function(){
		document.cookie = task_obj.name+'= ;max-age=0';
		this.parentElement.remove();
	}
}
function task_completed(task_obj){
	var task_con = document.createElement('DIV');
	task_con.style.minHeight = '50px';
	task_con.style.marginBottom = '20px';
	task_con.style.textAlign = 'center';
	task_con.style.backgroundColor = 'inherit';
	task_con.style.color = 'white';
	task_con.style.padding = '10px';
	task_con.style.boxShadow = '0 0 5px white';
	task_con.style.borderRadius = '20px';
	task_con.className = 'task';
	document.getElementById('completed-tasks-section').append(task_con);

	var text_con = document.createElement('H1');
	text_con.style.width = '100%';
	text_con.append(document.createTextNode(task_obj.task));
	task_con.append(text_con);

	var restore_btn = document.createElement('I');
	restore_btn.className = 'fa fa-window-restore';
	restore_btn.setAttribute('title','Restore task"'+task_obj.task+'"');
	task_con.append(restore_btn);
	restore_btn.onclick = function(){
		task_obj.status = 'incompleted';
		document.cookie = task_obj.name+'='+JSON.stringify(task_obj)+';max-age='+calculate_second();
		var div_elements = document.getElementById('remaining-tasks-section').getElementsByTagName('DIV');
		this.parentElement.remove();
		refresh_container();
	}

	var cancel_btn = document.createElement('I');
	cancel_btn.className = 'fa fa-window-close';
	cancel_btn.setAttribute('title','Delete task "'+task_obj.task+'"');
	task_con.append(cancel_btn);
	cancel_btn.onclick = function(){
		document.cookie = task_obj.name+'= ;max-age=0';
		this.parentElement.remove();
	}
	if(window.screen.width < 600){
		task_con.style.padding = '0';
	}
}
function refresh_container(){
	var data = document.getElementById('remaining-tasks-section').getElementsByTagName('DIV'),i;
	for(i=data.length; i>0; i--){
		data[i-1].remove();
	}
	data = document.getElementById('completed-tasks-section').getElementsByTagName('DIV');
	for(i=data.length; i>0; i--){
		data[i-1].remove();
	}
	getData();
}