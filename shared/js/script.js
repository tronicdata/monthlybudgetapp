console.log("Hello, World");

var budget = {};
budget.income = {
	job: "2840"
};
budget.expenses = {
	rent: "600", 
	fun: "150",
	metrocard: "95",
	food: "250",
	gas: "120",
	gym: "30",
	insurance: "351",
	loans: "148",
	ecsi: "200",
	internet: "25"
};
var addIncome= function(){
	var form= $(".incomeForm");
	var source= form.find("input[name='incomeSource']").val();
	var amount= form.find("input[name='incomeAmount']").val();
	var payperiod= form.find("input[name= 'payperiod']:checked").val();
	budget.addIncome(source, amount, payperiod);
};

var toCurrency= function(x){
	y = parseInt(x);
	return y.toFixed(2);
};
budget.addIncome= function (source, amount, payperiod){
	var monthly = function(){
		if (payperiod === '12') {
			return amount / payperiod;
			
		}else {
			return amount * payperiod
		};
	};
	var dollars= monthly();
	currency= toCurrency(dollars);
	$(".incomelist").append("<div class='incomelistitem'><p>" + source + ": $" + currency + "</p></div><!--end incomelistitem-->")
	budget.income[source]= currency;
	
	budget.moneyLeft();
};

var addExpense= function(){
	var form= $("#expenseForm");
	var name= form.find("input[name='expenseName']").val();
	var amount= form.find("input[name='expenseAmount']").val();
	budget.addExpense(name, amount);
	
}

budget.addExpense= function(name, amount){
	currency= toCurrency(amount);
	budget.expenses[name]= currency;
	$(".expenselist").append("<div class='expenselistitem'><input type='checkbox' name='"+ name +"' value='"+ currency +"' checked/><p>" + name + ": $" + currency + "</p></div><!--end expenselistitem-->");
	checkboxCheck();
	budget.moneyLeft();
};

budget.totalExpenses = function(){
	var arr= [];
	for(var key in budget.expenses){
		var num= parseInt(budget.expenses[key]);
		arr.push(num);
	}
	var totalarr= arr.reduce(function(a, b){
		return a + b;
	});
	return totalarr;
}
budget.totalIncome= function (){
	var arr= [];
	for(var key in budget.income){
		var num= parseInt(budget.income[key]);
		arr.push(num);
	}
	var totalarr= arr.reduce(function(a, b){
		return a + b;
	});
	
	return totalarr;
};
budget.moneyLeft = function(){
	var income= budget.totalIncome();
	var expenses= budget.totalExpenses();
	var moneyLeft= income - expenses;
	$("#incomeAmount").html("$" + income);
	$("#totalExpenses").html("$" + expenses);
	$("#leftOver")
	.html("$"+ moneyLeft);
	
};

budget.rmExpense= function(name){
	delete budget.expenses[name];
	budget.moneyLeft();
	
};
var checkboxCheck = function(){
	$("input:checkbox").click(function(){
		console.log($(this).prop('checked'));
		var name= $(this).attr("name");
		var amount= $(this).val();
		if ($(this).prop("checked")){
			currency= toCurrency(amount);
			budget.expenses[name]= currency;
			budget.moneyLeft();
			$(this).next().next().remove();
		} else {
			budget.rmExpense(name);
			
			$(this).parent().append("<button class='del' >delete</delete>");
			deleteNode();
		};
	});
};

var deleteNode = function(){
	$('button.del').click(function(){
		$(this).parent().remove();
	})
};
$(document).ready(function(){
	console.log("hello, ready");
	for(var key in budget.expenses){
		var currency= toCurrency(budget.expenses[key]);
		$(".expenselist").append("<div class='expenselistitem'><input type='checkbox' name='"+ key +"' value='"+ currency +"' checked/><p>" + key + ": $" + currency + "</p></div><!--end expenselistitem-->");
	}
	for(var key in budget.income){
		var currency= toCurrency(budget.income[key]);
		$(".incomelist").append("<div class='incomelistitem'><p>" + key + ": $" + currency + "</p></div><!--end incomelistitem-->")
	}
	checkboxCheck();
	deleteNode();
	budget.moneyLeft();
});

