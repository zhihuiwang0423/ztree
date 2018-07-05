var setting = {
        view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            selectedMulti: false
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
          dataType: "text",
          url: "http://host/getNode.php",
          autoParam: ["id", "name"]
        },
        treeNode: { name:"父节点1", icon:"/img/parent.gif"},
    };

zTreeNodes =
 [
    { id:1, pId:0, name:"can drag 1", open:true},
    { id:11, pId:1, name:"我是二级\n我是二级我是二级我是二级\n我是二级我是二级我是二级我是二级"},
    { id:12, pId:1, name:"can drag 1-2", open:true},
    { id:121, pId:12, name:"can drag 1-2-1"},
    { id:122, pId:12, name:"can drag 1-2-2"},
    { id:123, pId:12, name:"can drag 1-2-3"},
    { id:13, pId:1, name:"can't drag 1-3", open:true, },
    { id:131, pId:13, name:"如果我的内容多特别多，\n特别长，哈哈哈", },
    { id:132, pId:13, name:"如果我的内容多特别多，特别长，哈哈哈", open: true},
    {id: 1321, pId: 132, name: "can't drag 1-3-2-1"},
    { id:133, pId:13, name:"can drag 1-3-3",open: true},
    { id:14, pId:1, name:"can't drag 1-4", open:true, },
    { id:141, pId:14, name:"can't drag 1-4-1", },
    { id:142, pId:14, name:"can't drag 1-4-2 drag:false", drag:false},
    { id:143, pId:14, name:"can drag 1-4-3"},
    
    ]
    var log, className = "dark";
    function zTreeBeforeDrop(treeId, treeNodes, targetNode, moveType) {
      // treeNodes 当前拖拽选中的节点 targetNode是最后放入的位置节点信息
      if(confirm('确认拖拽吗？')){
        console.log("treeId :" + treeId)
        console.log( treeNodes)
        console.log(targetNode)
        console.log("moveType :" + moveType)
        return true;
      } else {
        console.log('false')
        return false;
      }
  };
    function zTreeOnMouseUp(event, treeId, treeNode) {
      
      // alert(treeNode ? treeNode.tId + ", " + treeNode.name : "isRoot");
  };
    function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
      
      // alert(treeNodes.length + "," + (targetNode ? (targetNode.tId + ", " + targetNode.name) : "isRoot" ));
  };
    function zTreeOnClick(event, treeId, treeNode) {
      // alert(treeNode.tId + ", " + treeNode.name);
  };
    function zTreeOnDrag(event, treeId, treeNodes) {
        // 选中后，鼠标开始拖拽时生效
        // alert(treeNodes.length);
        
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
        className = (className === "dark" ? "":"dark");
        showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
        var zTree = $.fn.zTree.getZTreeObj("tree");
        zTree.selectNode(treeNode);
        setTimeout(function() {
            zTree.editName(treeNode);
        }, 0);
        return false;
    }
    function beforeRemove(treeId, treeNode) {
        className = (className === "dark" ? "":"dark");
        showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
        var zTree = $.fn.zTree.getZTreeObj("tree");
        zTree.selectNode(treeNode);
        return confirm("Confirm delete node '" + treeNode.name + "' it?");
    }
    function onRemove(e, treeId, treeNode) {
        showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    }
    function beforeRename(treeId, treeNode, newName, isCancel) {
        className = (className === "dark" ? "":"dark");
        showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
        if (newName.length == 0) {
            setTimeout(function() {
                var zTree = $.fn.zTree.getZTreeObj("tree");
                zTree.cancelEditName();
                alert("Node name can not be empty.");
            }, 0);
            return false;
        }
        return true;
    }
    function onRename(e, treeId, treeNode, isCancel) {
        showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
    }
    function showRemoveBtn(treeId, treeNode) {
        return !treeNode.isFirstNode;
    }
    function showRenameBtn(treeId, treeNode) {
        return !treeNode.isLastNode;
    }
    function showLog(str) {
        // debugger
        if (!log) log = $("#log");
        log.append("<li class='"+className+"'>"+str+"</li>");
        if(log.children("li").length > 8) {
            log.get(0).removeChild(log.children("li")[0]);
        }
    }
    function getTime() {
        var now= new Date(),
        h=now.getHours(),
        m=now.getMinutes(),
        s=now.getSeconds(),
        ms=now.getMilliseconds();
        return (h+":"+m+":"+s+ " " +ms);
    }

    var newCount = 1;
    function addHoverDom(treeId, treeNode) {
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='add node' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", function(){
            var zTree = $.fn.zTree.getZTreeObj("tree");
            zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
            return false;
        });
    };
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    };
    
    $(document).ready(function(){
        $.fn.zTree.init($("#tree"), setting, zTreeNodes);
        $('#save').click(function(){
            var treeObj = $.fn.zTree.getZTreeObj("tree");
            // var nodes = treeObj.getNodes();
            var nodes =  treeObj.transformToArray(treeObj.getNodes());;
        })
        $('#preview').click(function(){
          var treeObj = $.fn.zTree.getZTreeObj("tree");
          var nodes = treeObj.getNodes();
          window.localStorage.setItem('previewData', JSON.stringify(nodes))
          window.localStorage.setItem('Level', 6)
          window.location.href = 'preview.html'
      })
    });