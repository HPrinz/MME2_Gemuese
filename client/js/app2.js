// Generated by CoffeeScript 1.3.3
(function(){$(function(){$($("#myhero li")[0]).addClass("selected");$($("#myhero li a")[0]).addClass("selected");return $("#myhero li a").click(function(){var e,t,n;n=$("#myhero li").index($(this).parent());$("#myhero li").removeClass("selected");$(this).parent().addClass("selected");$("#myhero .slide").removeClass("before after selected");t=$("#myhero .slide").slice(0,n);t.addClass("before");$($("#myhero li")[n]).addClass("selected");e=$("#myhero .slide").slice(n+1);e.addClass("after");$("#myhero .indicator").css("top",$(this).parent().position().top);return!1})})}).call(this);