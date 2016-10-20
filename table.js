+(function(){
	'use strict';
    $.fn.editableTd= function(){
    	
		$(this).click(function(){
    		 
    	var  nub = 0, w_nub= 0, sum= 0;//计算变量
    		//单击td 
        var tdObj = $(this); 
        var text = tdObj.html();
        //保存原来的文本  
        var oldText = $(this).text();  

        //创建一个文本框  
        var inputObj = $("<input type='text' class='input' value='" + oldText + "'/>");  

        //去掉文本框的边框  
        inputObj.css("border-width", 0);  
        inputObj.dblclick(function () {  
           alert(inputVal);  
        });
       //获取当前按键的键值
		 inputObj.keydown(function(e){
		
		//jQuery的event对象上有一个which的属性可以获得键盘按键的键值
			var keycode = e.which;
			//回车键
			if(keycode==13){
			//获取当前文本框的内容
			var inputtext = $(this).val();
			//将td的内容修改成文本框中的内容
			tdObj.html(inputtext);
			}
	//		left
			if(keycode == 37){
	
				$(this).parent().prev().click();
			}
	//		up
			if(keycode == 38){
	
				var num=$("#tb_calculation tr td").index($(this).parent());
				
				$("#tb_calculation tr td").eq(num-4).click();
			}
	//		right
			if(keycode == 39){
	
				$(this).parent().next().click();
			}
	//		down
			if(keycode == 40){
//				alert("1");
				var num=$("#tb_calculation tr td").index($(this).parent());
				
				$("#tb_calculation tr td").eq(num+4).click();
			}
			if(keycode == 27){
			//将td中的内容还原成text
	
			tdObj.html(text);
			}
		});
        //使文本框的宽度和td的宽度相同  
        inputObj.width(tdObj.width());  
        inputObj.height(tdObj.height());  
        //去掉文本框的外边距  
        inputObj.css("margin", 0);  
        inputObj.css("padding", 0);  
        inputObj.css("text-align", "center");  
        inputObj.css("font-size", "16px");  
        inputObj.css("background-color", tdObj.css("background-color"));  
        //把文本框放到td中  
        $(".td_num").click(function(){
        	
        });
        tdObj.html(inputObj); 
        //文本框失去焦点的时候变为文本  
        inputObj.blur(function () {    
            var newText = $(this).val();   // 获取值
            var ts_parent = $(this).parent();//获取有变动td 的位置
            newText = $.trim(newText);// 用jQuery的trim方法删除前后空格
             
            var testVal=/^[0-9]*[1-9][0-9]*$/
            nub = ts_parent.index();  //当改变后的文本框失去焦点后开始进行修改total里面的值
            if(newText.length==0){
            	
            	tdObj.html(oldText);
            
        	}else if(tdObj.hasClass("td_num")){
            	if(testVal.test(newText)==false){
            		tdObj.html(oldText);
        			tdObj.css("background","red");
            		
        			
				} else{
					tdObj.html(newText);
					tdObj.css("background","#E4E4E4");
					sumb();   //加法运算
                attend(); //把算好的值放入total
				}
            }else{
            	tdObj.html(newText);
            	
                sumb();   //加法运算
                attend(); //把算好的值放入total
            	
            }
				
        
				
        });  

            
        //全选  
          inputObj.trigger("select");
            //加法运算开始
        function sumb() {
            var tds = [];//这是一个存放有改动td一列的所有值
            var i = 0;
            var w_nub= parseInt(nub);//把nub转换成数字
            sum= 0;//这里要把 td列总和 清零，以便点击其他td列可以正常运算
            $('#tb_calculation tr').find('td').each(function () {//遍历所有tr中的td
                if ($(this).index() == w_nub) { // 获取tr中被改变td那一列的值
                    var td = $(this);//筛选后获得的符合条件的td
                    tds.push($(this).html());//把td里面的内容放进集合里面存着
                    tds[tds];//集合的链接：因为每次遍历只找到一个，为了最后能得到一个整的集合，所以这样做
                };
            })
            while (i < $('#tb_calculation tr').length) {//这里就是进行集合里面的内容运算的地方
                sum+= parseInt(tds[i]);//把集合里面的内容转换成数字进行计算（虽然本身就是数字，但是是字符串）
                i++}
            return sum;}//把和弹出来给attend（）方法用
        //加法运算结束

        //放值开始
        function attend() {//把算好的值放入total
            var w_nub = parseInt(nub);//把nub转换成数字
            if(w_nub!==0){//判断w_nub的值是否是0，是0的话只能改值不会放值
                $('#tb_sum').find('.tb_alone').each(function () {//遍历所有th，找到对应有改变的td那一列的th
                    if ($(this).index() == w_nub) {//开始筛选
                        $(this).empty();//先清空原来的值，好把改变后的总和放进去
                        $(this).html(sum);//把改变后的总和放进去
                    }
                });
            }

        }

        //放值结束
    	});
    	
    }
})(jQuery)

