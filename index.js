// ==UserScript==
// @name         BetterTicketDesign - ESL
// @version      0.1vB
// @description  Make the Tickets better
// @author       XD0M3
// @include    	https://play.eslgaming.com/*
// @grant		none
// @copyright  	2017, XD0M3(10221722)
// ==/UserScript==

(function() {
    'use strict';
    //Add CSS Files

    class Information {

        static getSupportId(){
            var support = $('.TitleM').text();
            var id = support.split("Support Ticket #")[1];
            return id;
        }

    }

    class Page {

        static addCssStyle(text){
            $('head').append("<style>" + text + "</style>");
        }

        static isAdminTickets() {
            return window.location.href.indexOf("/admin_tickets/") > -1;
        }
        static isTicket(){
        return window.location.href.indexOf("/support/");
        }
    }



    var css = ".table_esladdon td, .table_esladdon th {  background-color: white;  border: 1px solid #E6E6E6;  padding: 8px;  }  #btn-adminlist-toggle, #ticketbox-navbutton, .TextP, .TextN {  text-decoration: none;  color: #ffffff;  background: #1076e5;  border-color: ##0561C8;  padding: 1px 5px;  display: inline-block;  margin-bottom: 0;  white-space: nowrap;  border: 1px solid transparent;  border-radius: 3px;  user-select: none;  cursor: pointer;  text-align: center;  vertical-align: middle;  box-sizing: border-box;   font-size: 12px;  line-height: 1.5;  }  .TitleM {  font-size: 26px;  } .table_esladdon table {border-radius: 8px}";

    if(Page.isAdminTickets()){
      //Adding CSS
      Page.addCssStyle(css);
      //Adding Classes
      var table = $('div[class="esl-content"]').find('table');
      var tickets = 0;
      var ti = $('div[class="esl-content"]').find('table').find('tbody').find('tr');
      for(var op = 0; op < ti.length; op++){
      if(ti[op].bgColor == "#F5F4F3" || ti[op].bgColor == "#E3E0DD"){
          tickets++;
      }
      }
        console.log(tickets);
      //Other things
      table.addClass("table_esladdon");
      $('.TextS').css("font-size","10px");
      $('.TextSblack').css("font-size","10px");
      $('.table1_header').css("font-weight","700");
      var squads = $('.TitleM').find('a');
      for(var x = 0; x < squads.length;x++){
          var squad = squads[x].href;
          squad = squad.split("=");
          var squadid = squad[1];
          var ins = squads[x].innerHTML;
          squads[x].innerHTML = ins + " - " + squadid;
      }
     var t = $('.TitleM');
     for(var y = 1; y < t.length;y++){
         var u = t[y].innerHTML;
         u = u.split(":");
         u[0] = "Open Tickets:";
         var f = u.join("");
         t[y].innerHTML = f;
     }
     console.log(t);
    }

    if(Page.isTicket()){
       Information.getSupportId();
       $('.defaultAnswerTexts').css("display","none");

    }

})();
