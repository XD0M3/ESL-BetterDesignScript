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
//[2].children["0"].children[1]
        static getAnswers(){
          var answers = $(".esl-content").find("table");
          console.log(answers);
          var ik = answers[2].children["0"].childElementCount;
          var an = [];
          for(var ion = 1; ion < ik; ion++){

            //[2].children["0"].children[1].children["0"]
            var fromWho = answers[2].children["0"].children[ion].children["0"].innerText;
            var who = "";
            var ac = false;
            var time = "";
            //Who?
            if(fromWho.indexOf("AC")!== -1){
              who = fromWho.split("AC#");
              ac = true;
            } else {
              who = fromWho.split("#");
            }
            who = who[0];
            who = who.trim();
            //time?
            time = fromWho.split("|");
            time = time[1];
            time = time.trim();
            //Nachricht
            var nachricht = answers[2].children["0"].children[ion].children["1"].innerText;
            //Screen
            var screens = answers[2].children["0"].children[ion].children["2"].innerHTML;
            //speichern
            var zwi = [];
            zwi["who"] = who;
            zwi["ac"] = ac;
            zwi["time"]=time;
            zwi["nachricht"] = nachricht;
            zwi["scre"]=screens
            an[ion-1]=zwi;
          }
          console.log(an);
        }

        static getDates(){
          var creatorBracket = $('form[name="parentForm"]').find('table');
          var dateBrackets = creatorBracket[0].children[0].children[1];
          var when = dateBrackets.children[0].innerText;
          var change = dateBrackets.children[1].innerText;
          when = when.split("created");
          when = when[1];
          change = change.split("changed");
          change = change[1];
          var back = [];
          back[0]=when;
          back[1]=change;
          return back;
        }

        static getAdmin(){
          var creatorBracket = $('form[name="parentForm"]').find('table');
          var way = creatorBracket[0].children[0].children[1].children[2].innerText;
          way = way.split("Admin");
          way = way[1];
          way = way.split("(unlock)");
          way = way[0];
          way = way.trim();
          var lel = [];
          lel[0] = way;
          var ol = $("a[href*='yer']");
          for(var i = 0; i < ol.length;i++){
             var io = ol[i].innerText;
             if(io == way){
               var e = ol[i].href;
               e = e.split("/player/");
               e = e[1];
               e = e.split("/");
               e = e[0];
               lel[1] = e;
             }

          }
          return lel;
        }

        static getTicketCreator(){
            var creatorBracket = $('form[name="parentForm"]').find('table');
            var strings = creatorBracket[0].children[0].children[2].innerText;
            strings = strings.split("Requester	");
            strings[1] = strings[1].split("	All");
            strings[0]=strings[1][0];
            var s = $("a[href*='yer']");
            for(var i = 0; i < s.length;i++){
               var io = s[i].innerText;
               if(io == strings[0]){
                 var e = s[i].href;
                 e = e.split("/player/");
                 e = e[1];
                 e = e.split("/");
                 e = e[0];
                 strings[1] = e;
               }

            }
            return strings;
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
      //Other things
      table.addClass("table_esladdon");
      $('.TextS').css("font-size","10px");
      $('.TextSblack').css("font-size","10px");
      $('.table1_header').css("font-weight","700");
      for(var x = 0; x < squads.length;x++){
      var squads = $('.TitleM').find('a');
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

    }

    if(Page.isTicket()){
       var id = Information.getSupportId();
       var creator = Information.getTicketCreator();
       var dates = Information.getDates();
       var admin = Information.getAdmin();
       var answers = Information.getAnswers();
    }

})();
