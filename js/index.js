var setting = {
        view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            selectedMulti: false,
            addDiyDom: addDiyDom,
            showLine: false

        },
        edit: {
            enable: true,
            editNameSelectAll: true,
            showRemoveBtn: showRemoveBtn,
            showRenameBtn: showRenameBtn
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeDrag: beforeDrag,
            beforeDrop: zTreeBeforeDrop,
            onDrag: zTreeOnDrag,
            beforeEditName: beforeEditName,
            beforeRemove: beforeRemove,
            beforeRename: beforeRename,
            onRemove: onRemove,
            onRename: onRename,
            onClick: zTreeOnClick,
            onDrop: zTreeOnDrop,
            onMouseUp: zTreeOnMouseUp
        },
        async: {
            enable: true,
            url:"../asyncData/getNodes.php",
            autoParam:["id", "name=n", "level=lv"],
            otherParam:{"otherParam":"zTreeAsyncTest"},
            dataFilter: asyncFilter
        },
    };

zTreeNodes =
 [
    { id:1, pId:0, name:"一二三四五六七八九十一二三四五六七八九十", open:true,drag:false,count: 10},
    { id:11, pId:1, name:"一二三四五六七八九十",count:2},
    { id:12, pId:1, name:"文化部", open:true,count:2},
    { id:121, pId:12, name:"人力资源部",count:2},
    { id:122, pId:12, name:"can drag 1-2-2",count:2},
    { id:123, pId:12, name:"can drag 1-2-3",count:2},
    { id:13, pId:1, name:"can't drag 1-3", open:true,count:2},
    { id:131, pId:13, name:"如果我的内容多特别多，\n特别长，哈哈哈",count:2 },
    { id:132, pId:13, name:"如果我的内容多特别多，特别长，哈哈哈", open: true,count:2},
    {id: 1321, pId: 132, name: "can't drag 1-3-2-1",count:2},
    { id:133, pId:13, name:"can drag 1-3-3",open: true,count:2},
    { id:14, pId:1, name:"一二三四五六七八九十一二三四五六七八九十", open:true,count:2 },
    { id:141, pId:14, name:"can't drag 1-4-1",count:2},
    { id:142, pId:14, name:"can't drag 1-4-2 drag:false",count:2 },
    { id:143, pId:14, name:"can drag 1-4-3",count:2,open:true},
    {id: 1431, pId: 143, name: "can't drag 1-4-3-1",count:2},
    
    ]
    var log, className = "dark";
    function asyncFilter(treeId, parentNode, childNodes) {
        if (!childNodes) return null;
        for (var i=0, l=childNodes.length; i<l; i++) {
            childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
        }
        return childNodes;
    }
    function addDiyDom(treeId, treeNode) {
        var aObj = $("#" + treeNode.tId + "_span");
        if ($('#'+treeNode.tId+'_count').length>0) return;
        var editStr = "<span id='"+treeNode.tId+"_count' >("+treeNode.count+")</span>";
        aObj.after(editStr);
    };
    
    function zTreeBeforeDrop(treeId, treeNodes, targetNode, moveType) {
      // treeNodes 当前拖拽选中的节点 targetNode是最后放入的位置节点信息
      if(targetNode.level === 0) {
          layer.alert('不能拖拽到根节点')
          return false
      }           
        var zTree = $.fn.zTree.getZTreeObj('tree');
        var nodes = zTree.getNodes();
        console.log(treeNodes,targetNode,moveType)
        var flag = false;
        layer.confirm('确认移动吗？',{
            btn:['确认','取消']
        },function(index){
            flag = true
            // 第一个参数 要移动到的节点  第二个参数 被移动的节点
            zTree.moveNode(targetNode,treeNodes[0],  moveType);
            layer.close(index)
        },function(index){
            flag = false
            layer.close(index)
        })
        return flag   
  };
    function zTreeOnMouseUp(event, treeId, treeNode) {
  };
    function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
  };
  function RightHTML(treeNode){
    var html = '<div  id="groupTitle"><ul class="groupTop"><li><span  class="title" id="'+treeNode.tId+'_span">'+treeNode.name+'</span><span id="'+treeNode.tId+'_edit" data-name="'+treeNode.name+'" data-tId = "'+treeNode.tId+'" class="button edit hide"></span></li><li class="total">当前部门共有<span id="'+treeNode.tId+'_count">('+treeNode.count+')</span>人</li></ul></div><div class="item"><ul><li><span class="num fw">序号</span><span class="name fw">姓名</span><span class="tel fw">手机号</span></li><li><span class="num">1</span><span class="name">智慧</span><span class="tel">13711111111</span></li></ul></div>';
      return html
  }
    function zTreeOnClick(event, treeId, treeNode) { 
       var html =  RightHTML(treeNode)   
      $('#list').html(html)
      rightIsEdit()

  };
    function zTreeOnDrag(event, treeId, treeNodes) {
        // 选中后，鼠标开始拖拽时生效      
    };
    function beforeDrag(treeId, treeNodes) {
      // 根节点和禁止拖拽的节点不能拖拽
      for(var i=0;i<treeNodes.length;i++){
        　　if(treeNodes[i].drag == false || !treeNodes[i].getParentNode())
        　　　return false;　　　
        　}
        　return true;
    }
    function beforeEditName(treeId, treeNode) {
        // 编辑
        layer.open({
            type: 1,
            // shadeClose: true, //开启遮罩关闭
            area:['200px','150px'],
            content: '<input class="tree_'+treeNode.id+'" value="'+treeNode.name+'"/><div class="tips"></div>',
            btn:['确认','取消'],
            yes:function(index){
                var value = $('.tree_'+treeNode.id).val();
                if(!value){$(".tips").empty().html('请输入部门名称'); return false};
                if(value.length>20){$('.tips').empty().html('部门名称最多20个字符');return false;}
                if(value.length>10){
                    value = value.substr(0,10)+'\n'+value.substr(10,value.length);
                }
                $('#' + treeNode.tId+'_span').html(value)
                $('#groupTitle span.title').html(value)
                layer.close(index)
            },
            btn2:function(index){
                layer.close(index)
            }
          });
        return false        
    }
    function beforeRemove(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj('tree');
        zTree.selectNode(treeNode);
       var flag = false;
       layer.confirm('确认删除吗？',{
           btn:['确认','取消']
       },function(index){
           flag = true
           zTree.removeChildNodes(treeNode)
           zTree.removeNode(treeNode)
            layer.close(index)
       },function(index){
            flag = false
            layer.close(index)
       })
        return flag
    }
    function onRemove(e, treeId, treeNode) {
     
    }
    function beforeRename(treeId, treeNode, newName, isCancel) {
       
    }
    function onRename(e, treeId, treeNode, isCancel) {
        
    }
    function showRemoveBtn(treeId, treeNode) {
        // return treeNode.level ;
        return !treeNode.count
    }
    function showRenameBtn(treeId, treeNode) {
        return true;
    }
    var newCount = 1;
    function addHoverDom(treeId, treeNode) {
        var sObj = $("#" + treeNode.tId + "_count");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        // $("#"+treeNode.tId).find('a').addClass('curSelectedNode')
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='add node' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", function(){
            // 动态添加数据
            layer.open({
                area:['200px','180px'],
                content: '<input value="" class="tree_'+treeNode.id+'"/><div class="tips"></div>',
                btn:['确认','取消'],
                yes:function(index){
                    var zTree = $.fn.zTree.getZTreeObj("tree");
                    var value = $('.tree_'+treeNode.id).val();
                    if(!value){$(".tips").empty().html('请输入部门名称'); return false};
                    if(value.length>20){
                        $('.tips').empty().html('部门名称最多20个字符');
                        return false;
                    }
                    if(value.length>10){
                        value = value.substr(0,10)+'\n'+value.substr(10,value.length);
                        console.log(value.length)
                        // return str
                    }
                    zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name: value,count:0});
                    layer.close(index)
                },
                btn2:function(index){
                    layer.close(index)
                }
              });
            return false;
        });
    };
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    };
    function filter(node) {
        return (node.level === 0);
    }
    function rightIsEdit(){
        $('#groupTitle').hover(function(){
            $('#groupTitle span.edit').removeClass('hide')
        },function(){
            $('#groupTitle span.edit').addClass('hide')
        })
        $('#groupTitle span.edit').click(function(e){
            var id = e.currentTarget.id  
            var name = $('#groupTitle span.title').html();
            var tId = $(this).attr('data-tId')
            layer.open({
                type: 1,
                // shadeClose: true, //开启遮罩关闭
                area:['200px','150px'],
                content: '<input class="tree_'+id+'" value="'+name+'"/>',
                btn:['确认','取消'],
                yes:function(index){
                    var value = $('.tree_'+id).val();
                    $('#' + tId+'_span').html(value)
                    $('#groupTitle span.title').html(value)
                    layer.close(index)
                },
                btn2:function(index){
                    layer.close(index)
                }
              });
            return false
        })
    }
    $(document).ready(function(){
        $.fn.zTree.init($("#tree"), setting, zTreeNodes);
        var treeObj = $.fn.zTree.getZTreeObj("tree");
        var treeNode = treeObj.getNodesByFilter(filter, true); // 仅查找一个节点
        var html0 = '<div id="list" class="groupRight ztree"></div>'
        var html1 =  RightHTML(treeNode)   
        var html2 = '<button id="preview">组织预览</button> ';
        $(".groupLeft").after(html0).after(html2)
        $('#list').append(html1)
        rightIsEdit()  
        $('#preview').click(function(){
          var treeObj = $.fn.zTree.getZTreeObj("tree");
          var nodes = treeObj.getNodes();
          window.localStorage.setItem('previewData', JSON.stringify(nodes))
          window.open('preview.html')
      })
    });