window.onload = function () {

    function getRow(parent, num_r) {
    	var Arr = [];
    	var i = 1;
    	_.times(num_r, function() {Arr.push($(parent).find('tr').eq(i++))})
    	return Arr;
    }

    function getCol(parent, num_r, num_c, str) {
        var col = [], j = 0;
        for (var i = 0; i < num_c; i++) {
            if ($(parent).find('th').eq(i).html() == str) {
                var temp = 'td:eq('+i+')';
                _.times(num_r, function() {col.push(parent.find('tr').find(temp).eq(j++).text())})
            }
        }
        return col;
    }
    
    $('table th').unbind('click');
    
	$('table th').click(function () {
		var comp = true;
        var parent = $(this).parent().parent().parent();
		if ($(this).attr('class') == 'begin' || $(this).attr('class') == 'descend') {
		    parent.find('th').attr('class', 'begin');
			$(this).attr('class', 'ascend');
		} else {
			comp = false;
		    parent.find('th').attr('class', 'begin');
			$(this).attr('class', 'descend');
		}
        var R = $(parent).find('tr').length-1;
        var C =  $(parent).find('th').length;
		sort($(this).html(), comp, parent, R, C);
	})

    function sort(str, jugement, parent, num_r, num_c) {
        var row = getRow(parent, num_r);
        var col = getCol(parent, num_r, num_c, str);
        desort(num_r, row, col, jugement);
        show(parent, row, col, num_r);
    }

    function show(parent, row, col, num_r) {
        var str = '';
        for (var i = 0; i < num_r; i++) {
            if (i%2 == 0) str += '<tr>'+row[i].html()+'</tr>';
            else str += '<tr class="alternate">'+row[i].html()+'</tr>';
        }
        parent.find('tbody').html(str);
    }

    function desort(num_r, row, col, jugement) {
    	for (var i = 0; i < num_r-1; i++) {
    		for (var j = i+1; j < num_r; j++) {
                if ((col[i] > col[j]) === jugement) {
                	var temp = col[i];
                	col[i] = col[j];
                	col[j] = temp;
                	temp = row[i];
                	row[i] = row[j];
                	row[j] = temp;
                }
    		}
    	}
    }

}
