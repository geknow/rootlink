/*$.fn.expandable = function(config) {
  var that = $(this);
  var isExpand = false;
  var btnStr = '展开';
  var summaryCharLen = 100;
  
  var content = that.text();
  var summary = content.substr(0, summaryCharLen);

  that.text(summary + '...');

  var btn = $('<div>' + btnStr + '</div>').click(function(e) {
    var target = $(this).prev();
    if (isExpand) {
      target.text(summary + '...');
      $(this).text('展开');
    } else {
      target.text(content);
      $(this).text('关闭');
    }
    isExpand = !isExpand;
  }).insertAfter(that).addClass('toggle-btn');
};

$('.expandDiv').expandable();*/

var father=document.getElementById("container_l");
var son=document.getElementById("article_content");
father.style.height=son.offsetHeight+140+'px';
