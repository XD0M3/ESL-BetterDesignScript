/**
 * Created by Dominik on 14.12.2017.
 */
// ==UserScript==
// @name         BetterTicketDesign - ESL
// @version      0.1vB
// @description  Make the Tickets better
// @author       XD0M3
// @include    	https://play.eslgaming.com/*
// @grant		none
// @copyright  	2017, XD0M3(10221722), Worst Ahri EUNE()
// ==/UserScript==

(function() {
    'use strict';
//Add CSS Files

    class InformationSupport {

        static getSupportId(){
            var support = $('.TitleM').text();
            var id = support.split("Support Ticket #")[1];
            return id;
        }
//[2].children["0"].children[1]
        static getAnswers(){
            var answers = $(".esl-content").find("table");
            var ik = answers[2].children["0"].childElementCount;
            var an = [];
            for(var ion = 1; ion < ik; ion++){

//[2].children["0"].children[1].children["0"]
                var fromWho = answers[2].children["0"].children[ion].children["0"].innerText;
                var who = "";
                var ac = false;
                var time = "";
                var admin = false;
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
                screens = screens.split(' target="_blank">');
                screens = screens[0];
                screens = screens.split('<a href="');
                screens = screens[1];
                //Admin?
                var ad = answers[2].children["0"].children[ion].children["3"].innerHTML;
                if(ad.indexOf('sent.gif') !== -1){
                    admin = true;
                }
//speichern
                var zwi = [];
                zwi["who"] = who;
                zwi["ac"] = ac;
                zwi["time"]=time;
                zwi["nachricht"] = nachricht;
                zwi["scre"]=screens;
                zwi["admin"]=admin;
                an[ion-1]=zwi;
            }
            return an;
        }

        static getStatus(){
          var creatorBracket = $('form[name="parentForm"]').find('table');
          var sta = creatorBracket["0"].children["0"].children[1].children[3].children[1].innerHTML;
          return sta;
        }

        static getLeague(){
            var leage = [];
            var creatorBracket = $('form[name="parentForm"]').find('table');
            if(creatorBracket["0"].children["0"].children[3].childNodes[1].innerText == "League"){
                var l = creatorBracket["0"].children["0"].children[3].children[1].innerHTML;
///leagueoflegends/eu-nordic-east/lol/open/eune-5on5-champions-club-109/  |  <img src="https://cdn-eslgaming.akamaized.net/play/eslgfx/nodelogo/play_small.gif" width="16" height="12" border="0">&nbsp;LoL EU Nordic &amp; East 5on5 Champions Club #109</a>
                var text = l.split('<a href="');
                text = text[1];
                text = text.split('" target="_parent"><img src="https://cdn-eslgaming.akamaized.net/play/eslgfx/nodelogo/play_small.gif" width="16" height="12" border="0">');
                leage[0] = text[0];
                leage[1] = text[1].replace('&nbsp;','').replace('</a>','').replace('&amp;','');
                return leage;
            } else {
                var oxs = [];
                oxs[1] = "None";
                return oxs;
            }
        }

        static getSquad(){
            var gh = [];
            var creatorBracket = $('form[name="parentForm"]').find('table');
            if(creatorBracket["0"].children["0"].children[3].childNodes[1].innerText == "League"){
                var squad = creatorBracket["0"].children["0"].children[4].children[1].innerHTML;
                squad = squad.split("squad=");
                squad = squad[1];
                squad = squad.split('" target="_parent">');
                gh[0] = squad[0];
                squad = squad[1];
                squad = squad.split("</a>");
                squad = squad[0];
                gh[1] = squad;
            } else {
                var squad = creatorBracket["0"].children["0"].childNodes[6].children[1].innerHTML;
                squad = squad.split("squad=");
                squad = squad[1];
                squad = squad.split('" target="_parent">');
                gh[0] = squad[0];
                squad = squad[1];
                squad = squad.split("</a>");
                squad = squad[0];
                gh[1] = squad;
            }
            return gh;
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
    var css2 = 'body{background: black; font-family: "Open Sans",sans-serif; font-size: 14px;}.main{width: 770px; background: #fff}.TitleM{margin-top: 3px; margin-left: 9px; font-size: 12pt; font-weight: 700; float: left; text-transform: uppercase; font-weight: bold;}#protest-panel{float: right;}.ticket{margin-left: 10px; margin-right: 10px; padding-top: 12px;}.ticket-info table{margin-top: 4px; margin-left: 10px;}.ticket-info{margin-top: 40px;}.ticket-info table td{width: 250px;}.ticketinfo-category{font-size: 12px;}.ticketinfo-display{font-size: 15px; font-weight: bold;}.protest-bottom-panel{float: right; margin-top: 12px; margin-right: 1px;}.ticket-title{margin-top: 55px; margin-left: 6px;}.ticket td{vertical-align: top;}.ticket-reply-blue{width: 740px; background: #c9ddff; border-radius: 5px; margin-left: 5px; min-height: 90px; margin-top: 10px;}.ticket-reply-red{width: 740px; background: #ffc9c9; border-radius: 5px; margin-left: 5px; min-height: 90px; margin-top: 10px;}.ticket-reply-normal{width: 740px; background: #E5E5E5; border-radius: 5px; margin-left: 5px; min-height: 90px; margin-top: 10px;}.ticket-admin-comment{width: 740px; background: #ffe4c9; border-radius: 5px; margin-left: 5px; min-height: 90px; margin-top: 10px;}.ticket-visible-comment{width: 740px; background: #c4ffc9; border-radius: 5px; margin-left: 5px; min-height: 90px; margin-top: 10px;}.ticket-footer{width: 200px; height: 100%; padding: 10px; line-height: 1.2em; float: left;}.ticket-footer .team-shortcut{color: #292929;}.ticket-footer .reply-id{color: #b7b7b7; font-size: 40px; margin-left: 6px; margin-top: 10px; margin-bottom: 10px;}.reply{padding-top: 10px; padding-bottom: 10px;}.write-answer{margin-left: 10px; padding-top: 20px;}.write-answer textarea{margin-top: 10px; margin-left: 5px; width: 740px; max-width: 740px; height: 300px; max-height: 300px; background: #f7f7f7; padding: 5px;}.write-answer table{margin-top: 10px; margin-left: 9px;}.write-answer table td{width: 250px;}#template-lang, #template, #reply-type{width: 200px;}.ticketinfo-display .btn-block{width: 235px !important;}.btn-block{width: 744px;}#position{height: 30px;}';


    if(Page.isAdminTickets()){
//Adding CSS
        Page.addCssStyle(css);
        Page.addCssSytle(css2);
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
        Page.addCssStyle(css2);
        var id = InformationSupport.getSupportId();
        var creator = InformationSupport.getTicketCreator();
        var dates = InformationSupport.getDates();
        var admin = InformationSupport.getAdmin();
        var answers = InformationSupport.getAnswers();
        var squad = InformationSupport.getSquad();
        var league = InformationSupport.getLeague();
        var status = InformationSupport.getStatus();
        var debug = [];
        debug[0] = id;
        debug[1] = creator;
        debug[2] = dates;
        debug[3] = admin;
        debug[4] = answers;
        debug[5] = squad;
        debug[6] = league;
        debug[7] = status;
        console.log(debug);

        $('.esl-content').after('<!DOCTYPE html><html><head> <title>ESL Ticket Project</title> <meta charset="utf-8"> <link rel="stylesheet" href="https://cdn-eslgaming.akamaized.net/play/drupal/profiles/eslgaming_play/themes/eslgaming/eslgaming_play_base/dist/styles/eslgaming-play-base.styles.css?p0wc1" type="text/css"> <link rel="stylesheet" href="style.css" type="text/css"> </head><body> <div class="main"> <div class="ticket"> <div class="TitleM" id="id"> Protest Ticket #5553672 </div><div id="protest-panel"> <a class="btn btn-primary btn-xsmall">Back</a> <a class="btn btn-primary btn-xsmall">This protest is not to be handled (unlock)</a> </div><div class="ticket-info"> <table> <tr class="ticketinfo-category"> <td style="border-left: 5px solid #1076e5; padding-left: 3px;">Creator</td><td>Created on</td><td>Admin</td></tr><tr class="ticketinfo-display"> <td style="border-left: 5px solid #1076e5; padding-left: 3px;"><a id="creator">Pila Gigante</a> ( )</td><td id="createDate">08/12/17 18:37</td><td><a id="admin">Worst Ahri EUNE</a></td></tr><tr class="ticketinfo-category"> <td style="border-left: 5px solid red; padding-left: 3px; padding-top: 4px;">Against</td><td style="padding-top: 4px;">Changed on</td><td style="padding-top: 4px;">Status</td></tr><tr class="ticketinfo-display"> <td style="border-left: 5px solid red; padding-left: 3px;"><a>Nobody</a></td><td id="changeDate">13/12/17 23:45</td><td id="status">Closed (<a>Reopen</a>)</td></tr><tr class="ticketinfo-category"> <td style="padding-top: 4px;">Match ID</td><td style="padding-top: 4px;">League</td><td style="padding-top: 4px;">Adminsquad</td></tr><tr class="ticketinfo-display"> <td><a id="Match">None</a></td><td><a id="league">LoL Open Ladder 1on1 EU West</a></td><td><a id="squad">League of Legends (Europe)</a></td></tr><tr class="ticketinfo-category"> <td style="padding-top: 4px;">Access Restriction</td></tr><tr class="ticketinfo-display"> <td>Restricted, squadmembers only</td></tr></table> <div class="protest-bottom-panel"> <a class="btn btn-primary btn-xsmall">Change restriction to none</a> <a class="btn btn-primary btn-xsmall">Change restriction to normal</a> <span>&nbsp&nbsp&nbsp</span> <a class="btn btn-primary btn-xsmall">Disable Comments</a> <span>&nbsp&nbsp&nbsp</span> <a class="btn btn-primary btn-xsmall">CheaterBO</a> </div><h2 class="ticket-title">he didnt show up in time</h2> </div></div></body></html>');

        var href = window.location.href;
        href = href.split("/support/" + id);
        href = href[0];

        var squadhref = href + "/admin_tickets/?squad=" + squad[0];

        $('#id').text("Support Ticket #" + id);
        $('#creator').text(creator[0]).attr("href", href + "/player/" + creator[1]);
        $('#admin').text(admin[0]).attr("href", href + "/player/" + admin[1]);
        $('#createDate').text(dates[0]);
        $('changeDate').text(dates[1]);
        $('#squad').text(squad[1]).attr("href",squadhref);
        $('#league').text(league[1]).attr("href",league[0]);

        if(status == "open"){
          $('#status').text("Open");
        } else {
          $('#status').text("Closed");
        }

        var ticket = '<div class="' + classes +'"> <table> <tr> <td> <div class="ticket-footer"> <span class="team-shortcut">ESL </span> <span class="username"><strong><a>Worst Ahri EUNE</a></strong></span><br/> <span class="date">10/12/17 23:42</span><br/> <div class="reply-id">#3</div></div></td><td> <div class="reply"> "Hello Pila Gigante, <br/> hello EnoZ_, <br/> <br/> The match has been assessed according to the rules. <br/> <br/> Best regards, <br/> Worst Ahri EUNE, ESL Admin"</div></td></tr></table> </div>';

        for(var antwortNr = 0; antwortNr < answers.length; antwortNr++){
          var classes = "";
          var a = answers;
          if(a[antwortNr]["ac"] == false){
            if(a[antwortNr]["admin"] == false){
              //User
              classes = "ticket-reply-blue";
            } else {
              //Admin
              classes = "ticket-reply-normal";
            }
          } else {
            //AC
            classes = "ticket-admin-comment";
          }
          var ticket = '<div class="' + classes +'" name="' + antwortNr +'"> <table> <tr> <td> <div class="ticket-footer"> <span class="team-shortcut">ESL </span> <span class="username"><strong><a class="link">Worst Ahri EUNE</a></strong></span><br/> <span class="date">10/12/17 23:42</span><br/> <div class="reply-id">#3</div></div></td><td> <div class="reply"> Hello Pila Gigante, <br/> hello EnoZ_, <br/> <br/> The match has been assessed according to the rules. <br/> <br/> Best regards, <br/> Worst Ahri EUNE, ESL Admin </div></td></tr></table> </div>';
          if(antwortNr == 0){
            $('.ticket-info').after(ticket);
          } else {
            $('div[name="0"]').after(ticket);
          }
          var anto = $('div[name="' + antwortNr + '"]');
          anto.find(".team-shortcut").text("");
          anto.find(".link").text(a[antwortNr]["who"]);
          anto.find(".date").text(a[antwortNr]["time"]);
          anto.find(".reply-id").text("#" + antwortNr);
          anto.find(".reply").html(a[antwortNr]["nachricht"]);
        }
        //$('.esl-content').css("display","none");
        //Moveinputs/clippings and more
        var code = $('html').html();

    }

})();
